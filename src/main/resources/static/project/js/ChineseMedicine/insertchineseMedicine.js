(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil','selectUtil','distpicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil,selectUtil,distpicker) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();
            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#classification").selectUtil(pl);




            $("#cancel").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/ChineseMedicine/chineseMedicine";
                orange.redirect(url);
            });

            $("#btn_insert").unbind().on('click',function () {
                var chinesemedicineEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertchinesemedicine";
                    operateMessage = "新增中药信息成功";
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
                        userCode : sessionStorage.getItem("itemcode")
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
                       /* chineseMedicineUsage : editor.txt.html()*/
                    }
                    operateMessage = "更新中药信息成功";
                }
                fileUtil.handleFile(isUpdate(), chinesemedicineEntity.itemcode, uploadImg.getFiles()[0]);
                ajaxUtil.myAjax(null,addUpdateUrl,chinesemedicineEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/ChineseMedicine/chineseMedicine";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });
            (function init() {
                if (isUpdate()){
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