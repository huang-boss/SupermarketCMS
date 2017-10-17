
	jQuery(function($){
		// 初始化
		$(".row .col-xs-2 ul li").eq(1).addClass('active');
		$('.col-md-10 .list-group .list-group-item.active').text("欢迎进入销售管理系统");
		// tab切换
		$(".row .col-xs-2 ul li").on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			//设置内容标题
				var title = $(this).children('a').text();
				$('.col-md-10 .list-group .list-group-item.active').text("欢迎进入"+title+"系统");

			//更改内容

		})

	})