
(function() {
    define('modalHtml', ['jquery','objectUtil', 'stringUtil', 'alertUtil', 'bootstrap'], function(jquery, objectUtil,stringUtil,alertUtil,bootstrap) {

        var modalHtml = new Object();

        modalHtml.defaultModalHtml = function defaultModalHtml(obj) {
            return '<div class="modal fade" id="'+obj.modalID+'" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">\n' +
                '            <div class="'+obj.modalClass+'">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <h5 class="modal-title" id="staticBackdropLabel">'+ obj.modalTitle +'</h5>\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                            <span aria-hidden="true">&times;</span>\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' + obj.modalBody +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" id="'+obj.modalCancelID+'" class="btn btn-secondary" data-dismiss="modal">'+obj.modalCancel+'</button>\n' +
                '                        <button type="button" id="'+obj.modalConfirmID+'" style="'+obj.confirmButtonStyle+'" class="'+ obj.confirmButtonClass +'">'+obj.modalConfirm+'</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>';

        };
        modalHtml.myViewCulturalModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalImgSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <img id="culturalImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalNameSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >作&emsp;&emsp;者</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalAuthor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >来&emsp;&emsp;源</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseCulturalSource" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalContentSpan" class="btn btn-primary btn-sm" >正&emsp;&emsp;文</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"id="chineseCulturalContent" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >附&emsp;&emsp;件</button>\n' +
            '                    </div>\n' +
            '                    <span id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';




        modalHtml.myCencelDistribution = "是否取消分配专家？";

        modalHtml.mySubmitProtection = "确认提交？";
        modalHtml.myPassProtection = "确认通过？";
        modalHtml.myNoPassProtection = "确认不通过？";
        modalHtml.myUnderShelfProtection = "确认下架？";
        modalHtml.myDeleteProtection = "确认删除？";
        modalHtml.myPublishProtection = "此信息发布后将展示给用户查看，需要文责自负，是否确认发布？";


        return modalHtml;

    });
})();
