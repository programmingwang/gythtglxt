(function() {
    define('selectUtil', ['jquery','objectUtil','dictUtil'], function(jquery,objectUtil,dictUtil) {


        $.fn.extend({
            selectUtil: function (data) {
                var html = "";
                $.each(data,function (i,it) {
                    html = html + '<option value="'+it.id+'">'+it.text+'</option>';
                });
                $(this).html("");
                $(this).append(html);
                return $(this);
            }
        });
        
        function getRoleTable(role,preUrl,status,webStatus) {
            if(role === "管理员"){
                $('#btn_addTask').attr('style',"display:block");
                return preUrl +status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id + "&userCode="+sessionStorage.getItem("itemcode");
            }else if(role === "县级"){
                return preUrl +status+"="+webStatus[1].id+"&"+status+"="+webStatus[8].id;
            }else if(role === "市级"){
                return preUrl +status+"="+webStatus[3].id+"&"+status+"="+webStatus[8].id;
            }else if(role === "省级"){
                return preUrl +status+"="+webStatus[5].id+"&"+status+"="+webStatus[8].id;
            }
        }
        
        function getRoleOperate(value, row, index, role, status,webStatus) {
            if(role === "管理员"){
                if(status == webStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[4].id || status == webStatus[6].id || status == webStatus[7].id || status == webStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="" >取消提交</a>',
                    ].join('');
                }else if(status == webStatus[7].id){
                    return [
                        '<a class="publish" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >发布</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[8].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >紧急下架</a>',
                    ].join('');
                }

            }else if(role === "县级"){
                if(status == webStatus[1].id){
                    return [
                        '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                        '<a  class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[8].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >紧急下架</a>',
                    ].join('');
                }

            }else if(role === "市级"){
                if(status == webStatus[3].id){
                    return [
                        '<a class="pass "  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#775637;">通过</a>',
                        '<a class="fail"  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#D60000;">不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[8].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >紧急下架</a>',
                    ].join('');
                }

            }else if(role === "省级"){
                if(status == webStatus[5].id){
                    return [
                        '<a class="pass "  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#775637;">通过</a>',
                        '<a class="fail"  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#D60000;">不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[8].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >紧急下架</a>',
                    ].join('');
                }
            }
        }

        function getPassStatus(role,webStatus) {
            if(role == "县级"){
                return webStatus[3].id
            }else if(role == "市级"){
                return webStatus[5].id
            }else if(role == "省级"){
                return webStatus[7].id
            }
        }

        function getFailStatus(role,webStatus) {
            if(role == "县级"){
                return webStatus[2].id
            }else if(role == "市级"){
                return webStatus[4].id
            }else if(role == "省级"){
                return webStatus[6].id
            }
        }


        return {
            getRoleTable:getRoleTable,
            getRoleOperate:getRoleOperate,
            getPassStatus: getPassStatus,
            getFailStatus: getFailStatus,
        }
    })
})();