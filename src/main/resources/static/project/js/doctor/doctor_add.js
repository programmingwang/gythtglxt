(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg) {
            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/doctor/doctor"
            var numType = dictUtil.getDictByCode(dictUtil.DICT_LIST.numType);

            /*初始化数据*/
            uploadImg.init();
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    uploadImg.setImgSrc(tempdata.filePath)

                    $("#doctorName").val(tempdata.doctorName);
                    $("#doctorTitle").val(tempdata.doctorTitle);
                    $("#doctorTreatment").val(tempdata.doctorTreatment);
                    $("#numType").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.numType) {
                            $this.attr("selected", true);
                        }
                    });
                }
            }());
            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
            $("#numType").selectUtil(numType);

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            /*处理保存按钮*/
            $("#btn_insert").unbind().on('click',function () {
                var entity;
                var requestUrl = "/doctor/doctor";
                var operateMessage;
                var requestType;

                if (!updateStatus){
                    operateMessage = "新增医生信息成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                    requestType = "post";
                }
                else {
                    operateMessage = "更新医生信息成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                    requestType = "put";
                }
                entity["doctorName"] = $("#doctorName").val();
                entity["doctorTitle"] = $("#doctorTitle").val();
                entity["doctorTreatment"] = $("#doctorTreatment").val();
                entity["deptCode"] = $("#deptCode").val();
                entity["numType"] = numType[$("#numType").val()].text;


                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,requestType);
            });

        });
})();
