(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/doctor/doctor";
            var addUrl = "/doctor/doctor_add"
            var aParam = {
            };

            if(sessionStorage.getItem("rolename") == "管理员"){
                $('#btn_addTask').attr('style',"display:block");
            }
            //操作
            function operation(value, row, index){
                if(sessionStorage.getItem("rolename") == "管理员"){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >删除</a>',
                    ].join('');
                }else{
                    return [].join('');
                }

            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var deleteModal = "";
                    if (new Date(row.registerDate) < new Date() || row.registerDate==null){
                        deleteModal = "myDeleteDoctor";
                    }
                    else {
                        deleteModal = "myDeleteDoctorSignalSource";
                    }
                    var myDeleteModalData ={
                        modalBodyID : deleteModal,
                        modalTitle : "删除医生",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var doctorKey = {
                                itemid : row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,url,doctorKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("文件删除失败");
                                        }
                                    },false,"","get");
                                    var submitConfirmModal = {
                                        modalBodyID :"myPassSuccessTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

            };

            /*新增医生*/
            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'doctorName', title: '医生姓名'},
                {field: 'filePath', title: '医生照片',formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'doctorTitle', title: '职称'},
                {field: 'doctorTreatment', title: '擅长治疗'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        console.log(textP.search(str));
                        if(textP.search(str) != -1){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);

            })
        })
})();
