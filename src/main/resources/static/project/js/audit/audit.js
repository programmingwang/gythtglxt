(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            //请求后台url
            var url = "/audit/hospital";

            var auditUrl = "/information";

            var rolename = sessionStorage.getItem("rolename");

            var dictMap = new Map();

            var dicList = dictUtil.getDictByCode(dictUtil.DICT_LIST.auditStatus);

            for (const t of dicList){
                if (t.id === "1"){
                    dictMap.set("待审核", t.id);
                }else {
                    dictMap.set(t.text, t.id );
                }
            }

            var pass;

            var nopass;

            if (rolename === "市级")
            {
                pass = "4";
                nopass = "5";
            }
            else if (rolename === "省级")
            {
                pass = "6";
                nopass = "7";
            }
            else if(rolename === "县级")
            {
                pass = "2";
                nopass = "3";
            }

            // var getUrl = url + "/" + sessionStorage.getItem("orgCode");
            var getUrl = url;
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                let code = dictMap.get(row.status)
                let tcode = parseInt(code);
                let tpass = parseInt(pass);
                let tnopass = parseInt(nopass);
                if ((tcode < tpass && tcode % 2 === 0 && tcode !== 0) || (tcode === 1 && rolename === "县级")){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="pass" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >通过</a>',
                        '<a class="nopass" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >不通过</a>',
                    ].join('')
                }
                else if (tcode >= tpass && tcode % 2 === 0 && tcode !== 0)
                {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>'
                    ].join('')
                }
                else if (tcode % 2 !== 0 && tcode !== tnopass )
                {
                    return [
                        '<a class="reason" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>'
                    ].join('')
                }
                else if (tcode % 2 !== 0 && tcode === tnopass)
                {
                    return [
                        '<a class="reason" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="pass" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >通过</a>',
                        '<a class="nopass" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >不通过</a>'
                    ].join('')
                }
            }

            //修改事件
            window.orgEvents = {
                'click .view' : function(e, value, row, index) {
                    var data = {};
                    let modalData ={
                        modalBodyID : "myViewHospitalModal",
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    data = row;
                    let myTravelModal = modalUtil.init(modalData);
                    $("#myImg").attr('src', data.filePath);
                    $("#hospitalName").val(data.hospitalName);
                    $("#hospitalPhone").val(data.hospitalPhone);
                    $("#address").val(data.hospitalPro + data.hospitalCity + data.hospitalCountry + data.hospitalAdress);
                    $("#introduce").html(data.introduce);
                    $("#creater").val(data.creater);
                    $("#itemcreateat").val(data.itemcreateat);

                    myTravelModal.show();

                },
                'click .pass': function (e, value, row, index) {
                    var param = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        status: pass
                    };
                    ajaxUtil.myAjax(null,auditUrl,param,function (data) {
                        alertUtil.info("修改成功");
                        refreshTable()
                    }, true,true,"put")
                },
                'click .nopass' : function(e, value, row, index) {
                    var param = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        reason: "",
                        status: nopass
                    };

                    var myModalData ={
                        modalBodyID : "myInputReason", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "输入理由",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            param.reason = $("#inputReason").val();
                            ajaxUtil.myAjax(null,auditUrl,param,function (data) {
                                alertUtil.info("修改成功");
                                myTravelModal.hide();
                                refreshTable();
                            }, true,true,"put")
                        },
                    };
                    var myTravelModal = modalUtil.init(myModalData);

                    myTravelModal.show();

                },
                'click .reason' : function(e, value, row, index) {
                    var myModalData ={
                        modalBodyID : "myViewReasonHtml", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看理由",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myTravelModal = modalUtil.init(myModalData);
                    $("#reason").html(row.reason);

                    myTravelModal.show();
                },
            };


            $("#search").unbind().on("click",function () {
                var param = {

                };
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            });



            var aCol;

            aCol = [
                {field: 'hospitalName', title: '国医堂名称'},
                {field: 'hospitalPhone', title: '联系电话'},
                {field: 'itemupdateat', title: '申请时间'},
                {field: 'status', title: '审核状态'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}]

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",getUrl,aParam, aCol);
        })
})();
