
(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallchinesemedicine?";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var p2 = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            var role = sessionStorage.getItem("rolename");
            if(role === "管理员"){
                $('#btn_addTask').attr('style',"display:block");
                // return preUrl +status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id + "&userCode="+sessionStorage.getItem("itemcode");
                url = url + "status=1&userCode="+sessionStorage.getItem("itemcode");
            }else if(role === "县级"){
                // return preUrl +status+"="+webStatus[1].id+"&"+status+"="+webStatus[8].id;
                url = url + "status=2";
            }else if(role === "市级"){
                // return preUrl +status+"="+webStatus[3].id+"&"+status+"="+webStatus[8].id;
                url = url + "status=3";
            }else if(role === "省级"){
                // return preUrl +status+"="+webStatus[5].id+"&"+status+"="+webStatus[8].id;
                url = url + "status=4";
            }
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.status,webStatus)
            }




            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/ChineseMedicine/insertchineseMedicine");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteProtection",
                        modalTitle : "删除中药信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletechinesemedicine/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    var submitConfirmModal = {
                                        modalBodyID :"myPassSuccessTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        confirmButtonClass: "btn-danger",
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

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfChineseMedicineModalData ={
                        modalBodyID :"myUnderShelfProtection",
                        modalTitle : "紧急下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[9].id
                            };
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myPassSuccessTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfChineseMedicineModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewChineseMedicineModalData ={
                        modalBodyID : "myviewChineseMedicineModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myChineseMedicineModal = modalUtil.init(myViewChineseMedicineModalData);
                    $("#name").val(row.name);
                    $("#alias").val(row.alias);
                    $("#classification").val(p2[row.classification].text);
                    $("#harvesting").val(row.harvesting);
                    $("#taste").val(row.taste);
                    $("#merTropism").val(row.merTropism);
                    $("#governance").val(row.governance);
                    $("#usage").val(row.usage);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#status").val(webStatus[row.status].text);
                    $("#mediCineImg").attr("src",row.filePath)
                    $('#mediCineImgSpan').html("药材图片：");

                    myChineseMedicineModal.show();
                },

                'click .publish' : function (e, value, row, index) {
                    var mypublishChineseMedicineModalData ={
                        modalBodyID :"myPublishProtection",
                        modalTitle : "发布信息到小程序",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[8].id
                            };
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myPublishToWechat",
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
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }
                    };
                    var mypublishModal = modalUtil.init(mypublishChineseMedicineModalData);
                    mypublishModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/ChineseMedicine/insertchineseMedicine";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });



            $("#Search").selectUtil(p2);

            // $("#Search").unbind("change").on("change",function () {
            //     var newArry = [];
            //     var allTableData = JSON.parse(localStorage.getItem("2"));
            //     var searchGxfl=document.getElementById("Search").value;
            //
            //     for (var i in allTableData) {
            //         for (var v in aCol){
            //             var textP = allTableData[i][aCol[v].field];
            //             var isStatusSlot=false;           // 默认状态为true
            //             //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
            //             var gxfl= allTableData[i]["classification"]
            //             //调试时可以先打印出来，进行修改
            //             if(gxfl==searchGxfl){
            //                 isStatusSlot=true;
            //             }
            //             //当存在时将条件改为flase
            //             if (textP == null || textP == undefined || textP == '') {
            //                 textP = "1";
            //             }
            //             if(isStatusSlot){
            //                 newArry.push(allTableData[i])
            //             }
            //             var newArr=new Set(newArry)
            //             newArry=Array.from(newArr)
            //             $("#table").bootstrapTable("load", newArry);
            //         }
            //     }
            // });

            var aCol = [
                        {field: 'name', title: '中医药名称'},
                        {field: 'alias', title: '别名'},
                        {field: 'filePath', title: '药材图片', formatter:function (value, row, index) {
                                if(value == "已经损坏了"){
                                    return value;
                                }else{
                                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                                }
                            }},
                        {field:'classification',title:'功效分类',formatter:function (row) {
                                return p2[row].text;
                            }},
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
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                var searchGxfl=document.getElementById("Search").value;
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var gxfl= allTableData[i]["classification"]
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status= allTableData[i]["status"]
                        if(addstr==status || addstr==99){
                            if(gxfl==searchGxfl){
                                isStatusSlot=true;
                            }
                        }
                        //当存在时将条件改为flase
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(textP.search(str) != -1 && isStatusSlot){
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
