define(['grid'], function (Grid) {
	$.fn.chart = function (options) {
		var grid = Grid( {
			width: this.width(),
			height: this.height(),
			yMinValue: options.yMinValue,
			yMaxValue: options.yMaxValue || Math.round(Math.max.apply(null, options.data) * 1.1),
			marginTop: options.marginTop,
			marginRight: options.marginRight,
			marginBottom: options.marginBottom,
			marginLeft: options.marginLeft,
			xLabels: options.xLabels
			
		});
		
		options.layers[0].apply({grid: grid});	
	};     
});