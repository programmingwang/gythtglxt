(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,modalUtil) {
            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/doctor/doctor"
            var numType = dictUtil.getDictByCode(dictUtil.DICT_LIST.numType);

            /*初始化数据*/
            uploadImg.init();
            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改服务团队医生信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#doctorName").val(tempdata.doctorName);
                    $("#doctorTitle").val(tempdata.doctorTitle);
                    $("#doctorTreatment").val(tempdata.doctorTreatment);
                }
            }());
            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
            $("#numType").selectUtil(numType);

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            /*处理保存按钮*/
            $("#btn_insert").unbind().on('click',function () {
                var submitConfirmModal = {
                    modalBodyID :"myPublishDoctor",
                    modalTitle : "提示",
                    modalClass : "modal-lg",
                    cancelButtonStyle: "display:none",
                    modalConfirmFun:function (){
                        var entity;
                        var requestUrl = "/doctor/doctor";
                        var requestType;

                        if (!updateStatus){
                            entity = {
                                itemcode: stringUtil.getUUID(),
                            };
                            requestType = "post";
                        }
                        else {
                            entity = {
                                itemid: tempdata.itemid,
                                itemcode: tempdata.itemcode
                            };
                            requestType = "put";
                        }
                        entity["doctorName"] = $("#doctorName").val();
                        entity["doctorTitle"] = $("#doctorTitle").val();
                        entity["doctorTreatment"] = $("#doctorTreatment").val();
                        entity["deptCode"] = $("#deptCode").val();


                        fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myPassSuccessTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        orange.redirect(jumpUrl);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();

                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true,requestType);
                        return false;
                    }
                }
                var submitConfirm = modalUtil.init(submitConfirmModal);
                submitConfirm.show();
                return false;
            });

        });
})();
