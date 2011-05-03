define(['grid', 'layers'], function (Grid, builtInLayers) {
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
			xLabels: options.xLabels,
			colors: options.colors,
			fillColors: options.fillColors,
			gradients: options.gradients
		});
		
		var layerContext = { 
			grid: grid,
			data: options.data,
			paper: Raphael(this[0], this.width(), this.height())
		};
		
		$.each(options.layers, function () {
			var layer = this;
			var layerFunc;
			var args = [];
			
			if ( $.isArray(this) ) {
				layer = this[0];
				args = this.slice(1);	
			} 
			
			layerFn = $.isFunction(layer) ? layer : builtInLayers[layer];
			
			if ( $.isFunction(layerFn) ) {			
				layerFn.apply(layerContext, args);	
			}
		});	
	};     
});