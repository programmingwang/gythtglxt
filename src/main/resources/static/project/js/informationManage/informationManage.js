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

                var param = generateParam();
                param.status = "0";
                if (uploadImg.isUpdate()) {
                    ajaxUtil.fileAjax(itemcode, uploadImg.getFiles()[0], "lrt", "lrt")
                }

                ajaxUtil.myAjax(null, opUrl, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl);
                    } else {
                        alert(data.msg);
                    }
                }, true, "123", type);

                return false;
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "1";
                param.reason = "";
                ajaxUtil.myAjax(null, opUrl, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);

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
                uploadImg.setImgSrc(tempdata.filePath);
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


