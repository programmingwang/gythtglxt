(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/healthProtection/foodTreat";

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
                    operateMessage = "新增药膳食疗成功";
                    hotspotEntity = {
                        itemcode: stringUtil.getUUID(),
                        hotspotTitle : $("#hotspotTitle").val(),
                        hotspotSource : $("#hotspotSource").val(),
                        hotspotAuthor : $("#hotspotAuthor").val(),
                        hotspotContent : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "2",
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
                    operateMessage = "更新药膳食疗成功";
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
                        var isSuccess = false;
                        var hotspotEntity;
                        var operateMessage;
                        if (!isUpdate()) {
                            operateMessage = "新增药膳食疗成功,信息将直接显示到国医堂小程序中,文责自负!如有问题请紧急下架!";
                            hotspotEntity = {
                                itemcode: stringUtil.getUUID(),
                                hotspotTitle: $("#hotspotTitle").val(),
                                hotspotSource: $("#hotspotSource").val(),
                                hotspotAuthor: $("#hotspotAuthor").val(),
                                hotspotContent: editor.txt.html(),
                                dataStatus: "8",
                                dataType: "2",
                                userCode: sessionStorage.getItem("itemcode")
                            };
                        } else {
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            hotspotEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                hotspotTitle: $("#hotspotTitle").val(),
                                hotspotSource: $("#hotspotSource").val(),
                                hotspotAuthor: $("#hotspotAuthor").val(),
                                dataStatus: "8",
                                hotspotContent: editor.txt.html(),
                            }
                            operateMessage = "更新药膳食疗成功";
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
                                            return true;
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
