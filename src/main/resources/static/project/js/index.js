(function () {
    require(['jquery', 'urlUtil', 'stringUtil', 'alertUtil', 'ajaxUtil'],
        function (jquery, urlUtil, stringUtil, alertUtil, ajaxUtil) {

            var roleName = sessionStorage.getItem("rolename");
            var currentUrlHash = window.location.hash.replace("#", "");

                var menu_list = [
                    {
                        menu_name: "预防保健",
                        menu_url: "",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "节气养生",
                        menu_url: "/healthProtection/healthPreservation",
                        id: "1-1",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "自我保健",
                        menu_url: "/healthProtection/healthCare",
                        id: "1-2",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "药膳治疗",
                        menu_url: "/healthProtection/foodTreat",
                        id: "1-3",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "中药常识",
                        menu_url: "/ChineseMedicine/chineseMedicine",
                        id: "1-4",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "中医文化",
                        menu_url: "/healthProtection/chineseCultural",
                        id: "1-5",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "儿童健康",
                        menu_url: "/healthProtection/kidsHealth",
                        id: "1-6",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "信息管理",
                        menu_url: "",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "号源管理",
                        menu_url: "/signalSource/sourceManage",
                        id: "2-1",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "服务团队",
                        menu_url: "/doctor/doctor",
                        id: "2-2",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "开展项目",
                        menu_url: "/project/project",
                        id: "2-3",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "功效特色",
                        menu_url: "/project/characteri",
                        id: "2-4",
                        level: "2",
                        pid: "2"
                    },
                    // {
                    //     menu_name: "机构审核",
                    //     menu_url: "/audit/audit",
                    //     id: "2-6",
                    //     level: "2",
                    //     pid: "2"
                    // }
                ];

                if(roleName == "管理员"){
                    menu_list.push(
                        {
                            menu_name: "信息维护",
                            menu_url: "/informationManage/informationManage",
                            id: "2-5",
                            level: "2",
                            pid: "2"
                        })
                }else if(roleName == "省级" || roleName== "市级" || roleName == "县级"){
                    menu_list.push({
                        menu_name: "国医堂机构信息审核",
                        menu_url: "/audit/audit",
                        id: "2-6",
                        level: "2",
                        pid: "2"
                    })
                }


            function getHTML_dropdown_menu_item(astr, aurl, show_active) {
                var str = "<a class=\"dropdown-item  " + (show_active ? "active" : "") + " \" url=\"" + aurl + "\">" + astr + "</a>\n" +
                    "<hr size=\"1\" style=\"color: #E8E8E8;border-style:dashed;width:90%\">";
                return str;
            }

            function getHTML_dropdown_menu(itemStr) {
                var str = "<div class=\"dropdown-menu left-menu-dropdown-menu\">\n" +
                    itemStr +
                    "</div>";
                return str;
            }

            function getHTML(item, dropdownStr, show_active) {
                var uuid = stringUtil.getUUID();
                var header = item.menu_name;
                var furl = item.menu_url;
                var str = "<div class=\"card\">\n" +
                    "                    <div class=\"\" id=\"headingOne\">\n" +
                    "                        <button class=\"collapse-btn btn btn-link btn-block text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#" + uuid + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                    "                            <h4>" + header + "</h4>\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div id=\"" + uuid + "\" class=\"collapse " + (show_active ? "show" : "") + " \" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\n" +
                    dropdownStr +
                    "                    </div>\n" +
                    "                </div>";
                var str1 = "<div class=\"card\">\n" +
                    "                    <div class=\"aaaa\" id=\"headingOne\">\n" +
                    "                    <a  class=\"AFirstMenu\" url=\"" + furl + "\">" + header + "</a>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div id=\"" + uuid + "\" class=\"nullmenu " + (show_active ? "show" : "") + " \" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\n" +
                    dropdownStr +
                    "                    </div>\n" +
                    "                </div>";

                if (dropdownStr == "<div class=\"dropdown-menu left-menu-dropdown-menu\">\n" +
                    "</div>") {
                    return str1;
                } else {
                    return str;
                }
            }

            function getMenuStr(menuList) {
                if (stringUtil.isBlank(menuList)) {
                    return "";
                }
                ;
                var topMenu = [];
                $.each(menuList, function (i, item) {
                    if (item.level == 1) {
                        topMenu.push(item);
                    }
                });

                var htmlStr = "";
                $.each(topMenu, function (i, tm_item) {
                    var dropdowStr = "";
                    var show = false;
                    $.each(menuList, function (j, item) {
                        var active = false;
                        if (item.pid == tm_item.id) {
                            if (!stringUtil.isBlank(currentUrlHash) && currentUrlHash == item.menu_url) {
                                active = true;
                                show = true;
                            }
                            dropdowStr = dropdowStr + getHTML_dropdown_menu_item(item.menu_name, item.menu_url, active);
                        }
                    });
                    dropdowStr = getHTML_dropdown_menu(dropdowStr);
                    htmlStr = htmlStr + getHTML(tm_item, dropdowStr, show);
                });
                return htmlStr;
            }

            $("#left_menu").html(getMenuStr(menu_list));

            sessionStorage.setItem('aNumber', '1')

            $(".collapse-btn").unbind().on("click",function () {
                $(".collapse").removeClass("show");
                var a=sessionStorage.getItem('aNumber');
                if(a==1){
                    $($(this).attr("data-target")).addClass("show");
                    sessionStorage.setItem('aNumber', '2')
                }else {
                    $($(this).attr("data-target")).removeClass("show");
                    sessionStorage.setItem('aNumber', '1')
                }

            });

            $(".dropdown-item").unbind().on("click", function () {
                $(".dropdown-item").removeClass("active");
                $(".aaaa").removeClass("active");
                $(this).addClass("active");
                loadPage($(this).attr("url"));
            });

            $(".AFirstMenu").unbind().on("click", function () {
                $(".aaaa").removeClass("active");
                $(".dropdown-item").removeClass("active");
                $(".collapse").removeClass("show");
                $(this).parent(".aaaa").addClass("active");
                loadPage($(this).attr("url"));
            });

            function loadPage(url) {
                orange.loadPage({
                    url: url, target: 'main_body', selector: '#fir_body', success: function (data) {
                        console.log(typeof data);
                        if (typeof data == "string") {
                            $("#main_body").html(data);
                            console.log(url + "加载")
                        } else {
                            alertUtil.error(url + '加载失败');
                        }
                    }
                })
            }

            $("#logout").on("click", function () {
                ajaxUtil.myAjax(null, "/logout", null, function (data) {
                    if (data && data.code === 88888) {
                        sessionStorage.clear();
                        localStorage.clear();
                        window.location.href = "/userLogin";
                    } else {
                        alertUtil.alert(data.msg);
                    }
                }, false)
            });

            if (!stringUtil.isBlank(currentUrlHash)) {
                loadPage(currentUrlHash);
            }

            $("#userName").text(sessionStorage.getItem('username'))
        })
})();
