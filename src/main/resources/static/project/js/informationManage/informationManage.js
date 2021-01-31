(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil','uploadImg','distpicker'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil,uploadImg,distpicker) {

            var url = "/information?itemCode=" + sessionStorage.getItem("orgCode");

            var pathUrl = "/informationManage/informationManage";

            var opUrl = "/information";

            var itemcode;

            var itemid;

            var type = "put";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam() {
                var param = {};
                param.hospitalName = $("#hospitalName").val();
                param.hospitalPhone = $("#hospitalPhone").val();
                param.hospitalPro = $("#addressPro").val();
                param.hospitalCity = $("#addressCity").val();
                param.hospitalCountry = $("#addressCountry").val();
                param.hospitalAdress = $("#address").val()
                param.introduce = $(".w-e-text").html();
                param.itemcode = itemcode;
                param.itemid = itemid;
                return param;
            }

            $("#saveBtn").unbind('click').on('click', function () {
                var saveConfirmModal = {
                    modalBodyID: "myUpdateConfirm",
                    modalTitle: "提示",
                    modalClass : "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = "0";
                        if (uploadImg.isUpdate()) {
                            ajaxUtil.upload_multi(itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                        }

                        ajaxUtil.myAjax(null, opUrl, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                alertUtil.success("保存成功")
                                orange.redirect(pathUrl);
                            } else {
                                alert(data.msg);
                            }
                        }, true, true, type);
                        var submitConfirmModal = {
                            modalBodyID :"myPassSuccessTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun:function (){
                                orange.redirect(pathUrl)
                                return true;
                            }
                        }
                        saveConfirm.hide();
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                    }
                }
                var saveConfirm = modalUtil.init(saveConfirmModal);
                saveConfirm.show()



                return false;
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var submitConfirmModal = {
                    modalBodyID: "myAuditSubmitProtectionCountry",
                    modalTitle: "提示",
                    modalClass : "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = "1";
                        param.reason = "";
                        if (uploadImg.isUpdate()) {
                            ajaxUtil.upload_multi(itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                        }
                        ajaxUtil.myAjax(null, opUrl, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                alertUtil.success("修改成功，等待审核")

                            } else {
                                alert(data.msg)
                            }
                        }, true, true, type);
                        var submitConfirmModal = {
                            modalBodyID :"myPassSuccessTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun:function (){
                                orange.redirect(pathUrl)
                                return true;
                            }
                        }
                        submitCon.hide();
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                    }
                }
                var submitCon = modalUtil.init(submitConfirmModal);
                submitCon.show()

                return false;
            });

            var init = function () {
                var tempdata;
                ajaxUtil.myAjax(null, url, null, function (data) {
                    if (data && data.code == ajaxUtil.successCode) {
                        tempdata = data.data
                    } else {
                        alertUtil.error(data.msg)
                    }
                }, false, "", "get");
                $("#hospitalName").val(tempdata.hospitalName);
                $("#hospitalPhone").val(tempdata.hospitalPhone);
                $("#contacts").val(tempdata.contacts);
                $("#phone").val(tempdata.phone);
                $("#distpicker").distpicker({
                    province: tempdata.hospitalPro,
                    city: tempdata.hospitalCity,
                    district: tempdata.hospitalCountry
                });
                $("#address").val(tempdata.hospitalAdress);
                editor.txt.html(tempdata.introduce);
                uploadImg.setImgSrcs(tempdata.filePath);
                itemcode = tempdata.itemcode;
                itemid = tempdata.itemid;
                if ( tempdata.status !== "6"){
                    $("#statusSpan").html(dictUtil.getName(dictUtil.DICT_LIST.auditStatus, tempdata.status));
                    $("#reasonSpan").html(tempdata.reason);
                    $("#statusDiv").show();
                }
                else {
                    $("#statusDiv").hide();
                }
                init = function () {

                }
            };
            init();
        })
})();


