/* 
* @Author: 陈文贵
* @Date:   2017-10-19 14:38:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 22:34:12
*/

jQuery(function($){
    //.获取元素checkout #good_code #good_nums .btn_order .btn_checkout .order_list
    var $checkout = $('.checkout');
    var $good_code = $checkout.find('#good_code');
    var $good_nums = $checkout.find('#good_nums');
    var $btn_order = $checkout.find('.btn_order');
    var $btn_checkout = $checkout.find('.btn_checkout');
    var $order_list = $checkout.find('.order_list');

    //封装生成表格体函数
    window.trArr = [];
    function createOrderTb(arr){
        var htmlStr = arr.map(function(item){
             return ` <tr>
                       <td>${item.name}</td>
                       <td class="huang_qian">${item.price}<span>元</span></td>
                       <td class="huang_num">${item.num}</td>
                       <td class="huang_qian">${item.total}<span>元</span></td>
                       <td class="text-center"><button class="btn btn-info">修改</button></td>
                       <td class="text-center"><button class="btn btn-danger">删除</button></td>
                   </tr>`;
        }).join('');
        $order_list.html(htmlStr);
    }
    //二次封装弹窗函数
    function showTip($this,mes){
        var id = 'modal'+Date.now();
        $this.attr({'data-toggle':'modal','data-target':'#'+id});
        showModal({id:id,size:'sm',text:mes,title:'商品收银结算',noBtn:true});
    }
    //确定按钮点击：执行相应逻辑/生成表格体
    $btn_order.click(function(){
        var code = $good_code.val().trim();
        var num = $good_nums.val().trim()*1;
        var $this = $(this);
        if(code==''){
            showTip($this,'商品条形码不能为空！');     
            return;
        }
        if(num<=0||num==''){showTip($this,'商品数量需1个以上！');return;}
        var obj = '';
        for(var i = 0;i<test_gooods.length;i++){
            if(code==test_gooods[i].code){
                obj = test_gooods[i];
                break;
            }
        }
        if(obj===''){showTip($this,'没有该商品条形码对应的商品！');return;}
        trArr.unshift({name:obj.name,price:obj.sale,num,total:obj.sale*num});
        createOrderTb(trArr);
        $good_code.val('');
        $good_nums.val(1);
    });
     /*修改表格行*/
    $order_list.on('click','.btn-info',function(){
        var $this = $(this);
        $this.removeClass('btn-info').addClass('btn-warning').text('保存').closest('tr').find('.huang_qian>span').hide().end().find('.huang_num').attr('contenteditable',true).focus();
    });
    $order_list.on('click','.btn-warning',function(){
        var $this = $(this);
        var idx = $this.closest('tr').index();
        $this.removeClass('btn-warning').addClass('btn-info').text('修改').closest('tr').find('.huang_qian>span').show().end().find('.huang_num').attr('contenteditable',false);
        for(var i = 0;i<trArr.length;i++){
            if(i==idx){
                trArr[i].num = $($('.huang_num')[idx]).text();
                trArr[i].total = trArr[i].num*1*trArr[i].price;
                createOrderTb(trArr)
                break;
            }
        }
    });
    /*删除表格行*/
    $order_list.on('click','.btn-danger',function(){
       var idx = $(this).closest('tr').index();
       for(var i = 0;i<trArr.length;i++){
            if(i==idx){
                trArr.splice(i,1);
                createOrderTb(trArr)
                break;
            }
        }
    });
    //生成订单条
    $btn_checkout.click(function(){
        if(trArr.length==0){
            showTip($(this),'订单列表为空！');
            return;
        }
        var order_total = 0;
        $('.code_box').css({width:window.innerWidth,height:window.innerHeight}).show().find('.order_code').html('').qrcode({width: 200,height: 200,text: "http://10.3.131.18:88/html/checkout.html"});
        window.orderText = "皮皮虾 超市收银系统  \n*************************************\n"+trArr.map(function(item){
            order_total += item.total*1;
            return `商品名称：${item.name}\n单品金额：${item.price} 元 \n商品数量：${item.num} 个\n总金额：${item.total} 元\n*************************************\n`;
        }).join('')+"\n*************************************\n订单总金额结算："+order_total+"元\n*************************************\n买单时间："+new Date().toLocaleString().replace(/上午|下午/,'')+"\n*************************************\n";
        var socket = null;
        if(!socket){
                //建立连接
            socket = io('http://localhost:4144');
        }    
        socket.emit('sendPrice',order_total);
        socket.on('printOrder',function(){
             $.post("http://10.3.131.33:81/print", {text: orderText}, function(res){
                    // console.log(res)
                    $('.order_code').html('<p style="line-height:100px;color:#58bc58;text-align:center;font-size:30px;">支付成功</p><p class="glyphicon glyphicon-ok"style="line-height: 22px;color: #58bc58;padding-left: 50px;font-size: 90px;"></p>');
                    setTimeout(function(){$('.code_box').click()},2000);
                    trArr = [];
                    $('.order_list').html('');
                });
        });
    });
});