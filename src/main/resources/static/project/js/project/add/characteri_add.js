(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/project/characteri";

            var opreateUrl = isUpdate() ? "/project/updateProject" : "/project/insertProject";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var characteriEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增开展项目成功";
                    characteriEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "1",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    characteriEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                    }
                    operateMessage = "更新开展项目成功";
                }

                if (uploadImg.isUpdate()){
                ajaxUtil.upload_multi(characteriEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                }

                ajaxUtil.myAjax(null,opreateUrl,characteriEntity,function (data) {
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
                        var characteriEntity;
                        var operateMessage;
                        if(!isUpdate()){
                            operateMessage = "新增开展项目成功";
                            characteriEntity = {
                                itemcode: stringUtil.getUUID(),
                                name : $("#name").val(),
                                price : $("#price").val(),
                                content : editor.txt.html(),
                                dataStatus : "1" ,
                                dataType : "1",
                                userCode : sessionStorage.getItem("itemcode")
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            characteriEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                name : $("#name").val(),
                                price : $("#price").val(),
                                dataStatus : "1" ,
                                content : editor.txt.html(),
                            }
                            operateMessage = "提交开展项目成功";
                        }

                        if (uploadImg.isUpdate()){
                            ajaxUtil.upload_multi(characteriEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                        }


                        ajaxUtil.myAjax(null,opreateUrl,characteriEntity,function (data) {
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
                    $(".titleCSS").text("修改开展项目信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#price").val(tempdata.price),
                    editor.txt.html(tempdata.content);
                    uploadImg.setImgSrcs(tempdata.filePath);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
