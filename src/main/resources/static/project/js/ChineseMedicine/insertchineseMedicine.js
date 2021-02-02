(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil','selectUtil','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil,selectUtil,distpicker,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();
            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#classification").selectUtil(pl);




            $("#cancel").unbind().on('click',function () {
                var url = "/ChineseMedicine/chineseMedicine";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var chinesemedicineEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertchinesemedicine";
                    operateMessage = "新增中药信息成功!";
                    chinesemedicineEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),//中药名称
                        alias : $("#alias").val(),//别名
                        classification : $("#classification").val(),//功效分类
                        harvesting : $("#harvesting").val(),//采制
                        taste : $("#taste").val(),//性味
                        merTropism : $("#merTropism").val(),//归经
                        governance : $("#governance").val(),//功能主治
                        usage :$("#usage").val(),//用法用量
                        userCode : sessionStorage.getItem("itemcode"),
                        status　:　"0",
                        /*chineseMedicineUsage : editor.txt.html()*/
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatechinesemedicine";
                    chinesemedicineEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),//中药名称
                        alias : $("#alias").val(),//别名
                        classification : $("#classification").val(),//功效分类
                        harvesting : $("#harvesting").val(),//采制
                        taste : $("#taste").val(),//性味
                        merTropism : $("#merTropism").val(),//归经
                        governance : $("#governance").val(),//功能主治
                        usage :$("#usage").val(),//用法用量
                        status　:　"0",
                        /* chineseMedicineUsage : editor.txt.html()*/
                    }
                    operateMessage = "更新中药信息成功";
                }
                fileUtil.handleFile(isUpdate(), chinesemedicineEntity.itemcode, uploadImg.getFiles()[0]);
                ajaxUtil.myAjax(null,addUpdateUrl,chinesemedicineEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID: "myPublishToWechat",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                var url = "/ChineseMedicine/chineseMedicine";
                                orange.redirect(url);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var myPublishModalData = {
                    modalBodyID: "myPublishProtection",
                    modalTitle: "信息发布",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var isSuccess = false;
                        var chinesemedicineEntity;
                        var addUpdateUrl;
                        var operateMessage;
                        if (!isUpdate()) {
                            addUpdateUrl = "insertchinesemedicine";
                            operateMessage = "新增中药信息成功,信息将直接显示到国医堂小程序中,文责自负!如有问题请紧急下架!";
                            chinesemedicineEntity = {
                                itemcode: stringUtil.getUUID(),
                                name: $("#name").val(),//中药名称
                                alias: $("#alias").val(),//别名
                                classification: $("#classification").val(),//功效分类
                                harvesting: $("#harvesting").val(),//采制
                                taste: $("#taste").val(),//性味
                                merTropism: $("#merTropism").val(),//归经
                                governance: $("#governance").val(),//功能主治
                                usage: $("#usage").val(),//用法用量
                                userCode: sessionStorage.getItem("itemcode"),
                                status: "8",
                                /*chineseMedicineUsage : editor.txt.html()*/
                            };
                        } else {
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "updatechinesemedicine";
                            chinesemedicineEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                name: $("#name").val(),//中药名称
                                alias: $("#alias").val(),//别名
                                classification: $("#classification").val(),//功效分类
                                harvesting: $("#harvesting").val(),//采制
                                taste: $("#taste").val(),//性味
                                merTropism: $("#merTropism").val(),//归经
                                governance: $("#governance").val(),//功能主治
                                usage: $("#usage").val(),//用法用量
                                status: "8",
                                /* chineseMedicineUsage : editor.txt.html()*/
                            }
                            operateMessage = "更新中药信息成功";
                        }
                        fileUtil.handleFile(isUpdate(), chinesemedicineEntity.itemcode, uploadImg.getFiles()[0]);
                        ajaxUtil.myAjax(null, addUpdateUrl, chinesemedicineEntity, function (data) {
                            if (ajaxUtil.success(data)) {
                                var submitConfirmModal = {
                                    modalBodyID: "myPublishToWechat",
                                    modalTitle: "提示",
                                    modalClass: "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun: function () {
                                        var url = "/ChineseMedicine/chineseMedicine";
                                        orange.redirect(url);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();
                            } else {

                                alertUtil.alert(data.msg);
                            }
                        }, false, true);
                    }
                }
                var x = modalUtil.init(myPublishModalData);
                x.show();
                return false;
            });
            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改中药常识热点信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#alias").val(tempdata.alias);
                   /* $("#classification").find("option[value='请选择']").attr("selected", false);
                    var selectedVal;
                    for(var i = 0;i<pl.length;i++){
                        if(pl[i].text == tempdata.classification){
                            selectedVal = i;
                            break;
                        }
                    }
                    $("#classification").val(selectedVal);*/
                    $("#classification").val(tempdata.classification);
                    $("#harvesting").val(tempdata.harvesting);
                    $("#taste").val(tempdata.taste);
                    $("#governance").val(tempdata.governance);
                    $("#usage").val(tempdata.usage);
                    $("#merTropism").val(tempdata.merTropism);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }else{
                    $( "<option value=\"请选择\" selected='selected'>请选择</option>").prependTo($( "#classification"));
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();