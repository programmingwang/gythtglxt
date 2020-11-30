(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil', 'distpicker', 'alertUtil'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil, distpicker, alertUtil) {

            var url = "/information?itemCode=" + sessionStorage.getItem("orgCode");

            var pathUrl = "/userLogin";

            var opUrl = "/information";

            var itemcode;

            var itemid;

            var type = "put";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var userdto = {
                    "username": username,
                    "orgName": orgName
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
                param.introduce = $(".w-e-text").html();
                param.itemcode = itemcode;
                return param;
            }

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "1";
                ajaxUtil.myAjax(null, opUrl, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        window.location.href = "/userLogin"
                        // orange.redirect(pathUrl)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
                return false;
            });

            var init = function () {
                $("#hospitalName").val(sessionStorage.getItem("orgName"));
                $("#hospitalPhone").val(sessionStorage.getItem("phone"));
                $("#distpicker").distpicker();
                itemcode = sessionStorage.getItem("orgCode");
                init = function () {

                }
            };
            init();


        })
})();


