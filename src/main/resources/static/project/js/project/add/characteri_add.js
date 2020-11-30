(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/project/characteri";

            var opreateUrl = isUpdate() ? "/project/updateProject" : "/project/insertProject";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var characteriEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增功效特色成功";
                    characteriEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "1",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    characteriEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                    }
                    operateMessage = "更新功效特色成功";
                }

                fileUtil.handleFile(isUpdate(), characteriEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,opreateUrl,characteriEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            orange.redirect(pathUrl);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);

            });

            $("#btn_insert").unbind().on('click',function () {
                var characteriEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增功效特色成功";
                    characteriEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "1",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    characteriEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        price : $("#price").val(),
                        content : editor.txt.html(),
                    }
                    operateMessage = "更新功效特色成功";
                }

                fileUtil.handleFile(isUpdate(), characteriEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,opreateUrl,characteriEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            orange.redirect(pathUrl);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#price").val(tempdata.price),
                    editor.txt.html(tempdata.content);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
