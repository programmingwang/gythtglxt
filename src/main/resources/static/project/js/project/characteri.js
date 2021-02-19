(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/project/selectchaAll?";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var pathUrl = "/project/add/characteri_add";
            if(sessionStorage.getItem("rolename") == "管理员"){
                $('#btn_addTask').attr('style',"display:block");
                // url += "status="+webStatus[0].id+"&status="+webStatus[1].id+"&status="+webStatus[2].id+"&status="+webStatus[4].id+"&status="+webStatus[6].id+"&status="+webStatus[7].id+"&status="+webStatus[8].id+"&status="+webStatus[9].id + "&userCode="+sessionStorage.getItem("itemcode");
                url += "status=1&userCode="+sessionStorage.getItem("itemcode");
            }else if(sessionStorage.getItem("rolename") == "县级"){
                // url += "status="+webStatus[1].id+"&status="+webStatus[8].id;
                url += "status=2";
            }else if(sessionStorage.getItem("rolename") == "市级"){
                // url += "status="+webStatus[3].id+"&status="+webStatus[8].id;
                url += "status=3";
            }else if(sessionStorage.getItem("rolename") == "省级"){
                // url += "status="+webStatus[5].id+"&status="+webStatus[8].id;
                url += "status=4";
            }
            var aParam = {

            };
            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperateProCha(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus)
            }

            function operation2(value, row, index){
                // var value1 = new Array();
                // for(var i=0;i<row.dataCode.length;i++){
                //     if(row.itemcode == row.dataCode[i]) {
                //         value1.push(value[i]);
                //     }
                // }
                // if(value[0] == "已经损坏了"){
                //     return '<p>已经全部或这张损坏了</p>';
                // }else{
                //     return '<img  src='+value1[0]+' width="100" height="100" class="checkImgs img-rounded" >';
                // }
                return '<img  src='+row.filePath[0]+' width="100" height="100" class="checkImgs img-rounded" >';

            }

            window.checkImgDetailsEvents = {
                'click .checkImgs' : function (e, value, row, index) {
                    // var value1 = new Array();
                    // for(var i=0;i<row.dataCode.length;i++){
                    //     if(row.itemcode == row.dataCode[i]) {
                    //         value1.push(value[i]);
                    //     }
                    // }
                    var myCheckImg ={
                        modalBodyID :"checkImgDetails", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看图片详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myCheckImgModal = modalUtil.init(myCheckImg);
                    for(var i=0;i<row.filePath.length;i++){
                        var element = "#projectImg"+(i+1)
                        $(element).attr("style","display:block");
                        $(element).attr("src",row.filePath[i]);
                    }

                    myCheckImgModal.show();
                }
            };

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(pathUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalCharacteri ={
                        modalBodyID :"myDeleteModalCharacteri",
                        modalTitle : "删除开展项目",
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
                    var myDeleteModal = modalUtil.init(myDeleteModalCharacteri);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var role = sessionStorage.getItem("rolename");
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
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    if(role == "县级") myPassModalData.modalBodyID = "myAuditPassProtectionCity";
                    else if(role == "市级") myPassModalData.modalBodyID = "myAuditPassProtectionPre";
                    else if(role == "省级") myPassModalData.modalBodyID = "myPassProtectionUp";
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
                    $("#projectImg").html("请点击表格图片查看图片详情");

                    myViewCharacteriModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitModalData ={
                        modalBodyID :"myAuditSubmitProtectionCountry",
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
                                        var submitConfirmModal = {
                                            modalBodyID :"myPublishTNextDepart",
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

            $("#chargePersonSearch").selectUtil(selectUtil.inSearchStatus());


            var aCol;
            if(sessionStorage.getItem("rolename") != "管理员"){
                aCol = [
                    {field: 'hospitalName', title: '国医堂名称'},
                    {field: 'name', title: '开展项目名称'},
                    {field: 'filePath', title: '开展项目描述',formatter: operation2, events:checkImgDetailsEvents},
                    {field: 'price', title: '开展项目价格',formatter:function (value) {
                            var price = value.toString()
                            return '￥'+price
                        }},
                    {field:'dataStatus',title:'开展项目状态',formatter:function (value) {
                            return webStatus[value].text
                        }},
                    {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
                ];
            }else {
                aCol = [
                    {field: 'name', title: '开展项目名称'},
                    {field: 'filePath', title: '开展项目描述',formatter: operation2, events:checkImgDetailsEvents},
                    {field: 'price', title: '开展项目价格',formatter:function (value) {
                            var price = value.toString()
                            return '￥'+price
                        }},
                    {field:'dataStatus',title:'开展项目状态',formatter:function (value) {
                            return webStatus[value].text
                        }},
                    {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
                ];
            }

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status= allTableData[i]["dataStatus"]
                        if(status == "0") status =0;
                        else if(status == "1" || status == "3" || status =="5" || status == "7") status = 1;
                        else if(status == "2" || status == "4" || status == "6") status = 2;
                        else if(status == "8") status = 3;
                        else if (status == "9") status = 4;
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status || addstr=="99"){
                            isStatusSlot=true;
                        }
                        if(typeof textP == "object") continue;
                        else if(typeof textP == "number") textP = textP.toString();
                        //当存在时将条件改为flase
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

            })

        })
})();