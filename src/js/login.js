/* 
* @Author: 陈文贵
* @Date:   2017-10-19 09:03:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-20 03:10:45
*/

jQuery(function($){
    //UI
    $('.user_tr').click(function(){
        var $li = $(this).addClass('cur_focus').siblings('.user_tr');
        if($li.find('input').val()==''){
            $li.removeClass('cur_focus');
        }
    });
    $('.page').on('click','li',function(){
        if($(this).closest('.user_tr').length){
            return;
        }
        var $trs = $('.user_tr');
        for(var i = 0;i<$trs.length;i++){
            var $li = $($trs[i]);
            if($li.find('input').val()==''){
                $li.removeClass('cur_focus');
            }
        }
    });
    //登陆逻辑
    var $login_main = $('.login_main');
    var $tip_text = $login_main.find('.tip_text');
    var $user_name = $login_main.find('.user_name input');
    var $user_pas = $login_main.find('.user_pas input');
    var $user_type = $login_main.find('.user_type');
    var $login_btn = $login_main.find('.login_btn');
    $login_btn.click(function(){
        var name = $user_name.val().trim();
        var pas = $user_pas.val().trim();
        if(name==''){
            $tip_text.text('用户名不能为空！');
            $user_name.focus();
            setTimeout(function(){$user_name.closest('.user_name').addClass('cur_focus');});
            return;
        }
        if(pas==''){
            $tip_text.text('密码不能为空！');
            $user_pas.focus();
            setTimeout(function(){$user_pas.closest('.user_pas').addClass('cur_focus');});
            return;
        }
        $tip_text.text('');
        var type = $user_type.find(':checked').attr('data-type');
        $.get(comObj.baseUrl+'/login', {'username':name,'password':pas,'size':type}, function(response){
           if(response.data.length){
                location.href = 'html/admin.html?'+type;
           }else{
                 $tip_text.text('用户名,密码,用户类型不匹配！');
           }
        });
    });
});