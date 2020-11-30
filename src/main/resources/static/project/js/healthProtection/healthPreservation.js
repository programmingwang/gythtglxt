(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/healthProtection/hotspot?type=0&";

            var pathUrl = "/healthProtection/add/healthPreservation_add";
            var operateUrl = "/healthProtection/hotspot";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);

            //角色加载工具
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"status",webStatus);

            var aParam = {

            };



            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus)
            }



            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(pathUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID :"myDeleteProtection",
                        modalTitle : "删除节气养生信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                            if(!ajaxUtil.success(data)){
                                                return alertUtil.error("文件删除失败，可能已经损坏了");
                                            }
                                        },false,"","get");
                                        alertUtil.info("删除节气养生信息成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassModalData ={
                        modalBodyID :"myPassProtection",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : selectUtil.getPassStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                console.log(data);
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        alertUtil.info("已通过");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myPassModal = modalUtil.init(myPassModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailTravelModalData ={
                        modalBodyID :"myNoPassProtection",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : selectUtil.getFailStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailTravelModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfModalData ={
                        modalBodyID :"myUnderShelfProtection",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : webStatus[9].id
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("下架成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewModalData ={
                        modalBodyID :"myViewHotSpotModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myViewModal = modalUtil.init(myViewModalData);
                    $("#hotspotTitle").val(row.hotspotTitle);
                    $("#hotspotSource").val(row.hotspotSource);
                    $("#hotspotAuthor").val(row.hotspotAuthor);
                    $("#hotspotContent").html(row.hotspotContent);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#dataStatus").val(webStatus[row.dataStatus].text);
                    $("#hotspotImg").attr("src",row.filePath)

                    myViewModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitModalData ={
                        modalBodyID :"mySubmitProtection",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : webStatus[1].id
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitModalData ={
                        modalBodyID :"myNoSubmitProtection",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已取消提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myNoSubmitModal = modalUtil.init(myNoSubmitModalData);
                    myNoSubmitModal.show();
                },

                'click .publish' : function (e, value, row, index) {
                    var myPublishModalData ={
                        modalBodyID :"myPublishProtection",
                        modalTitle : "信息发布",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode,
                                dataStatus : webStatus[8].id
                            };
                            ajaxUtil.myAjax(null,operateUrl,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已发布");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myPublishModal = modalUtil.init(myPublishModalData);
                    myPublishModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(pathUrl);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'hotspotTitle', title: '文章标题'},
                {field: 'filePath', title: '热点图片', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'hotspotSource', title: '来源'},
                {field: 'hotspotAuthor', title: '作者'},
                {field: 'itemcreateat', title: '发布时间'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }


            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));

        })
})();

