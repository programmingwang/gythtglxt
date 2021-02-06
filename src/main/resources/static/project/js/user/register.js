(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, selectUtil, stringUtil, dictUtil) {

            var codeStr = [];
            var i = 0;

            /**生成一个随机数**/
            function randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            /**生成一个随机色**/
            function randomColor(min, max) {
                var r = randomNum(min, max);
                var g = randomNum(min, max);
                var b = randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            drawPic(codeStr);
            document.getElementById("canvas").onclick = function (e) {
                e.preventDefault();
                drawPic(codeStr);
            };

            // var sel = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgType);
            // $("#orgType").selectUtil(sel);

            /**绘制验证码图片**/
            function drawPic(codeStr) {
                var canvas = document.getElementById("canvas");
                var width = canvas.width;
                var height = canvas.height;
                var ctx = canvas.getContext('2d');
                ctx.textBaseline = 'bottom';

                /**绘制背景色**/
                ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
                ctx.fillRect(0, 0, width, height);
                /**绘制文字**/
                var str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                for (var i = 0; i < 4; i++) {
                    var txt = str[randomNum(0, str.length)];
                    codeStr[i] = txt;
                    ctx.fillStyle = randomColor(50, 160);  //随机生成字体颜色
                    ctx.font = randomNum(16, 25) + 'px SimHei'; //随机生成字体大小
                    var x = 10 + i * 25;
                    var y = randomNum(25, 30);
                    var deg = randomNum(-45, 45);
                    //修改坐标原点和旋转角度
                    ctx.translate(x, y);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.fillText(txt, 0, 0);
                    //恢复坐标原点和旋转角度
                    ctx.rotate(-deg * Math.PI / 180);
                    ctx.translate(-x, -y);
                }
                //绘制干扰线
                for (var i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = randomColor(50, 160);
                    ctx.moveTo(randomNum(0,30),randomNum(0,40));
                    ctx.lineTo(randomNum(90,110),randomNum(0,40));
                    ctx.stroke();
                }
            }

            // 输入数据进行校验
            function validateLogin() {
                let orgName = $("#orgName").val();
                let orgCode = $("#orgCode").val();
                let username = $("#username").val();
                let password = $("#password").val();
                let checkpwd = $("#checkpassword").val();
                let phone = $("#phone").val();

                let inputCode = $("#reg-code").val().toLowerCase();
                let canvasCode = codeStr.join("").toLowerCase();

                let RegExp = /^0\d{2,3}-\d{7,8}$/;

                if (stringUtil.isBlank(orgName)) {
                    alertUtil.error('请输入国医堂名称！');
                    return false;
                }
                if (stringUtil.isBlank(orgCode)) {
                    alertUtil.error('请输入统一社会信用代码！');
                    return false;
                }
                if (stringUtil.isBlank(username)) {
                    alertUtil.error('请输入用户名！');
                    return false;
                }
                var reg = /^[a-zA-Z]([\s\S]{4,11})$/;//以字母开头，5-12位，([\s\S]*)匹配任意字符
                if (!reg.test(username)) {
                    alertUtil.error("用户名须以字母开头，长度为5-12位");
                    return false
                }
                if (stringUtil.isBlank(password)) {
                    alertUtil.error('请输入密码！');
                    return false;
                }
                if (stringUtil.isBlank(checkpwd)) {
                    alertUtil.error('请确认密码！');
                    return false;
                }
                if (password != checkpwd){
                    alertUtil.info("两次输入的密码不一致");
                    return false
                }
                if (stringUtil.isBlank(phone)) {
                    alertUtil.error('请输入手机号码！');
                    return false;
                } else if (RegExp.test(phone) == false && !(/^1[3456789]\d{9}$/.test(phone))) {
                    alertUtil.error("电话号码或手机号码有误，请重填");
                    return false;
                }
                if (stringUtil.isBlank(inputCode)) {
                    alertUtil.error('请输入验证码！');
                    return false;
                } else if (inputCode == canvasCode) {
                    return true;
                } else {
                    alertUtil.error('验证码错误！请重新输入！');
                    return false
                }
            }

            $("#username").on("blur", function () {
                let username = $("#username").val();
                var reg = /^[a-zA-Z]([\s\S]{4,11})$/;//以字母开头，5-12位，([\s\S]*)匹配任意字符
                if (!reg.test(username)) {
                    alertUtil.error("用户名须以字母开头，长度为5-12位");
                    return false
                }
            });

            $("#checkpassword").on("blur", function () {
                let password = $("#password").val();
                let checkpwd = $("#checkpassword").val();
                if (checkpwd != password){
                    alertUtil.info("两次输入的密码不一致")
                }
            });

            $("#btn_register").off("click").bind("click", function () {
                let orgName = $("#orgName").val();
                var orgCode = stringUtil.getUUID();
                let username = $("#username").val();
                let password = $("#password").val();
                let phone = $("#phone").val();

                sessionStorage.setItem('username',username);
                sessionStorage.setItem('orgCode',orgCode);
                sessionStorage.setItem('orgName',orgName);
                sessionStorage.setItem('phone',phone);

                var userEntity = {
                    "orgCode": orgCode,
                    "orgName": orgName,
                    "username": username,
                    "password": password,
                    "mobilePhone": phone
                };

                if (validateLogin()) {
                    ajaxUtil.myAjax(null, "/user/register", userEntity, function (data) {
                        if (data && data.code == 88888) {
                            if(data.data == "/userLogin"){
                                alertUtil.alert("该国医堂已经申请注册了，可以尝试登陆，若无法登陆，则还在审核中，请耐心等待！")
                            }
                            window.location.href = data.data
                        } else {
                            alertUtil.alert(data.msg);
                        }
                    }, false)
                    return false;
                }
            })

            $("#btn_login").unbind("click").bind("click",function () {
                window.location.href = "/userLogin"
            })

        })
})();
