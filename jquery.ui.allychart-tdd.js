/*
 * Ally Bar Chart Widget
 * 
 * This version will be developed using test-driven-development.
 */



(function( $, Rapahel, undefined ) {
	var Axis = {
		length: function () {
			return this.max - this.min;
		},
		scale: function () {
			return (this.end - this.start) / this.length();
		},
		mapValue: function (value) {
			return this.start + this.scale() * (value - this.min);
		}
	}
	
	
	
	$.widget("ui.allyChart", {		
		_create: function() {	
			var yAxis = this.options.yAxis;
			yAxis.start = this.options.height;
			yAxis.end = 0;
			$.extend(this.options.yAxis, Axis);
		},
		points: function () {
			var yAxis = this.options.yAxis;
			return $(this.options.values).map(
				function () {
					return yAxis.mapValue(this);
				}
			).toArray();
			
		}
	});
	
}(jQuery, Raphael));
