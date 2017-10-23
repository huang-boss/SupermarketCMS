jQuery(function($){
    var $masket_list = $('.table-striped .masket_list');
    var $pageBox = $('.item_bottom_right');
    var $masket_admin=$('list-group');
    var $addition=$('#addition');
    var $trr=$('.trr');
    var $table = $($masket_admin.find('.table')[0]) ;
    var test_gooods = [];
    var pages_goods = [];
      //查询 
    $("#search_btn").click(function(){
        var key = $("#Ktext").val();
        var tbody = $(".masket_body");
        var $keywords = $(".no_id"); console.log(keywords)
        for(var i = 0; i < $keywords.length;i++) 
        { 
        if($keywords[i].innerHTML*1== key*1){ 
          trr.eq(i).show(); 
        }else{ 
          trr.eq(i).hide(); 
        } 
        } 
    }); 
    //   //返回 
    $("#back_btn").click(function(){ 
        var sbody = $(".table-striped"); 
        $(".trr",sbody).show(); 
        $("#Ktext").val("");
    }); 
    //删除
    $('body').on('click','.delete',function(){
        $(this).parents('tr').remove();
        // var datas = {id:id};
        // $.ajax({
        //     url:'http://localhost:88/deleteUser',
        //     data:datas,
        //     type:'get',
        //     success:function(res){
        //         console.log(res);
        //     }
        // });
    });
     $('.modal').modal({
          show:false,
        });
        $('#btnSave').click(function(){
          
          $.post(comObj.baseUrl+'/addsale',{
            marketid:$('#marketid').val(),
            markettype:$('#markettype').val(),
            marketname:$('#marketname').val(),
            marketnum:$('#marketnum').val(),
            marketprice:$('#marketprice').val(),
            conductor:$('#conductor').val()},
              function(response){
                $('#xsMenu').click();
              }
          );
          $('.modal').modal('toggle');
        })

        $('#addition').click(function(){
          $('.modal').modal('toggle');
        })
        $('#xsMenu').click(function(){
            $('#datagrid').html('');
            $('#datagrid').datagrid({
                url: comObj.baseUrl + '/getsale',
                cols: 'marketid,markettype,marketname,marketnum,marketprice',
                edit: true,
                delete: true
            })
        });
        
});


$.fn.datagrid = function(opts){
  var _defalt = {
    url: '',
    cols: null,
    method: 'get',
    edit: false,
    delete: false
  }
  var options = $.extend(_defalt, opts);

  var container = $(this);

  var init = function(){
    var $table = $('<table class="table table-bordered"></table>')
    var $thead = $('<thead></thead>');
    var $tbody = $('<tbody></tbody>');
      $.get(options.url, function(response){
        if(response.status && response.data[0]){
          var cols = options.cols ? options.cols.split(',') : options.cols;

          //生成 thead
          var $tr = $('<tr></tr>');
          for(var key in response.data[0]){
            if(!cols || (cols && cols.indexOf(key) > -1)){
              $("<th></th>").text(key).appendTo($tr);
            }
          }
          if(options.edit){
            $('<th></th>').text('编辑').appendTo($tr);
          }
          if(options.delete){
            $('<th></th>').text('删除').appendTo($tr);
          }       
          $tr.appendTo($thead);
          $thead.appendTo($table);

          //生成 tbody
          for(var i = 0; i < response.data.length; i++){
            $tr = $('<tr></tr>');
            for(var key in response.data[i]){
              if(!cols || (cols && cols.indexOf(key) > -1)){
                $('<td class="text-center"></td>').text(response.data[i][key]).appendTo($tr);
              }
            }
            if(options.edit){
                $('<td class="text-center" ><button class="btn btn-info" flag="edit" objectid="' + response.data[i]['_id'] + '">编辑</button></td>').appendTo($tr);
            }
            if(options.delete){
              $('<td class="text-center"><button class="delete btn btn-danger" objectid="' + response.data[i]['_id'] + '">删除</button></td>').appendTo($tr);
            }         
            $tr.appendTo($tbody);
          }
          $tbody.appendTo($table);

          $table.appendTo(container);
        }
      })
  }
  init();
}
