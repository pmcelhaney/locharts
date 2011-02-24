
$(function () {
	var chartWidth = 600;
	var chartHeight = 400;
	var margin = 10;
	var r = Raphael("raphael-bar-chart-container", chartWidth, chartHeight);
	var width = 135;
	
	var drawBar = function (index, height) {
		var x = margin + (width + margin) * index;
		r.rect(x, chartHeight - margin, width, 1).attr({stroke: "none", fill: "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"})
		.hover( function () { this.animate( {"fill": "270-rgb(101,3,96)-rgb(211,6,201)"} ) }, function () { this.animate( {"fill": "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"} ) })
		.animate({height: height, y: chartHeight - margin - height}, 1500, "elastic")
	}
	
	drawBar(0, 50);
	setTimeout( function () { drawBar(1, 150) }, 100);
	setTimeout( function () { drawBar(2, 250) }, 200);
	setTimeout( function () { drawBar(3, 350) }, 300);
});

/* gRaphaël */
$(function () {
	var r = Raphael("graphael-bar-chart-container", 600, 400);
 	r.g.barchart(10, 10, 580, 380, [[10,20,30,40]]);
	axis = r.g.axis(85,380,420,0,3,3,0,["Today",  "Yesterday", "Tomorrow", "Future"], "+", 3);
	
});