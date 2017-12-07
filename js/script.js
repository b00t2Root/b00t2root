function random(min, max) {
  return Math.random() * (max - min) + min;
}

window.onload = start;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var w=$(window).width()*2;
var h=$(window).height()*2;

var lines=300;
var weight=30;
var int1;

$("#canvas").width(w/2).height(h/2);
canvas.width=w;
canvas.height=h;

var splashImg = new Image();
splashImg.src="images/1.png";
splashImg.onload = function(){
	var k=splashImg.width/splashImg.height;
	ctx.drawImage(splashImg,0,0,splashImg.width,splashImg.height,w*.075,h*.43-(w*.85/k/2),w*.85, w*.85/k);
	
	int1=setInterval('animSplash()',60);
};

function animSplash(){
	lines=lines-15;
	weight=weight-1;
	var k=splashImg.width/splashImg.height;
	ctx.drawImage(splashImg,0,0,splashImg.width,splashImg.height,w*.075,h*.43-(w*.85/k/2),w*.85, w*.85/k);
	
	for(var l=0;l<lines;l++){
		ctx.clearRect(0,parseInt(random(l,h)),w,weight);
	}
	
	if(lines<0){
		clearInterval(int1);
		start();
	}
}

$(window).resize(function(){
	var w=$(window).width()*2;
	var h=$(window).height()*2;
	var k=splashImg.width/splashImg.height;
	ctx.clearRect(0,0,w,h);
	ctx.drawImage(splashImg,0,0,splashImg.width,splashImg.height,w*.075,h*.43-(w*.85/k/2),w*.85, w*.85/k);
});

/*
function glitchImg(){
	ctx.clearRect(0,0,w,h);
	
	var k=splashImg.width/splashImg.height;
	ctx.drawImage(splashImg,0,0,splashImg.width,splashImg.height,w*.075,h*.43-(w*.85/k/2),w*.85, w*.85/k);
	
}
*/

function start(){
	
};

/*
window.onload = start;

var imageMap = $("#img-map")[0];
var imageSource = $("#img-source")[0];
var imageOverlay = $("#img-overlay")[0];
var source = $("#source")[0];
var map = $("#map")[0];
var overlay = $("#overlay")[0];
var target = $("#target")[0];
var filter, filter2, gui, tween, bumpController;
var mouseX, mouseY, mouseGlobalX, mouseGlobalY;
var targetX = $(target).offset().left;
var targetY = $(target).offset().top;
var targetContext = target.getContext("2d");
var overlayContext = overlay.getContext("2d");
var animate = true;

$("body").mousemove(function (event) {
	mouseGlobalX = event.clientX;
	mouseGlobalY = event.clientY;
});

$(target).mousemove(function (event) {
	mouseX = event.clientX - this.offsetLeft;
	mouseY = event.clientY - this.offsetTop;
});

function start() {
	Ticker.setFPS(60);
	createSource();
	createMap();
	createFilter();
	createOverlay();
	//createGUI();
	bump();
	update();
	draw();
}

function createSource() {
	var context = source.getContext("2d");
	context.drawImage(imageSource, 0, 0, imageSource.width,  imageSource.height);
}

function createMap() {
	var context = map.getContext("2d");
	context.drawImage(imageMap, 0, 0, imageMap.width,  imageMap.height);
}

function createOverlay() {
	var context = overlay.getContext("2d");
	context.drawImage(imageOverlay, 0, 0, imageOverlay.width,  imageOverlay.height);
}

function RGBToCSS(r, g, b) {
	var hex = r << 16 | g << 8 | b;
	var str = hex.toString(16);
	while (str.length < 6) str = "0" + str;
	return "#" + str.toUpperCase();
}

function createFilter() {
	filter = new filters.DisplacementMap(source, map, target, new filters.Point(), 50, 50, filters.ColorChannel.RED, filters.ColorChannel.GREEN);
	filter2 = new filters.DisplacementMap(source, map, target, new filters.Point(), 100, 100, filters.ColorChannel.GREEN, filters.ColorChannel.BLUE);
}

function createGUI() {
	gui = new dat.GUI();
	gui.add(filter, "scaleX", -100, 100).setValue(15).onChange(disableAnimation);
	gui.add(filter, "scaleY", -100, 100).setValue(15).onChange(disableAnimation);
	gui.add(filter.point, "x", 0, 400).onChange(disableAnimation);
	gui.add(filter.point, "y", 0, 400).onChange(disableAnimation);
	var cx = gui.add(filter, "channelX", {RED:filters.ColorChannel.RED, GREEN:filters.ColorChannel.GREEN, BLUE:filters.ColorChannel.BLUE, ALPHA:filters.ColorChannel.BLUE});
	var cy = gui.add(filter, "channelY", {RED:filters.ColorChannel.RED, GREEN:filters.ColorChannel.GREEN, BLUE:filters.ColorChannel.BLUE, ALPHA:filters.ColorChannel.BLUE});
	cx.onChange(function(value) {
		filter.channelX = parseInt(value);
	});
	cy.onChange(function(value) {
		filter.channelY = parseInt(value);
	});
	bumpController = gui.add(this, "animate").onFinishChange(function(value) {
		bump();
	});
}

function disableAnimation() {
	animate = false;
	bumpController.setValue(false);
}

function bump() {
	if (!animate) return;
	tween = Tween.get(filter, {loop:false})
		.to({scaleX:400, scaleY:0}, 400, Ease.expoInOut)
		.to({scaleX:0, scaleY:400}, 400, Ease.expoOut)
/*
		.to({scaleX:100, scaleY:0}, 60, Ease.expoIn)
		.to({scaleX:0, scaleY:100}, 200, Ease.expoIn)

		.wait(0)
		.call(bump);
}

function test() {
	filter.scaleX = 1;
	filter.scaleY = 1;
}

function update() {
	setHeartPosition();
	setTimeout(update, 1000/60);
};

function setHeartPosition() {
	if (!animate) return;
	var tx, ty, dx, dy;
	if (!mouseX ||
		!mouseY ||
		mouseGlobalX < targetX ||
		mouseGlobalX > targetX + target.width ||
		mouseGlobalY < targetY ||
		mouseGlobalY > targetY + target.height) {
		tx = (target.width >> 1) - (map.width >> 1);
		ty = (target.height >> 1) - (map.height >> 1);
	}
	else {
		tx = mouseX - (map.width >> 1);
		ty = mouseY - (map.height >> 1);
	}
	dx = tx - filter.point.x;
	dy = ty - filter.point.y;
	filter.point.x += dx * 0.3;
	filter.point.y += dy * 0.3;
	
	filter2.point.x += dx * 0.5;
	filter2.point.y += dy * 0.5;
}

function draw() {
	
	filter.draw();
	//filter2.draw();
	setTimeout(draw, 1000/60);
};

function drawOverlay() {
/*
	targetContext.save();
	targetContext.globalAlpha = 0.7;
	targetContext.drawImage(imageOverlay, filter.point.x, filter.point.y, imageOverlay.width, imageOverlay.height);
	targetContext.restore();

}
*/


