define(['raphael', 'grid', 'layers'], function (raphael, Grid, builtInLayers) {
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
		
		var layerContext = { 
			grid: grid,
			paper: raphael.paper(this[0])
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