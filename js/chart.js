define(['grid'], function (Grid) {
	$.fn.chart = function (options) {
		var grid = Grid( {
			width: this.width(),
			height: this.height(),
			yMaxValue: Math.round(Math.max.apply(null, options.data) * 1.1)
		});
		
		options.layers[0].apply({grid: grid});	
	};
});