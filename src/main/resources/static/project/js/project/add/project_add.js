(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = objectUtil.wangEditorUtil();
            // uploadImg.init();
            var pathUrl = "/project/project";

            var opreateUrl = isUpdate() ? "/project/updateProject" : "/project/insertProject";

            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                orange.redirect(pathUrl);
            });

            $("#btn_save").unbind().on('click',function () {
                var projectEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增功效特色成功";
                    projectEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        content : editor.txt.html(),
                        dataStatus : "0" ,
                        dataType : "0",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    projectEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        dataStatus : "0" ,
                        content : editor.txt.html(),
                    }
                    operateMessage = "更新功效特色成功";
                }

                ajaxUtil.upload_multi(projectEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))

                ajaxUtil.myAjax(null,opreateUrl,projectEntity,function (data) {
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
                var projectEntity;
                var operateMessage;
                if(!isUpdate()){
                    operateMessage = "新增功效特色成功";
                    projectEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        content : editor.txt.html(),
                        dataStatus : "1" ,
                        dataType : "0",
                        userCode : sessionStorage.getItem("itemcode")
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    projectEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        dataStatus : "1" ,
                        content : editor.txt.html(),
                    }
                    operateMessage = "更新功效特色成功";
                }

                ajaxUtil.upload_multi(projectEntity.itemcode, uploadImg.getFiles(), sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))

                ajaxUtil.myAjax(null,opreateUrl,projectEntity,function (data) {
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
                    editor.txt.html(tempdata.content);
                    uploadImg.setImgSrcs(tempdata.filePath);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
