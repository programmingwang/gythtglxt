(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/healthProtection/chineseCultural";

            var opreateUrl = "/healthProtection/hotspot";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var hotspotEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增中医文化成功";
                    hotspotEntity = {
                        itemcode: stringUtil.getUUID(),
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "3",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    hotspotEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        dataStatus : "0" ,
                        hotspotContent : editor.txt.html(),
                    }
                    operateMessage = "更新中医文化成功";
                }

                fileUtil.handleFile(isUpdate(), hotspotEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,opreateUrl,hotspotEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            orange.redirect(pathUrl);
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
                    modalBodyID: "myPublishProtection",
                    modalTitle: "信息发布",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        var hotspotEntity;
                        var operateMessage;
                        if(!isUpdate()){
                            hotspotEntity = {
                                itemcode: stringUtil.getUUID(),
                                hotspotTitle : $("#hotspotTitle").val(),
                                hotspotSource : $("#hotspotSource").val(),
                                hotspotAuthor : $("#hotspotAuthor").val(),
                                hotspotContent : editor.txt.html(),
                                dataStatus : "8" ,
                                dataType : "3",
                                userCode : sessionStorage.getItem("itemcode")
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            hotspotEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                hotspotTitle : $("#hotspotTitle").val(),
                                hotspotSource : $("#hotspotSource").val(),
                                hotspotAuthor : $("#hotspotAuthor").val(),
                                dataStatus : "8" ,
                                hotspotContent : editor.txt.html(),
                            }
                            operateMessage = "更新中医文化成功";
                        }

                        fileUtil.handleFile(isUpdate(), hotspotEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null, opreateUrl, hotspotEntity, function (data) {
                            if (ajaxUtil.success(data)) {
                                if (data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myPublishToWechat",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        confirmButtonClass: "btn-danger",
                                        modalConfirmFun:function (){
                                            orange.redirect(pathUrl);
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                } else {
                                    alertUtil.error(data.msg);
                                }
                            } else {
                                alertUtil.alert(data.msg);
                            }
                        }, false, true, type);
                    }
                }
                var x = modalUtil.init(myPublishModalData);
                x.show();
                return false;

            });


            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#hotspotTitle").val(tempdata.hotspotTitle);
                    $("#hotspotSource").val(tempdata.hotspotSource);
                    $("#hotspotAuthor").val(tempdata.hotspotAuthor);
                    editor.txt.html(tempdata.hotspotContent);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
