jQuery.fn.pageSlide = function() {
	return this.each(function() {
		var $btn_pop = $(".btn_pop"),
			$dimmed = $(".dimmed"),
			$videoWrap = $("#pr_Popup"),
			$showitem = $(".showitem"),
			$btn_pop = $(".btn_pop"),
			$btn_popClose = $(".btn_popClose"),
			$videobody = $videoWrap.find("> .inner > .popBody");

			
			
			
		var $this = $(this),
			$viewport = $("> .viewport", $this),
			$ul = $("> ul", $viewport),
			$items = $("> li", $ul),
			$items_on,// = $("> li.on", $ul),
			items_on_num,
			$items_ele = $("> li > a", $ul),
			$slideTxt =$(".slideTxt > p"),
			$btn = $(".btn", $this),
			$prev = $(".btn_prev", $this),
			$next = $(".btn_next", $this),
			pagenow = $(".pagenow"),
			pageend = $(".pageend"),
			totalPage = $(".totalPage"),
			pagenowNum = $(".pagenowNum"),
			width = $viewport.width(),
			len = $items.length,
			index = 0,
			on_page = 0,
			item_w = 0,
			page1_item = 0,
			max = 0,
			maxPage,
			nodata = $(".nodata").length;
		
		function setPosition(i) {
			var num = width * i;
			$viewport.filter(":not(:animated)").animate({
				"scrollLeft" : num
			},{
				queue:false,
				duration:1000,
				easing : "easeOutCirc",
				complete : function(){
					if(i < 1) {
						$prev.addClass("disabled").removeAttr("href");
					} else {
						$prev.removeClass("disabled").attr("href", "#");
					}
					
					if(i == (max-1)) {
						$next.addClass("disabled").removeAttr("href");
					} else {
						$next.removeClass("disabled").attr("href", "#");
					}
					if (i == maxPage){
						pageend.text(i * 6 + 6 - nodata);
					}else{
						pageend.text(i * 6 +6);	
					}
						pagenow.text(i * 6 +1);
				}
			});

			
		}
		function setPosition2(i) {
			var num = width * i;
			$viewport.stop().scrollLeft(num);			
			if(i < 1) {
				$prev.addClass("disabled").removeAttr("href");
			} else {
				$prev.removeClass("disabled").attr("href", "#");
			}
			
			if(i == (max-1)) {
				$next.addClass("disabled").removeAttr("href");
			} else {
				$next.removeClass("disabled").attr("href", "#");
			}
			if (i == maxPage)
			{
				pageend.text(i * 6 + 6 - nodata);
			}else{
				pageend.text(i * 6 +6);	
			}
			pagenow.text(i * 6 +1);
			
		}

		function initSlide(t_index) {			
			index = 0;
			item_w = $items.eq(0).width();
			$ul.css("width", item_w * len);
			max = (item_w * len) / width;
			page1_item = width / item_w;
			maxPage = Math.ceil(len/page1_item)-1;
			console.log(maxPage);
			if($items_on.length == 0) {
				on_page = 0;
			} else {
				on_page = Math.floor((items_on_num -1) / page1_item);
			}
			index = on_page;			
			totalPage.text(len -  nodata);
			setPosition2(index);
			$items_ele.eq(t_index).trigger("click");
			
		}
		function prev() {
			$btn.addClass("disabled").removeAttr("href");
			index--;
			if(index == -1) {
				index = 0;
			}
			setPosition(index);

		}
		function next() {
			$btn.addClass("disabled").removeAttr("href");
			index++;
			if(index == max) {
				index = max-1;
			}
			setPosition(index);
		}
		$items_ele.on("click", function(){
			var iii = $items_ele.index($(this)[0]);
			pagenowNum.text(iii + 1);			
			$items_ele.each(function(){
				$(this).parent().removeClass("on");
				$(this).find("> img").attr("src", $(this).find("> img").attr("src").replace("_on.jpg", "_off.jpg"));
				$(this).find("> .dim").show();
			});			
			$(this).parent().addClass("on");
			$(this).find(">img").attr("src", $(this).find(">img").attr("src").replace("_off.jpg", "_on.jpg"));
			$(this).find("> .dim").hide();
			var longTitle = $(this).data("longtitle");
			$slideTxt.text(longTitle);
			
			if($(this).data("type") == "image") {				
				var imgurl = $(this).find("> img").attr("src").replace("_on.jpg" , ".jpg");
				$showitem.html("<img src=\"" + imgurl + "\" alt=\"\" />");


			} else if($(this).data("type") == "video") {				
				var mUrl = $(this).data("movie");
				$showitem.html('<iframe width="100%" height="100%" src="http://www.youtube.com/embed/'+ mUrl +'?rel=0" frameborder="0" allowfullscreen></iframe>')

			} else {
			}
			return false;
		});
		$items_ele.on("mouseenter",function(){

			$(this).find(">img").attr("src", $(this).find(">img").attr("src").replace("_off.jpg", "_on.jpg"));
			$(this).find("> .dim").hide();
			return false;
			
		});
		$items_ele.on("mouseleave",function(){
			if ($(this).parent().hasClass("on") == false)
			{
				$(this).find(">img").attr("src", $(this).find(">img").attr("src").replace("_on.jpg", "_off.jpg"));
				$(this).find("> .dim").show();
			}
			return false;
			
		});
		$prev.on("click", function() {
			if($(this).hasClass("disabled") == false) {
				prev();
			}
			return false;
		});
		$next.on("click", function() {
			if($(this).hasClass("disabled") == false) {
				next();
			}
			return false;
		});
		$btn.addClass("disabled").removeAttr("href");
		$this.bind("movePage", function(event, param) {
			setPosition2(param);
		});
	
		$btn_pop.on("mouseenter", function() {
			$(this).addClass("on");
			return false;
		});
		$btn_pop.on("mouseleave", function() {
			$(this).removeClass("on");			
			return false;
		});
		$btn_pop.bind('click',function(){
			var sIndex = $btn_pop.index($(this)[0]);			
			$items.eq(sIndex).addClass("on");
			$items_on = $("> li.on", $ul);
			$items_on.find("> a > img").attr("src", $(this).find("> img").attr("src").replace("_off.jpg", "_on.jpg"));
			items_on_num = $items_on.index() +1;
			$dimmed.css('display','block');
			$videoWrap.css('display','block');			

			initSlide(sIndex);			
			return false;
		});

		$btn_popClose.bind('click',function(){
			$dimmed.css('display','none');
			$videoWrap.css('display','none');
			return false;
		});

	});
	
}
jQuery(".slidepagerWrap").pageSlide();



