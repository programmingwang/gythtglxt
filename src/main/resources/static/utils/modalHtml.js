(function () {
    define('modalHtml', ['jquery', 'objectUtil', 'stringUtil', 'alertUtil', 'bootstrap'], function (jquery, objectUtil, stringUtil, alertUtil, bootstrap) {

        var modalHtml = new Object();

        modalHtml.defaultModalHtml = function defaultModalHtml(obj) {
            return '<div class="modal fade" id="' + obj.modalID + '" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
                '            <div class="' + obj.modalClass + '">' +
                '                <div class="modal-content" style="width: 100%">' +
                '                    <div class="modal-header">' +
                '                        <h5 class="modal-title" id="staticBackdropLabel">' + obj.modalTitle + '</h5>' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '                            <span aria-hidden="true">&times;</span>' +
                '                        </button>' +
                '                    </div>' +
                '                    <div class="modal-body">' + obj.modalBody +
                '                    </div>' +
                '                    <div class="modal-footer">' +
                '                        <button type="button" id="' + obj.modalCancelID + '"  style="' + obj.cancelButtonStyle + '" class="btn btn-secondary" data-dismiss="modal">' + obj.modalCancel + '</button>' +
                '                        <button type="button" id="' + obj.modalConfirmID + '" style="' + obj.confirmButtonStyle + '" class="' + obj.confirmButtonClass + '">' + obj.modalConfirm + '</button>' +
                '                    </div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '    </div>';

        };


        modalHtml.myviewChineseMedicineModal =
            '<div class="row">' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span id="lefttext" class="lefttext">中药名称：</span>' +
            '                                </div>' +
            '                                <input type=" text" id="name" class="form-control col-lg-9 col-md-9">' +
            '                        </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">别名：</span>' +
            '                                </div>' +
            '                                <input type="text" id="alias" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">功效分类：</span>' +
            '                                </div>' +
            '                                <input type="text" id="classification" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">采制：</span>' +
            '                                </div>' +
            '                                <input type="text" id="harvesting" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">性味：</span>' +
            '                                </div>' +
            '                                <input type="text" id="taste" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">归经：</span>' +
            '                                </div>' +
            '                                <input type="text" id="merTropism" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">功效主治：</span>' +
            '                                </div>' +
            '                                <input type="text" id="governance" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">用法用量：</span>' +
            '                                </div>' +
            '                                <input type="text" id="usage" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span class="lefttext">数据状态：</span>' +
            '                                </div>' +
            '                                <input type="text" id="status" class="form-control col-lg-9 col-md-9">' +
            '                            </div>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-6 col-md-6">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                                    <span class="lefttext" for="applicant">创建人：</span>' +
            '                                </div>' +
            '                                <input  type="text" id="creater" class="form-control col-lg-6 col-md-6">' +
            '                            </div>' +
            '                        </fieldset>' +
            '                    </div>' +
            '' +
            '                    <div class="col-lg-6 col-md-6">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                                    <span class="lefttext" for="applicant">创建时间：</span>' +
            '                                </div>' +
            '                                <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">' +
            '                            </div>' +
            '                        </fieldset>' +
            '                    </div>' +
            '                    <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                        <fieldset disabled>' +
            '                            <div class="input-group mb-3 row">' +
            '                                <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                                    <span id="mediCineImgSpan" class="lefttext">药材图片：</span>' +
            '                                </div>' +
            '                                <div class="col-lg-9 col-md-9" style="padding: 0;"><img id="mediCineImg" src="#" style="width: 100px;height: 100px;float: left;" /></div>' +
            '                            </div>' +
            '                    </div>' +
            '        </div>';

        //查看理由
        modalHtml.myViewReasonHtml =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3 row">' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                        <span   class="lefttext" >理由：</span>' +
            '                    </div>' +
            '                  <div class="col-lg-9 col-md-9" style="padding: 0">' +
            '                       <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:scroll;word-break: break-all;" id="viewReason" class="form-control">' +
            '                       </div>' +
            '                  </div>' +
            '                </div>' +
            '            </div>' +
            '</div>';





        modalHtml.myTimeModal = '<div class="row">    ' +
            '   <div class=" col-lg-12 col-md-12 mb-3">' +
            '      <div>' +
            '   <label class="input-label col-lg-3 col-md-3" style="display: inline"><span style="color: red">*</span>出诊时间</label>' +
            '        <input type="text" id="startTime" class="col-lg-9 col-md-9" style="height: 3rem;">  <i class="fa fa-calendar fa-lg" style="position: absolute;top: 1rem;right: 2.5rem;"></i>' +
            '      </div>' +
            '   </div> ' +
            '   <div class=" col-lg-12 col-md-12 mb-3">' +
            '      <div>' +
            '   <label class="input-label col-lg-3 col-md-3 " style="display: inline;padding-left: 3rem"><span style="color: red">*</span>号别</label>' +
        '         <select id="numName" class="col-lg-9 col-md-9" style="height: 3rem;">' +
        '         </select>' +
        '      </div>' +
        '   </div> ' +

        '   <div class=" col-lg-12 col-md-12 mb-3">' +
        '      <div>' +
            '   <label class="input-label col-lg-3 col-md-3 " style="display: inline"><span style="color: red">*</span>医生姓名</label>' +
        '         <select id="docName" class="col-lg-9 col-md-9" style="height: 3rem;">' +
        '         </select>' +
        '      </div>' +
        '   </div> ' +
        '   <div class=" col-lg-12 col-md-12 mb-3">' +
        '      <div>' +
            '   <label class="input-label col-lg-3 col-md-3 " style="display: inline;padding-left: 2rem"><span style="color: red">*</span>预约量</label>' +
        '         <input id="registerCount" type="number" class="col-lg-9 col-md-9" style="height: 3rem;" oninput="if(value>201)value=200" onkeyup="value=value.replace(/[^\\d]/g,\'\').replace(/^00{1,}/g,\'\')">' +
        '      </div>' +
        '   </div> ' +
        '</div>'
        ;



        modalHtml.myResonable = "<div>" +
            "        <textarea name=\"\" id=\"reason\" cols=\"96\" rows=\"10\"></textarea>" +
            "    </div>";

        modalHtml.myViewHotSpotModal =
            '<div class="row">' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">热点标题：</span>' +
            '                        </div>' +
            '                        <input type="text" id="hotspotTitle" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext">来源：</span>' +
            '                        </div>' +
            '                        <input  type="text" id="hotspotSource" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext">作者：</span>' +
            '                        </div>' +
            '                        <input type="text" id="hotspotAuthor" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">正文：</span>' +
            '                        </div>' +
            '                        <div class="col-lg-9 col-md-9" style="padding:0;">' +
            '                            <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"' +
            '                                id="hotspotContent" class="form-control ">' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">数据状态：</span>' +
            '                        </div>' +
            '                        <input type="text" id="dataStatus" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建人：</span>' +
            '                        </div>' +
            '                        <input  type="text" id="creater" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建时间：</span>' +
            '                        </div>' +
            '                        <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">热点图片：</span>' +
            '                        </div>' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0"><img id="hotspotImg" src="#"  style="width: 100px;height: 100px;color: #775637;"/></div>' +
            '                    </div>' +
            '            </div>' +
            '        </div>';

        modalHtml.myViewHospitalModal =
            '<div class="row">' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">国医堂名称：</span>' +
            '                        </div>' +
            '                        <input type="text" id="hospitalName" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">联系电话：</span>' +
            '                        </div>' +
            '                        <input type="text" id="hospitalPhone" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">地址：</span>' +
            '                        </div>' +
            '                        <input type="text" id="address" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">简介：</span>' +
            '                        </div>' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0">' +
            '                            <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"' +
            '                                id="introduce" class="form-control">' +
            '                            </div>' +
            '                        </div>' +
            '' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建人：</span>' +
            '                        </div>' +
            '                        <input  type="text" id="creater" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建时间：</span>' +
            '                        </div>' +
            '                        <input type="text" id="itemcreateat" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">国医堂照片：</span>' +
            '                        </div>' +
            '                        <img id="myImg1" src="#" class="col-lg-2" style="width: 100px;height: 100px" />' +
            '                        <img id="myImg2" src="#" class="col-lg-2" style="width: 100px;height: 100px"/>' +
            '                        <img id="myImg3" src="#" class="col-lg-2" style="width: 100px;height: 100px"/>' +
            '                        <img id="myImg4" src="#" class="col-lg-2" style="width: 100px;height: 100px"/>' +
            '                        <img id="myImg5" src="#" class="col-lg-2" style="width: 100px;height: 100px"/>' +
            '                    </div>' +
            '            </div>' +
            '        </div>';

        modalHtml.myViewProjectModal =
            '<div class="row">' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row">' +
            '                        <div class="input-group-prepend  col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">功效特色名称：</span>' +
            '                        </div>' +
            '                        <input type="text" id="name" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">正文：</span>' +
            '                        </div>' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0">' +
            '                            <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"' +
            '                                id="content" class="form-control ">' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12 ">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row">' +
            '                        <div class="input-group-prepend  col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">数据状态：</span>' +
            '                        </div>' +
            '                        <input type="text" id="dataStatus" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6 ">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row ">' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建人：</span>' +
            '                        </div>' +
            '                        <input  type="text" id="creater" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6 ">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row ">' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建时间：</span>' +
            '                        </div>' +
            '                        <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12 ">' +
            '                <fieldset disabled>' +
            '                    <div class=" input-group mb-3 row ">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">图片：</span>' +
            '                        </div>' +
            '                        <span id="projectImg" class="col-lg-9 col-md-9" style="margin-top: 6px;padding-left: 9px;"></span>' +
            '                    </div>' +
            '            </div>' +
            '' +
            '        </div>';


        modalHtml.myViewCharacteriModal =
            ' <div class="row">' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">开展项目名称：</span>' +
            '                        </div>' +
            '                        <input type="text" id="name" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">开展项目价格：</span>' +
            '                        </div>' +
            '                        <span' +
            '                            style="position: absolute;top: 0.3rem;left: 9.7rem;font-size: 19px;z-index: 1050;">￥</span>' +
            '                        <input style="text-indent: 1rem;" type="text" id="price" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">正文：</span>' +
            '                        </div>' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">' +
            '                            <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"' +
            '                                id="content" class="form-control">' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">数据状态：</span>' +
            '                        </div>' +
            '                        <input type="text" id="dataStatus" class="form-control col-lg-9 col-md-9">' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建人：</span>' +
            '                        </div>' +
            '                        <input type="text" id="creater" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '' +
            '            <div class="col-lg-6 col-md-6">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">' +
            '                            <span class="lefttext" for="applicant">创建时间：</span>' +
            '                        </div>' +
            '                        <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">' +
            '                    </div>' +
            '                </fieldset>' +
            '            </div>' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span  class="lefttext">图片：</span>' +
            '                        </div>' +
            '                        <span style="margin-top: 6px;padding-left: 9px;" id="projectImg" class="col-lg-9 col-md-9"></span>' +
            '                    </div>' +
            '            </div>' +
            '' +
            '        </div>';

        modalHtml.checkImgDetails =
            '<div class="row">' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">图片1：</span>' +
            '                        </div>' +
            '                        <img id="projectImg1" src="#" style="display: none" />' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">图片2：</span>' +
            '                        </div>' +
            '                        <img id="projectImg2" src="#" style="display: none" />' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">图片3：</span>' +
            '                        </div>' +
            '                        <img id="projectImg3" src="#" style="display: none" />' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">图片4：</span>' +
            '                        </div>' +
            '                        <img id="projectImg4" src="#" style="display: none" />' +
            '                    </div>' +
            '            </div>' +
            '' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">' +
            '                <fieldset disabled>' +
            '                    <div class="input-group mb-3 row">' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">' +
            '                            <span class="lefttext">图片5：</span>' +
            '                        </div>' +
            '                        <img id="projectImg5" src="#" style="display: none" />' +
            '                    </div>' +
            '            </div>' +
            '' +
            '        </div>';

        modalHtml.myChangePasswordModal = ' <div class="row">' +
            '            <div class="col-lg-12 col-md-12 mb-3" style="margin-top: 0;padding-top: 0;">' +
            '                <div class="row">' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName" style="margin-top: 0;padding-top: 0;">电话号码：</span> </div>' +
            '                    <input type="text" id="phone" class="form-control col-lg-9 col-md-9">' +
            '                </div>' +
            '            </div>' +
            '            <div class="col-lg-12 col-md-12 mb-3">' +
            '                <div class="row">' +
            '                    <div class="col-lg-2 col-md-2">' +
            '                        <sapn class="titleName">原密码：</sapn>' +
            '                    </div>' +
            '                    <input type="password" id="oldPwd" class="form-control col-lg-9 col-md-9">' +
            '                </div>' +
            '            </div>' +
            '            <div class="col-lg-12 col-md-12 mb-3">' +
            '                <div class="row">' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">新密码：</span> </div>' +
            '                    <input type="password" id="newPwd" class="form-control col-lg-9 col-md-9">' +
            '                </div>' +
            '            </div>' +
            '            <div class="col-lg-12 col-md-12 mb-3">' +
            '                <div class="row">' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">确认密码：</span> </div>' +
            '                    <input type="password" id="checkPwd" class="form-control col-lg-9 col-md-9">' +
            '                </div>' +
            '            </div>' +
            '        </div>';


        modalHtml.myDeleteModalCharacteri = '是否删除开展项目?';
        modalHtml.myDeleteModalProject = '是否删除功效特色?';
        modalHtml.mySubmitModal = '确认提交吗？';
        modalHtml.myPassModal = '确认通过吗？';
        modalHtml.myFailModal = '确认不通过吗？';
        modalHtml.myUnderShelfModal = '确认下架吗？';
        modalHtml.myConfirmModal = '修改信息需要上级审核，确认修改？';
        modalHtml.myShowModal = '确认展示吗？';
        modalHtml.myNoSubmitModal = '确认修改为初始状态吗？';
        modalHtml.myDeleteModalSignalSource = "是否删除号源"
        modalHtml.myDeleteDoctor = "是否删除此医生信息？";
        modalHtml.myDeleteDoctorSignalSource = "此医生还有预约挂号的信息，是否删除该医生信息？";
        modalHtml.mySubmitProtection = "确认提交？";
        modalHtml.mySubmitProtectionUp = "确认提交?提交后数据将直接在小程序显示,文责自负!若有问题,请紧急下架!";
        modalHtml.myNoSubmitProtection = "确认取消提交？";
        modalHtml.myPassProtection = "确认通过？";
        modalHtml.myNoSubmitProtection = '确认取消提交';
        modalHtml.myNoPassProtection = "确认不通过？";
        modalHtml.myUnderShelfProtection = "紧急下架后，公众用户将不能查看，确定下架吗？";
        modalHtml.myDeleteProtection = "确认删除？";
        modalHtml.myPublishProtection = "此信息发布后将展示给用户查看，需要文责自负，是否确认发布？";
        modalHtml.myPublishToWechat = "您已发布到小程序";
        modalHtml.myPublishTNextDepart = "您已成功提交";
        modalHtml.myAuditSubmitProtectionCountry = "提交后需要县级审核，确认提交？";
        modalHtml.myAuditPassProtectionCity = "您通过后需要市级审核，确认通过？";
        modalHtml.myAuditPassProtectionPre = "您通过后需要省级审核，确认通过？";
        modalHtml.myPassProtectionUp = "您通过后管理员需要进行最后确认，确认通过？";
        modalHtml.myPassSuccessTip = "操作成功";
        modalHtml.myUpdateConfirm = "更新信息将从小程序下架，是否保存？"
        modalHtml.myPublishDoctor = "您确定发布此医生的信息吗？"
        return modalHtml;
    });
})();

