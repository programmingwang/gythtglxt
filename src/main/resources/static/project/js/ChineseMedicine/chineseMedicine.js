
(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallchinesemedicine?";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            if(sessionStorage.getItem("rolename") == "管理员"){
                $('#btn_addTask').attr('style',"display:block");
                url += "status="+webStatus[0].id+"&status="+webStatus[1].id+"&status="+webStatus[2].id+"&status="+webStatus[4].id+"&status="+webStatus[6].id+"&status="+webStatus[7].id+"&status="+webStatus[8].id+"&status="+webStatus[9].id + "&userCode="+sessionStorage.getItem("itemcode");
            }else if(sessionStorage.getItem("rolename") == "县级"){
                url += "status="+webStatus[1].id+"&status="+webStatus[8].id;
            }else if(sessionStorage.getItem("rolename") == "市级"){
                url += "status="+webStatus[3].id+"&status="+webStatus[8].id;
            }else if(sessionStorage.getItem("rolename") == "省级"){
                url += "status="+webStatus[5].id+"&status="+webStatus[8].id;
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
                                    alertUtil.info("删除中药信息成功");
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

                'click .pass' : function (e, value, row, index) {
                    var myPassChineseMedicineModalData ={
                        modalBodyID :"myPassProtection",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": selectUtil.getPassStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "县级"){
                                            alertUtil.info("县局审核已通过，已发送给市局中医药管理部门！");
                                        }else if(sessionStorage.getItem("rolename") == "市级"){
                                            alertUtil.info("市局审核已通过，已发送给省局中医药管理部门！");
                                        }else if(sessionStorage.getItem("rolename") == "省级"){
                                            alertUtil.info("省局审核已通过，已通知管理员确认发布！");
                                        }
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
                    var myPassModal = modalUtil.init(myPassChineseMedicineModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailChineseMedicineModalData ={
                        modalBodyID :"myNoPassProtection",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": ""
                            };
                            if(sessionStorage.getItem("rolename") == "县级" ){
                                submitStatus.status = webStatus[2].id;
                            }else if(sessionStorage.getItem("rolename") == "市级" ){
                                submitStatus.status = webStatus[4].id;
                            }else if(sessionStorage.getItem("rolename") == "省级" ){
                                submitStatus.status = webStatus[6].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
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
                    var myFailModal = modalUtil.init(myFailChineseMedicineModalData);
                    myFailModal.show();
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
                                        alertUtil.success("下架成功");
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
                    $("#classification").val(row.classification);
                    $("#harvesting").val(row.harvesting);
                    $("#taste").val(row.taste);
                    $("#merTropism").val(row.merTropism);
                    $("#governance").val(row.governance);
                    $("#usage").val(row.usage);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#status").val(webStatus[ row.status].text);
                    $("#mediCineImg").attr("src",row.filePath)
                    $('#mediCineImgSpan').html("药材图片");

                    myChineseMedicineModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitChineseMedicineModalData ={
                        modalBodyID :"mySubmitProtection",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[1].id
                            };
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交给县局中医药管理部门");
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
                    var mySubmitModal = modalUtil.init(mySubmitChineseMedicineModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitChineseMedicineModalData ={
                        modalBodyID :"myNoSubmitProtection",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustochinesemedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已取消提交");
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
                    var mySubmitModal = modalUtil.init(myNoSubmitChineseMedicineModalData);
                    mySubmitModal.show();
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
                                        alertUtil.info("管理员已发布到小程序");
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

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

           var p2 = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#Search").selectUtil(p2);

            var aCol = [
                        {field: 'name', title: '中医药名称'},
                        {field: 'alias', title: '别名'},
                        {field: 'filePath', title: '药材图片', formatter:function (value, row, index) {
                                if(value == "已经损坏了"){
                                    return '<p>'+value+'</p>';
                                }else{
                                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                                }
                            }},
                        {field:'classification',title:'功效分类',formatter:function (row) {
                                return '<p>'+p2[row].text+'</p>';
                            }},
                        {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
                    ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);
            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));
        })
})();
