(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil', 'distpicker', 'alertUtil'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil, distpicker, alertUtil) {

            var url = "/information?itemCode=" + sessionStorage.getItem("orgCode");

            var pathUrl = "/userLogin";

            var opUrl = "/insert";

            var itemcode;

            var itemid;

            var type = "put";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var orgCode = sessionStorage.getItem("orgCode")
                var userdto = {
                    "username": username,
                    "orgName": orgName,
                    "orgCode": orgCode
                }
                ajaxUtil.myAjax(null,"/user/deletuser",userdto,function (data) {

                },false,true);
                window.history.back()
            });

            function generateParam() {
                var param = {};
                param.hospitalName = $("#hospitalName").val();
                param.hospitalPhone = $("#hospitalPhone").val();
                param.hospitalPro = $("#addressPro").val();
                param.hospitalCity = $("#addressCity").val();
                param.hospitalCountry = $("#addressCountry").val();
                param.hospitalAdress = $("#address").val();
                param.introduce = editor.txt.html();
                param.itemcode = itemcode;
                return param;
            }

            $("#submitBtn").off('click').on('click', function () {
                var param = generateParam();
                param.status = "1";
                if (!stringUtil.isBlank(param.hospitalName) && !stringUtil.isBlank(param.hospitalPhone) && !stringUtil.isBlank(param.hospitalPro) &&
                    !stringUtil.isBlank(param.hospitalCity) && !stringUtil.isBlank(param.hospitalCountry) && !stringUtil.isBlank(param.hospitalAdress) &&
                    !stringUtil.isBlank(param.introduce) && !stringUtil.isBlank(uploadImg.getFiles()[0].name) && !stringUtil.isBlank($.trim($(".w-e-text").text()))){
                    ajaxUtil.fileAjax(itemcode, uploadImg.getFiles()[0], "lrt", "lrt")
                    ajaxUtil.myAjax(null, opUrl, param, function (data) {
                        if (ajaxUtil.success(data)) {
                            alertUtil.alert("信息已提交给上级审核，请牢记您的账号和密码，耐心等待！")
                            window.location.href = "/userLogin"
                            // orange.redirect(pathUrl)
                        } else {
                            alert(data.msg)
                        }
                    }, true, "123", type);
                } else {
                    alert("请插入图片且输入不能为空！")
                }
                return false;
            });

            var init = function () {
                $("#hospitalName").val(sessionStorage.getItem("orgName"));
                $("#hospitalPhone").val(sessionStorage.getItem("phone"));
                $("#distpicker").distpicker({
                    province: "河北省"
                });
                itemcode = sessionStorage.getItem("orgCode");
                init = function () {

                }
            };
            init();


        })
})();


