(function() {
    define('bootstrapTableUtil', ['jquery','objectUtil','ajaxUtil','stringUtil','alertUtil','myBootstrapTable'], function(jquery,objectUtil,ajaxUtil,stringUtil,alertUtil) {

        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

        function myBootStrapTableInit(aTableID, aReqUrl, aParam, aColumns,aLoadSuccessCall,aLoadErrorCall,aClickRowCall) {
            var fColumns = new  Array();
            $.extend(fColumns,aColumns);
            fColumns.splice(0,0,
                {
                    width:'64px', title: '序号', align: 'center', formatter: function (value, row, index) {
                        //获取每页显示的数量
                        var pageSize = $("#"+aTableID).bootstrapTable('getOptions').pageSize;
                        //获取当前是第几页
                        var pageNumber = $("#"+aTableID).bootstrapTable('getOptions').pageNumber;
                        // return pageSize * (pageNumber - 1) + index + 1;  // 分页后出现断层
                        return index +1;
                    }
                }
            );

            $("#"+aTableID).bootstrapTable({
                theadClasses: 'self-thead',
                // ajax : function (request) {},
                url: aReqUrl,                       //请求后台的URL（*）
                method: 'GET',                     //请求方式（*）
                contentType: "application/json; charset=UTF-8",
                striped: true,                      //是否显示行间隔色
                cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                page: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 20, 30, 50],        //可供选择的每页的行数（*）
                paginationPreText: '上一页',
                paginationNextText: '下一页',
                // showColumns: true,               //是否显示所有的列（选择显示的列）
                // minimumCountColumns: 2,          //最少允许的列数
                search: false,                       //显示搜索框
                // searchOnEnterKey:true,              //回车后查询
                clickToSelect: true,                //是否启用点击选中行
                //search:true,                        //显示搜索框
                //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                queryParams: function (params) {
                    aParam.pageSize = params.limit;
                    aParam.page = (params.offset / params.limit) + 1;
                    aParam.sort = params.sort;       //排序列名
                    aParam.sortOrder = params.order; //排位命令（desc，asc）
                    return aParam;
                },
                showExport: false,      //是否显示导出按钮
                buttonsAlign: "right",   //按钮位置
                exportTypes: ['excel'],  //导出文件类型
                Icons: 'glyphicon-export',
                width: '100%',
                columns: fColumns,
                ajaxOptions: {

                    complete: function (XMLHttpRequest) {

                    }
                },
                responseHandler: function (data) {
                    if(ajaxUtil.notLoggedIn(data)){
                        window.location.href = "/userLogin";
                    }
                    if (data.code === 88888) {
                        var allTableData = data.data
                        //localStorage.setItem('2',JSON.stringify(data.data))
                        var req=window.indexedDB.open("myDB",1);
                        req.onsuccess=function(e){
                            var db=e.target.result;
                            //创建事物
                            var t=db.transaction(["search"],"readwrite");
                            var userStore=t.objectStore("search");
                            var addUserResult=userStore.put({
                                dataSearch:allTableData
                            },1);
                        };
                        return {
                            total: data.data.length,
                            rows: data.data
                        }
                    } else {
                        return  {total: 0, rows: []};
                    }
                },
                onLoadSuccess: function (res) {
                    if (!objectUtil.strIsBlank(aLoadSuccessCall)){
                        aLoadSuccessCall(res);
                    }
                },
                onLoadError: function () {
                    if(!objectUtil.strIsBlank(aLoadErrorCall)){
                        aLoadErrorCall()
                    }
                },
                onClickRow: function (row) {
                    if(!objectUtil.strIsBlank(aClickRowCall)){
                        aClickRowCall(row);
                    }
                },
            });

            var obj = new Object();
            obj.aTableID = aTableID;

            obj.free = function () {
                $("#"+obj.aTableID).bootstrapTable("destroy");
            };
            return obj;
        }


        function myBootStrapTableDestory(aTableID) {
            $("#"+aTableID).bootstrapTable("destroy");
        }

        // $(window).on('load',function(){
        //     var allTableData = $("#table").bootstrapTable("getData");
        //     localStorage.setItem('2',JSON.stringify(allTableData))
        //     obj2=JSON.parse(localStorage.getItem("2"));
        // })

        //$(".float-right").attr("display",block);

        function globalSearch(tableID, url, needParam, aCol, statusWord) {
            $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                //var allTableData = JSON.parse(localStorage.getItem("2"));
                var req = window.indexedDB.open("myDB", 1);
                req.onsuccess = function (e) {
                    var db = e.target.result;
                    //创建事物
                    var t = db.transaction(["search"], "readwrite");
                    var userStore = t.objectStore("search");
                    var request = userStore.get(1);
                    request.onsuccess = function (event) {
                        if (request.result) {
                            var allTableData = request.result.dataSearch;
                            if(str.indexOf("请输入")!=-1){
                                str=""
                            }
                            for (var i in allTableData) {
                                for (var v in aCol){
                                    var textP = allTableData[i][aCol[v].field];
                                    var isStatusSlot=false;           // 默认状态为true
                                    //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                                    var status= allTableData[i][statusWord]
                                    // console.log("addstr:"+addstr)
                                    // console.log("status:"+status)
                                    //调试时可以先打印出来，进行修改
                                    if(addstr==status || addstr==99){
                                        isStatusSlot=true;
                                    }
                                    if (textP == null || textP == undefined || textP == '') {
                                        textP = "1";
                                    }
                                    if(textP.search(str) != -1 && isStatusSlot){
                                        newArry.push(allTableData[i])
                                    }
                                }
                            }
                            var newArr=new Set(newArry)
                            newArry=Array.from(newArr)
                            $("#table").bootstrapTable("load", newArry);
                        } else {
                            console.log('未获得数据记录');
                        }
                    }
                };
            })

        }


        return {
            myBootStrapTableInit:myBootStrapTableInit,
            myBootStrapTableDestory:myBootStrapTableDestory,
            globalSearch:globalSearch,
        }



    })
})();