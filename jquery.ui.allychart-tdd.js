/*
 * Ally Bar Chart Widget
 * 
 * This version will be developed using test-driven-development.
 */



(function( $, Rapahel, undefined ) {
	
	$.widget("ui.allyChart", {		
		_create: function() {	
			var yAxis = this.options.yAxis;
			yAxis.length = function () {
				return this.max - this.min;
			};
			yAxis.start = this.options.height;
			yAxis.end = 0;
			yAxis.scale = function () {
				return (this.end - this.start) / this.length();
			};
			yAxis.mapValue = function (value) {
				return this.start + this.scale() * (value - this.min);
			};
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
