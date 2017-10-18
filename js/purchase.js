jQuery(function($){
	//按钮操作
	editRemove();
	function editRemove(){
		//生成按钮所在表格td
		$('tbody tr').each(function(i){
			$('tbody tr:not(.last)').eq(i).append('<td class="lastTd">');
		})
		//每行生成两个按钮
		$('.lastTd').append('<span>'+
				'<button class="glyphicon glyphicon-pencil btn btn-default btn-sm"></button>'+
				'<button class="glyphicon glyphicon-trash btn btn-default btn-sm"></button>'+
				'</span>')
		//保存按钮
		var save = $('<i>&nbsp;&nbsp;&nbsp;</i>'+'<button class="btn btn-success btn-sm">save</button>').appendTo($('.lastTd')).hide();
		//删除按钮
		var confirm = $('<i>&nbsp;&nbsp;&nbsp;</i>'+'<button class="btn btn-warning btn-sm">confirm</button>').appendTo($('.lastTd')).hide();

		$('.lastTd .glyphicon-pencil').on('click',function(){
			save.toggle();
			confirm.hide();
			//可编辑状态
			$(this).parents('tr').attr('contenteditable',true)
					.parents('td').attr('contenteditable',false);
		})
		//不可编辑状态
		save.on('click',function(){
			save.hide();
			$(this).parents('tr').addClass('info').attr('contenteditable',false);
		})
		
		$('.lastTd .glyphicon-trash').on('click',function(){
			confirm.toggle();
			save.hide();
		})
		//删除当前行
		confirm.on('click',function(){
			confirm.hide();
			$(this).parents('tr').remove();
		})
	}
})
