(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil', 'datetimepicker'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil, datetimepicker) {


            var userCode = sessionStorage.getItem("itemcode");

            var baseUrl = "/accountSource/signal-source?userCode="+userCode;

            var getUrl = baseUrl + "&status&year";

            var opUrl = "/accountSource/signal-source";

            if(sessionStorage.getItem("rolename") == "管理员"){
                $('#btn_addTask').attr('style',"display:block");
            }

            var aParam = {};


            function operation(value, row, index) {
                if (row.status === '有效') {
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                } else {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>'
                    ].join('');
                }
            }

            //按钮事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    modalFun("put",row)
                },
                'click .view' : function (e,value, row,index) {
                    modalFun("get",row,true)
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalSignalSource",
                        modalTitle : "删除",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var entity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            }
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,opUrl,entity,function (data) {
                                if(ajaxUtil.success(data)){
                                    var submitConfirmModal = {
                                        modalBodyID :"myPassSuccessTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },
            }

            $("#search").unbind().on("click", function () {
                var param = {};
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            });

            $("#btnSearch").unbind().on('click',function () {
                var year = $("#yearSelect").val()
                var status = $("#statusSelect").val()
                getUrl = baseUrl+"&status="+status+"&year="+year;
                refreshTable()

            })

            //时间格式转换为时间戳
            function convertToDate(time) {
                var strDate = time.split(" ")[0].split("-");
                var year = parseInt(strDate[0]);
                var month = parseInt(strDate[1]) - 1;
                var date = parseInt(strDate[2]);
                var mydate = new Date();
                mydate.setFullYear(year, month, date);
                var hour;
                switch (time.split(" ")[1]) {
                    case "上午":
                        hour = 8;
                        break;
                    case "下午":
                        hour = 14;
                        break;
                }
                mydate.setHours(hour, 0, 0, 0);
                return mydate.getTime();
            }

            //弹窗事件
            function modalFun(reqType,row,view) {

                var myViewTimeModalData = {
                    modalBodyID: "myTimeModal",
                    modalTitle: "维护专家号源",
                    modalClass: "modal-md",
                    modalConfirmFun: function () {
                        var isSuccess = false;
                        var doctorCode = $("#docName").val()
                        var registerType = $("#numName").val()
                        var startTime = $("#startTime").val();
                        startTime = convertToDate(startTime);
                        var registerCount = $("#registerCount").val()
                        var param = {
                            "registerDate": startTime,
                            "registerType": registerType,
                            "doctorCode": doctorCode,
                            "userCode": userCode,
                            "status": "1",
                            "registerCount": registerCount
                        };

                        if (reqType == "put"){
                            param.itemid = row.itemid;
                            param.itemcode = row.itemcode;
                        }

                        var isSuccess = false;
                        ajaxUtil.myAjax(null, opUrl, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                var submitConfirmModal = {
                                    modalBodyID :"myPassSuccessTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();
                                isSuccess = true;
                                refreshTable();
                            }
                        }, false, true, reqType);
                        return isSuccess;
                    }
                };

                var myTravelModal = modalUtil.init(myViewTimeModalData);
                myTravelModal.show();
                if (view){
                    $(".modal-footer .btn-primary").remove()
                }
                var options = dictUtil.getDictByCode(dictUtil.DICT_LIST.numType);
                $("#numName").selectUtil(options);

                ajaxUtil.myAjax(null, "/accountSource/doctor?usercode=" + userCode, null, function (res) {
                    var data = res.data;
                    $("#docName").selectUtil(data);
                }, false, true, "get");

                if (row != null){
                    $("#docName").val(row.doctorCode)
                    $("#numName").val(dictUtil.getCode(dictUtil.DICT_LIST.numType,row.registerType))
                    $("#startTime").val(changeDateFormat(row.registerDate));
                    $("#registerCount").val(row.registerCount)
                }


                var date = new Date();
                $("#startTime").datetimepicker({
                    format: 'yyyy-mm-dd P',//显示格式
                    startDate: date,
                    startView: 2,
                    minView: 1,
                    maxView: 3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn: true,//清除按钮
                    showMeridian: true,
                });
                $("#endTime").datetimepicker({
                    format: 'yyyy-mm-dd P',//显示格式
                    startDate: date,
                    startView: 2,
                    minView: 1,
                    maxView: 3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn: true,//清除按钮
                    showMeridian: true,
                });
            }


            $("#btn_addTask").unbind().on('click', function () {
                modalFun("post")
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            //获取当前年份,并加到下拉框
            function genYear() {
                var thisYear = new Date();
                thisYear = thisYear.getFullYear();
                var yearArr = []
                for (let i = 0; i < 3; i++) {
                    yearArr.push({id: thisYear - i, text: thisYear - i})
                }
                return yearArr
            }

            pl = genYear();
            $("#yearSelect").selectUtil(pl);

            pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.signalSourceStatus);
            $("#statusSelect").selectUtil(pl);


            //时间格式转换
            function changeDateFormat(cellval) {
                if (cellval != null) {
                    var left = cellval.split(" ")[0].split("-")
                    var right = cellval.split(" ")[1].split(":")
                    var date = new Date();
                    date.setFullYear(parseInt(left[0]), parseInt(left[1]) - 1, parseInt(left[2]));
                    date.setHours(parseInt(right[0]), parseInt(right[1]), parseInt(right[2]))
                    var month = date.getMonth()+1;
                    var currentDate = date.getDate();

                    var week = getWeek(date.getDay());

                    var noon = date.getHours() < 12 ? "上午" : "下午";

                    return date.getFullYear() + "-" + month + "-" + currentDate + " " + week + " " + noon;
                }
            }

            function getWeek(num) {
                var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
                return weekList[num];
            }

            var aCol = [
                {
                    field: 'registerDate', title: '出诊日期', formatter: function (value, row, index) {
                        return changeDateFormat(value)
                    }
                },
                {field: 'doctorName', title: '医生姓名'},
                {field: 'registerType', title: '号别'},
                {field: 'registerCount', title: '预约量'},
                {field: 'status', title: '状态'},
                {field: 'action', title: '操作', width: '235px', formatter: operation, events: orgEvents}
            ];


            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

        })
})();
