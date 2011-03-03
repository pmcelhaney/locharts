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
	};
	
	
	
	$.widget("ui.allyChart", {		
		_create: function() {	
			this.yAxis = this.options.yAxis;
			this.yAxis.start = this.options.height;
			this.yAxis.end = 0;
			$.extend(this.yAxis, Axis);
		},
		points: function () {
			var yAxis = this.yAxis;
			return $(this.options.values).map(
				function () {
					return { y: yAxis.mapValue(this) };
				}
			).toArray();
			
		}
	});
	
}(jQuery, Raphael));
