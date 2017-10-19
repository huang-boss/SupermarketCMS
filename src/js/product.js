/* 
* @Author: Marte
* @Date:   2017-10-18 11:41:16
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 15:19:39
*/
jQuery(function($){  
    /*
        ==商品管理：查询+修改+删除==
     */
    //获取元素
    var $good_admin = $('.search_shop');
    var $table = $($good_admin.find('.table')[0]);
    var $goods_list = $('.item_mid .goods_list');
    var $pageBox = $('.item_bottom_right');   
    var $searchBox = $('.features');
    var $searchType = $searchBox.find('#choose_type');
    var $selectIcon = $searchBox.find('.select_icon');
    var $searchText =  $searchBox.find('.search_text');
    var $searchBtn =  $searchBox.find('.search_cion');
    var $addGood = $('#add_new_good');
    var $addInputs = $addGood.find('input');
    var $addSubmit = $addGood.find('.btn_submit');
    var $addClear = $addGood.find('.btn_clear');
    /*生成*/
    window.test_gooods = [];
    var pages_goods = [];
    function createTbody(arr){
        var htmlStr = arr.map(function(item){
            return ` <tr data-id="${item._id}">
                       <td contenteditable="false">${item.number}</td>
                       <td>${item.type}</td>
                       <td>${item.name}</td>
                       <td class="huang_qian">${item.cost}<span>元</span></td>
                       <td class="huang_qian">${item.sale}<span>元</span></td>
                       <td>${item.lib}</td>
                       <td class="text-center" contenteditable="false"><button class="btn btn-info">修改</button></td>
                       <td class="text-center"  contenteditable="false"><button class="btn btn-danger">删除</button></td>
                   </tr>`;
        }).join('');
        $goods_list.html(htmlStr);
    }
    function createPageBtns(len){
        if(len<8){return;}
        var btnNums = Math.ceil(len/7);
        var btnStr = '';
        for(var i = 1;i <= btnNums;i++){
            if(i == 1){btnStr += `<li class="pageFocusBtn"><a href="javascript:void(0)">${i}</a></li>`;}
            else{
                btnStr += `<li><a href="javascript:void(0)">${i}</a></li>`;
            }         
        }
        var htmlStr = `<nav aria-label="Page navigation">
                      <ul class="pagination">
                      ${btnStr}
                       </ul>
                    </nav>`;
        $pageBox.html(htmlStr);
        $pageBox.on('click','li>a',function(){
            var $li = $(this).closest('li');
            var idx = $li.addClass('pageFocusBtn').siblings('li').removeClass('pageFocusBtn').end().index();
            if(idx==0){
                var arr = pages_goods.slice(0,7);
            }else{
                var arr = pages_goods.slice(idx*7,idx*7+7);
            }
            createTbody(arr);
        });
    }
    function createAll(arr){
        var len = arr.length;
        if(len>7){
            var good_arr = arr.slice(0,7);
            createTbody(good_arr);
            createPageBtns(len);
            pages_goods = arr;
        }else{
            createTbody(arr);
            $pageBox.html('');
        }          
    }   
    //ajax请求
    function getProducts(fn){
        $.get(comObj.baseUrl+'/products',function(response){
            if(response.status == true){
                test_gooods = response.data;
                createAll(test_gooods);
                if(fn){fn();}
            } 
        });
    };
    $('.get_products').click(function(){
       if(test_gooods.length==0){
            getProducts();
       }  
    });
    
    /*查询*/
    $searchText.click(function(){$searchText.val('');});
    $searchText.keyup(function(e){if(e.keyCode==13){$searchBtn.click()}});
    $searchBtn.click(function(){
        var text = $searchText.val().trim();
        if(text==''){return;}
        if(text=='*'){createAll(test_gooods);return;}
        var type = $searchType.val();
        var search = '';
        if(type=='shop_number'){
            search = 'number';
        }else if(type == 'shop_name'){
            search = 'name';
        }else if(type == 'shop_type'){
            search = 'type';
        }
        if(search == ''){return;}
        var arr = [];
        arr = test_gooods.filter(function(item){
            if(search=='number'){
                return text*1 == item[search];
            }else{
                return item[search].indexOf(text) != -1;
            }
        });
        createAll(arr);
    });
    /*修改*/
    $table.on('click','.btn-info',function(){
        var $this = $(this);
        $this.removeClass('btn-info').addClass('btn-warning').text('保存').closest('tr').find('.huang_qian>span').hide().end().attr('contenteditable',true);
    });
    $table.on('click','.btn-warning',function(){
        var $this = $(this);
        var $tr = $this.closest('tr');
        var $tds = $tr.find('td');
        var idx = $('.pageFocusBtn').index();
        $this.removeClass('btn-warning').addClass('btn-info').text('修改').closest('tr').find('.huang_qian>span').show().end().attr('contenteditable',false);
        // ajax请求
        var newData = {'number':$tds[0].innerText,'type':$tds[1].innerText,'name':$tds[2].innerText,'cost':parseInt($tds[3].innerText),'sale':parseInt($tds[4].innerText),'lib':$tds[5].innerText*1}
        $.post(comObj.baseUrl+'/updateproduct', newData, function(response){
           if(response.status==true){
                getProducts(function(){
                    if(idx+1<=Math.ceil(test_gooods.length/7)){
                        $pageBox.find('li>a').get(idx).click();
                    }                       
                });
           }
        });
    });
    /*删除*/
    $table.on('click','.btn-danger',function(){
        var id = 'modal'+Date.now();
        var $this = $(this).attr({'data-toggle':'modal','data-target':'#'+id});
        function fun(){
            var $tr = $this.closest('tr');
            var idx = $('.pageFocusBtn').index();
            //ajax请求
            $.post(comObj.baseUrl+'/deleteproduct', {id:$tr.attr('data-id')}, function(response){
               if(response.status==true){
                    getProducts(function(){
                        if(idx+1<=Math.ceil(test_gooods.length/7)){
                            $pageBox.find('li>a').get(idx).click();
                        }                       
                    });
               }
            });
        }
        showModal({id:id,fun:fun,size:'sm',text:'确定要删除该商品吗？',title:'商品信息管理'});
    });
    /*
        ==商品管理：新增==
     */
    // $addGood $addInputs $addSubmit  $addClear
    $('#add_good_mes').click(function(){
        if(test_gooods.length==0){
            getProducts(function(){
                if(test_gooods.length == 0){
                    var addNumber = '0001';
                }else{
                    var addNumber = '000'+(test_gooods[test_gooods.length-1].number*1+1);
                }    
                $($addInputs[0]).val(addNumber);
            }); 
       }else{
            if(test_gooods.length == 0){
                var addNumber = '0001';
            }else{
                var addNumber = '000'+(test_gooods[test_gooods.length-1].number*1+1);
            }    
            $($addInputs[0]).val(addNumber);
       }  
        
    });
    $addSubmit.click(function(){
        var labels = ['商品编号','商品类型','商品名称','商品成本价','商品出售价','商品数量','商品条形码'];
        var obj_idx = ['number','type','name','cost','sale','lib','code'];
        var obj = {};
        for(var i = 0,len = $addInputs.length;i<len;i++){
            var val = $($addInputs[i]).val().trim();
            if(val==''){
                var id = 'modal'+Date.now();
                $addSubmit.attr({'data-toggle':'modal','data-target':'#'+id});
                function fun(){$addInputs.get(i).focus();}
                var label = labels[i];
                showModal({id:id,fun:fun,size:'sm',text:label+'不能为空！',title:'商品信息录入'});
                return;
            }
            obj[obj_idx[i]] = val;
        }
        test_gooods.push(obj);
        createAll(test_gooods);
        var id = 'modal'+Date.now();
        $addSubmit.attr({'data-toggle':'modal','data-target':'#'+id});
        function fun(){ $('#add_good_mes').click()}
        showModal({id:id,fun:fun,size:'sm',text:'商品信息录入成功。',title:'商品信息录入'});
        //ajax请求
        $.post(comObj.baseUrl+'/addproduct', obj, function(response){
             getProducts();
        });
    });
    $addClear.click(function(){$addInputs.val('');$('#add_good_mes').click();});
});