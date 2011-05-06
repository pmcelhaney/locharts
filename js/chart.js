define(['grid', 'layers'], function (Grid, builtInLayers) {
	$.fn.chart = function (options) {
		
		var dataMax = function (data) {
			
			if (data === undefined) {
				return 0;
			}
			
			var i;
			var result = 0;
			var datum;
	
			
			for( i=0; i < data.length; i++ ) {
				datum = data[i];
				result = Math.max(result, $.isArray(datum) ? dataMax(datum) : datum);
			}

			return result;
			
		};
		
		var grid = Grid( {
			width: this.width(),
			height: this.height(),
			yMinValue: options.yMinValue,
			yMaxValue: options.yMaxValue || Math.round( dataMax(options.data) * 1.1 ),
			marginTop: options.marginTop,
			marginRight: options.marginRight,
			marginBottom: options.marginBottom,
			marginLeft: options.marginLeft,
			xLabels: options.xLabels,
			colors: options.colors,
			fillColors: options.fillColors,
			gradients: options.gradients,
			edgeToEdge: options.edgeToEdge,
			xValues: options.xValues
		});
		
	
		
	
		
		var layerContext = { 
			grid: grid,
			data: ( options.data && $.isArray( options.data[0] ) ) ? options.data : [options.data],
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