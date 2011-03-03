/*
 * Ally Bar Chart Widget
 * 
 * This version will be developed using test-driven-development.
 */



(function( $, Rapahel, undefined ) {
	var Axis = {
		length: function () {
			if (this.labels) {
				return this.labels.length + 1;
			}	else {
				return this.max - this.min;	
			}
		},
		scale: function () {
			return (this.end - this.start) / this.length();
		},
		mapValue: function (value) {
			if (this.labels) {
				return this.scale() * (value + 1);
			} else {
				return this.start + this.scale() * (value - this.min);
			}
		}
	};
	
	
	$.widget("ui.allyChart", {		
		_create: function() {	
			this.yAxis = this.options.yAxis;
			this.yAxis.start = this.options.height;
			this.yAxis.end = 0;
			this.xAxis = this.options.xAxis;	
			this.xAxis.start = 0;
			this.xAxis.end = this.options.width;
			$.extend(this.xAxis, Axis);
			$.extend(this.yAxis, Axis);
			console.log(this.xAxis.scale());
		},
		points: function () {
			var xAxis = this.xAxis;
			var yAxis = this.yAxis;
			return $(this.options.values).map(
				function (i) {
					return { y: yAxis.mapValue(this), x: xAxis.mapValue(i) };
				}
			).toArray();
			
		}
	});
	
}(jQuery, Raphael));
