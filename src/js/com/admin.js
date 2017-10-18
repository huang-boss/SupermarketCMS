/* 
* @Author: 陈文贵
* @Date:   2017-10-18 14:21:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 14:54:25
*/
jQuery(function($){  

    /*退出登陆：返回登陆页面*/
    $('.head_right').click(function(){location.href='admin.html'});


    /*页面加载生成底部*/
    //userId发请求到后台获取相应信息
    //....
    var userObj = userObj||{img:'person_img.jpg',name:'黄老板',type:'管理员'};
    var date = new Date();
    var loginTime = date.getHours() + ':' + date.getMinutes();
    var loginDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    var flHtmlstr = `<img src="../images/${userObj.img}" height="40" width="40"  class="img-circle change_img" alt="" /><span class="person_name">${userObj.name}</span><span class="person_type">${userObj.type}</span>登陆时间：<span class="login_time">${loginTime}</span><span class="login_date">${loginDate}</span>`;
    $('<div class="footer_left pull-left"></div>').html(flHtmlstr).prependTo($('#footer'));

    /*底部修改头像*/
    // $('.change_img').click(function(){console.log('change img')});

    /*按登陆用户权限：显示对应功能模块*/


    /*tab模块切换*/
    $('.main_left').on('click','.tab_item',function(){
        var $this = $(this);
        var idx = $this.addClass('focus').index();
        $('.tab_item').removeClass('focus');
        $($($this.closest('.tab_item_list')[0]).find('.tab_item').get(idx)).addClass('focus');
        $('.item_cont').hide();
        $($($('.item_cont_list').get($($this.closest('.admin_item')[0]).index())).find('.item_cont').get(idx)).show();
    });
});
