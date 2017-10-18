/* 
* @Author: 陈文贵
* @Date:   2017-10-16 09:29:17
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 14:29:48
*/

var comObj = {};
comObj.baseUrl = 'http:localhost:88';

/*页面弹窗*/
function showModal(obj){//id size title text btns fun
    var size = obj.size||'md';
    var title = obj.title||'超市CMS弹窗';
    var text = obj.text||'确定执行该项操作吗？';
    var btns = obj.btns||['确定','取消'];
    var htmlStr = `<div class="modal fade bs-example-modal-${size}" id="${obj.id}"  tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div class="modal-dialog modal-${size}" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="close remove_modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">${title}</h4>
                        </div>
                        <div class="modal-body">
                            ${text}
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default remove_modal" data-dismiss="modal">${btns[0]}</button>
                            <button class="btn btn-primary remove_modal" data-dismiss="modal">${btns[1]}</button>
                        </div>
                    </div>
                    </div>
                </div>`;
    $('<div id="show_modal"></div>').html(htmlStr).appendTo('body').on('click','.remove_modal',function(){
        if($(this).hasClass('btn-default')){if(obj.fun){obj.fun();}}
        $('#show_modal').remove();
        $('.modal-backdrop').remove(); 
    });
}