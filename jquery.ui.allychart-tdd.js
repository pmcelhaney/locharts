/*
 * Ally Bar Chart Widget
 * 
 * This version will be developed using test-driven-development.
 */



(function( $, Rapahel, undefined ) {
	
	$.widget("ui.allyChart", {		
		_create: function() {			
		},
		points: function () {
			var yAxisSize = this.options.yAxis.max - this.options.yAxis.min;
			var yScale = this.options.height / yAxisSize;
			var y = this.options.height - (yScale * (this.options.values[0] - this.options.yAxis.min));
			return [y];
		}
	});
	
}(jQuery, Raphael));
