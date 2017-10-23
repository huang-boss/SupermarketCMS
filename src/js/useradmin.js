/* 
* @Author: Marte
* @Date:   2017-10-17 17:36:07
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-20 05:22:40
*/



//可编辑表格查询部分
$('.item_mid table').on('click','td',function(){
    // console.log(this);
    $(this).attr('contenteditable',true);

});
// $('.item_mid table').find('td').blur(function(event) {
//     $ajax({
//         url:'localhost:88/insert',
//         data{data:$(this).val()},
//         type:'post',
//         success:function(res){
//             console.log(res)
//         }
//     })
// });
//可编辑表格增删查改部分
$('.item_cont table').on('click','td',function(){
 
    $(this).attr('contenteditable',true);

});
//指引提示部分
$('#showUp').popover({'animation':true});


$('.add_user_h').click(function(){
    var datas = {
        username:$('#idUsername').val(),
        password:$('#idpass').val(),
        size:$('#idSize').val(),
        name:$('#idName').val(),
        mail:$('#idMail').val(),
        Clerk:$('#idClerk').val()
    };

    $.ajax({
        url:'http://localhost:88/addUser',
        data:datas,
        type:'post',
        success:function(res){

            $('.modal-footer .tips').text(res.message).css({'color':'red','font-size':'18px'}).fadeOut(2000);

            //写入页面
           $.ajax({
            url:'http://localhost:88/useAll',
            type:'GET',
            success:function(res){

 
                 //写入页面结构
                    var html = $.map(res.data,function(item,idx){

                        return `<tr id="${item._id}">
                          <td>${item.username}</td>
                          <td>${item.password}</td>
                          <td>${item.size}</td>
                          <td>${item.name}</td>
                          <td>${item.mail}</td>
                          <td>${item.Clerk}</td>
                          <td><input type="checkbox" /></td>
                        </tr>`
                    }).join('');


                    $('#userAlls').html(html);

                    $('.c_ho').modal('toggle');

            }
        });

        }
    })

});

  //添加入写入页面的路由
 

 $.ajax({
    url:'http://localhost:88/useAll',
    type:'GET',
    success:function(res){


         //写入页面结构
            var html = $.map(res.data,function(item,idx){

                return `<tr id="${item._id}">
                  <td>${item.username}</td>
                  <td>${item.password}</td>
                  <td>${item.size}</td>
                  <td>${item.name}</td>
                  <td>${item.mail}</td>
                  <td>${item.Clerk}</td>
                  <td><input type="checkbox" /></td>
                </tr>`
            }).join('');


            $('#userAlls').html(html);

    }
});


//模糊查询
$('#htCheck button').click(function(){
    var ins = $('#htCheck input').val();

    
   var ssa = $("#userAlls td:contains('皮皮虾')").focus();
  
    var ss = $('#userAlls td').filter(':contains('+ins+');');
    // console.log(ss);
});







$('#deleteUser').click(function(){


    var $res = $('.user_list_c').find(':checkbox').filter(':checked');

    // var deleteNum= [];
    $.each($res,function(idx,item){

        del = $(item).parents('tr').attr('id');
        // deleteNum.push(is);

        var ss = setTimeout(function(){
            $(item).parents('tr').remove();
        },200);

    });

    // console.log(deleteNum);
    var datas = {id:del};

    $.ajax({
        url:'http://localhost:88/deleteUser',
        data:datas,
        type:'get',
        success:function(res){
            // console.log(res);
        }
    });

})


