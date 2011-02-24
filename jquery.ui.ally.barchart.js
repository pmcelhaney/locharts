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
			barWidth: 135
		},
		_paper: null,
		
		_create: function() {		
			this._paper = Raphael(this.element[0].id, this.options.chartWidth, this.options.chartHeight);
		},
		
		_onMouseOver: function () {
			this.animate( {"fill": "270-rgb(101,3,96)-rgb(211,6,201)"} );			
		},
		
		_onMouseOut: function () { 
			this.animate( {"fill": "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"} ); 
		},
		
		
		
		drawBar: function (index, height) {
			var margin = this.options.margin;
			var barWidth = this.options.barWidth;
			var chartHeight = this.options.chartHeight;
			var chartWidth = this.options.chartWidth;
			this._paper.rect(margin + (barWidth + margin) * index, chartHeight - margin, barWidth, 1)
			.attr( { stroke: "none", fill: "270-rgba(55,152,199,1)-rgba(70,195,255,.5)" } )
			.hover( this._onMouseOver, this._onMouseOut)
			.animate( { height: height, y: chartHeight - margin - height }, 1500, "elastic" );
		},

		addValues: function (values) {
			var widget = this;
			var max = Math.max.apply(Math, values) * 1.2;
			
			$(values).each(function(i, val) {
				setTimeout(function () { 
					var height = widget.options.chartHeight * val/max; 
					widget.drawBar(i, height); 
					widget._paper.text(145 * i + 10, widget.options.chartHeight - height - 20, "$" + val  + ",000").attr("text-anchor", "start");
				}, i * 100);
			});
		}
		

	});
	
}(jQuery, Raphael));