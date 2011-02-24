/*
 * Ally Bar Chart Widget
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   raphael.js
 */



(function( $, Rapahel, undefined ) {
	
	$.widget("ui.allyBarChart", {
		options: {  
			chartWidth: 600,
			chartHeight: 400,
			margin: 10,
			width: 135
		},
		_paper: null,
		
		_create: function() {		
			this._paper = Raphael(this.element[0].id, this.options.chartWidth, this.options.chartHeight);
		},
		
		drawBar: function (index, height) {
			var margin = this.options.margin;
			var width = this.options.width;
			var paper = this._paper;
			var chartHeight = this.options.chartHeight;
			var chartWidth = this.options.chartWidth;
			var x = margin + (width + margin) * index;
			paper.rect(x, chartHeight - margin, width, 1)
			.attr({stroke: "none", fill: "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"})
			.hover( function () { this.animate( {"fill": "270-rgb(101,3,96)-rgb(211,6,201)"} ); }, function () { this.animate( {"fill": "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"} ); })
			.animate({height: height, y: chartHeight - margin - height}, 1500, "elastic");
		},

		addValues: function (values) {
			var widget = this;
			$(values).each(function(i, val) {
				setTimeout(function () { widget.drawBar(i, val); }, i * 100);
			});
		}
		

	})
	
}(jQuery, Raphael));