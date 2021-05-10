$(".rules").click(function(){
	$(".rule").stop().fadeIn(100);
});
$(".rule").click(function(){
	$(this).stop().fadeOut(100);
});

//开始游戏按
$(".start").click(function(){
	$(this).stop().fadeOut(100);
	//启动游戏
	startGame();
});
//重新运行游戏
$(".restart").click(function(){
	$(".mask").stop().fadeOut(100);
	// $(".start").stop().fadeIn(100);
	startGame();
	
});

	
	//----------------------------
		//灰太狼和小灰灰动画图片数组
		var imgArr=[
			['./img/h0.png','./img/h1.png','./img/h2.png',
		'./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png',
		'./img/h7.png','./img/h8.png','./img/h9.png'] , 
			['./img/x0.png','./img/x1.png','./img/x2.png',
		'./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png',
		'./img/x7.png','./img/x8.png','./img/x9.png']
		];
		//可以出现的位置
		var arrPos = [
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"}
		];
		
		var wolfTimer;

	//----------------------------

//动画
function ani(){
	window.imgIndexmin=0;
	window.imgIndexmax=5;
	//图片
	var $woImg=$("<img src='' class='woImg'>");
	var isHorX=Math.round(Math.random()*3) >= 1 ? 0 : 1;
	//随机生成一个位置索引
	var imgPos=arrPos[Math.round(Math.random()*8)];
	$woImg.css({
			position : "absolute",
			cursor : "pointer",
			top : imgPos.top,
			left : imgPos.left,
		});

	//灰太狼或小灰灰出现
	wolfTimer=setInterval(function(){
		if(imgIndexmin > imgIndexmax){
			$woImg.remove();
			clearInterval(wolfTimer);
			imgIndexmin=0;
			ani();
	// 		alert("移动");
		}
		// console.log(isHorX+"  :  "+$(".woImg").attr("src"));
		$woImg.attr("src", imgArr[isHorX][imgIndexmin]);
		imgIndexmin++;
	}, 200);

	$("#container").append($woImg);
	//处理游戏逻辑
	gameRules($woImg);
}

//游戏逻辑处理
function gameRules($woImg){
	$woImg.one('click', function(event) {
		imgIndexmin=6;
		imgIndexmax=9;
		// console.log($woImg.attr("src").indexOf("h"));
		var isWath=$woImg.attr("src").indexOf("h")!=-1 ? "h" : "x" ;

		var count=Number($(".fs").html());
		//打到灰太狼加10分
		if(isWath == "h"){
			$(".fs").html(count += 10);
		}
		//打到小灰灰扣10分
		if(isWath == "x"){
			$(".fs").html(function(){
				if(count > 0){
					$(".fs").html(count -= 10);
				}
			});
		}
	});
}
//进度条动画
function aniProgress(){
	//进度条相关属性
	var speed=1;//每秒进度
	var progressWid=$(".progress").width();

	var timer=setInterval(function(){
		// console.log(progressWid);
		if(progressWid <= 0){
			clearInterval(timer);
			clearInterval(wolfTimer);
			$(".woImg").remove();
			$(".mask").stop().fadeIn(100);
		}
		progressWid-=speed;
		$(".progress").css("width", progressWid+"px");
	}, 333);
}
//开始游戏
function startGame(){
	$(".fs").text("0");
	$(".progress").css("width", 180+"px");
	//启动进度条
	aniProgress();
	//启动动画
	ani();
}