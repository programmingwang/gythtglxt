(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/healthProtection/hotspot?type=4&";

            var pathUrl = "/healthProtection/add/kidsHealth_add";
            var operateUrl = "/healthProtection/hotspot";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#btn_addTask").attr("style","display:block");

            //角色加载工具
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"status",webStatus);

            var aParam = {

            };



            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus)
                // return [
                //     '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                //     '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                //     '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                //     '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                //     '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="" >取消提交</a>',
                //     '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                //     '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                //     '<a class="publish"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >发布</a>',
                //     '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                // ].join('');
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
                        modalTitle : "删除儿童健康信息",
                        modalClass : "modal-lg",
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
                                        var submitConfirmModal = {
                                            modalBodyID: "myPassSuccessTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
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

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfModalData ={
                        modalBodyID :"myUnderShelfProtection",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        confirmButtonClass: "btn-danger",
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
                                        var submitConfirmModal = {
                                            modalBodyID: "myPassSuccessTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
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

                'click .publish' : function (e, value, row, index) {
                    var myPublishModalData ={
                        modalBodyID :"myPublishProtection",
                        modalTitle : "信息发布",
                        modalClass : "modal-lg",
                        confirmButtonClass: "btn-danger",
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
                                        var submitConfirmModal = {
                                            modalBodyID :"myPublishToWechat",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
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


            bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "dataStatus");

        })
})();

