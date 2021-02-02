(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/project/project";

            var opreateUrl = isUpdate() ? "/project/updateProject" : "/project/insertProject";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var projectEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增功效特色成功";
                    projectEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "0",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    projectEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        dataStatus : "0" ,
                        content : editor.txt.html(),
                    }
                    operateMessage = "更新功效特色成功";
                }

                if(uploadImg.isUpdate()){
                    ajaxUtil.upload_multi(projectEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                }

                ajaxUtil.myAjax(null,opreateUrl,projectEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myPassSuccessTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    orange.redirect(pathUrl);
                                    return true;
                                }
                            }
                            var submitConfirm = modalUtil.init(submitConfirmModal);
                            submitConfirm.show();
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var myPublishModalData = {
                    modalBodyID: "myAuditSubmitProtectionCountry",
                    modalTitle: "提交确认",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var projectEntity;
                        var operateMessage;
                        if(!isUpdate()){
                            operateMessage = "新增功效特色成功";
                            projectEntity = {
                                itemcode: stringUtil.getUUID(),
                                name : $("#name").val(),
                                content : editor.txt.html(),
                                dataStatus : "1" ,
                                dataType : "0",
                                userCode : sessionStorage.getItem("itemcode")
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            projectEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                name : $("#name").val(),
                                dataStatus : "1" ,
                                content : editor.txt.html(),
                            }
                            operateMessage = "提交功效特色成功";
                        }

                        if(uploadImg.isUpdate()) {
                            ajaxUtil.upload_multi(projectEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                        }

                        ajaxUtil.myAjax(null,opreateUrl,projectEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myPublishTNextDepart",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            orange.redirect(pathUrl);
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true,type);
                    }

                }
                var x = modalUtil.init(myPublishModalData);
                x.show();
                return false;


            });

            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改功效特色信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    editor.txt.html(tempdata.content);
                    uploadImg.setImgSrcs(tempdata.filePath);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
