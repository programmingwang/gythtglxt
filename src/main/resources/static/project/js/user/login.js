(function() {
    require(['jquery','stringUtil','alertUtil','ajaxUtil'], function (jquery,stringUtil,alertUtil,ajaxUtil) {


        $("#btn_Login").unbind("click").bind("click",function () {
            //获取表单中的值
            var inputUsername = $("#inputUsername").val();
            var inputPassword = $("#inputPassword").val();

            if(stringUtil.isBlank(inputUsername)){
                alertUtil.error("用户账户不能为空");
                return
            }
            if(stringUtil.isBlank(inputPassword)){
                alertUtil.error("用户密码不能为空");
                return
            }

            var userEntity = {"username": inputUsername, "password": inputPassword};
            ajaxUtil.myAjax(null, "/userLogin", userEntity, function (data) {
                if (data && data.code === 88888) {
                    var userName = data.data.username;
                    var rolename = data.data.rolename;
                    var orgCode = data.data.orgCode;
                    var itemCode = data.data.itemcode;
                    var name = data.data.name;
                    sessionStorage.setItem('username',userName);
                    sessionStorage.setItem("Name",name);
                    sessionStorage.setItem('rolename',rolename);
                    sessionStorage.setItem('orgCode',orgCode);
                    sessionStorage.setItem('itemcode',itemCode);
                    if (rolename === '管理员') {
                        window.location.href = "/main#/healthProtection/healthPreservation";
                    } else if (rolename === '县级' || rolename === '市级' || rolename === '省级'){
                        window.location.href = "/main#/project/characteri";
                    } else{
                        window.location.href = "/main"
                    }
                }else{
                    alertUtil.error(data.msg)
                }
            },false)
        })

        $("#btn_Register").unbind("click").bind("click",function () {
            window.location.href = "/register"
        })

        //回车事件绑定，密码框输完密码按回车课实现登录
        $('#inputPassword').bind('keyup', function(event) {
            if (event.keyCode === 13) {
                //回车执行登录
                $('#btn_Login').click();
            }
        });
    })
})();
