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
                let orgType = $("#orgType option:selected").val();
                let orgCode = $("#orgCode").val();
                let username = $("#username").val();
                let password = $("#password").val();
                let phone = $("#phone").val();

                let inputCode = $("#reg-code").val().toLowerCase();
                let canvasCode = codeStr.join("").toLowerCase();

                let RegExp = /^0\d{2,3}-\d{7,8}$/;

                if (orgName == '') {
                    alertUtil.error('请输入机构名字！');
                    return false;
                }
                if (orgType == '') {
                    alertUtil.error('请选择机构类型！');
                    return false;
                }
                if (orgCode == '') {
                    alertUtil.error('请输入机构代码！');
                    return false;
                }
                if (username == '') {
                    alertUtil.error('请输入用户名！');
                    return false;
                }
                if (password == '') {
                    alertUtil.error('请输入密码！');
                    return false;
                }
                if (phone == '') {
                    alertUtil.error('请输入手机号码！');
                    return false;
                } else if (RegExp.test(phone) == false && !(/^1[3456789]\d{9}$/.test(phone))) {
                    alertUtil.error("电话号码或手机号码有误，请重填");
                    return false;
                }


                if (inputCode == '') {
                    alertUtil.error('请输入验证码！');
                    return false;
                } else if (inputCode == canvasCode) {
                    return true;
                } else {
                    alertUtil.error('验证码错误！请重新输入！');
                    return false
                }
            }

            $("#btn_register").unbind("click").bind("click", function () {
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
                            window.location.href = data.data
                        } else {
                            alertUtil.alert("注册失败");
                        }
                    }, false)
                }
            })

        })
})();
