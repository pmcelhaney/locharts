define(['grid'], function (Grid) {
	$.fn.chart = function (options) {
		var grid = Grid( {
			width: this.width(),
			height: this.height()
		});
		
		options.layers[0].apply({grid: grid});	
	};
});