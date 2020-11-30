(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/project/selectchaAll?";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var pathUrl = "/project/add/characteri_add";
            if(sessionStorage.getItem("rolename") == "管理员"){
                $('#btn_addTask').attr('style',"display:block");
                url += "status="+webStatus[0].id+"&status="+webStatus[1].id+"&status="+webStatus[2].id+"&status="+webStatus[4].id+"&status="+webStatus[6].id+"&status="+webStatus[7].id+"&status="+webStatus[8].id+"&status="+webStatus[9].id + "&userCode="+sessionStorage.getItem("itemcode");
            }else if(sessionStorage.getItem("rolename") == "县级"){
                url += +status+"="+webStatus[1].id+"&status="+webStatus[8].id;
            }else if(sessionStorage.getItem("rolename") == "市级"){
                url += +status+"="+webStatus[3].id+"&status="+webStatus[8].id;
            }else if(sessionStorage.getItem("rolename") == "省级"){
                url += +status+"="+webStatus[5].id+"&status="+webStatus[8].id;
            }
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
                    var myDeleteModalCharacteri ={
                        modalBodyID :"myDeleteModalCharacteri",
                        modalTitle : "删除功效特色",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                itemid: row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/project/deleteProject/"+submitStatus.itemid+"/"+submitStatus.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                            if(!ajaxUtil.success(data)){
                                                return alertUtil.error("文件删除失败，可能已经损坏了");
                                            }
                                        },false,"","get");
                                        alertUtil.info("删除功效特色成功");
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
                    var myDeleteModalCharacteri = modalUtil.init(myDeleteModalCharacteri);
                    myDeleteModalCharacteri.show();
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                    var myViewCharacteriModalData ={
                        modalBodyID :"myViewCharacteriModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myViewCharacteriModal = modalUtil.init(myViewCharacteriModalData);
                    $("#name").val(row.name);
                    $("#price").val(row.price);
                    $("#content").html(row.content);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#dataStatus").val(webStatus[row.dataStatus].text);
                    $("#projectImg").attr("src",row.filePath)

                    myViewCharacteriModal.show();
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/project/updateProject",submitStatus,function (data) {
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
                var url = "/project/add/characteri_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var p2 = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#Search").selectUtil(p2);

            var aCol = [
                {field: 'name', title: '功效特色名称'},
                {field: 'filePath', title: '功效特色描述', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'price', title: '功效特色价格',formatter:function (value) {
                        return '<p>￥'+value+'</p>'
                    }},
                {field:'dataStatus',title:'功效特色状态',formatter:function (value) {
                        return '<p>'+webStatus[value].text+'</p>'
                    }},
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