define(['./grid', './layers'], function (Grid, builtInLayers) {
	$.fn.chart = function (options) {
		
		var data = ( options.data && $.isArray( options.data[0] ) ) ? options.data : [options.data];
		
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
		
		var grid = (options.Grid || Grid)( {
			width: this.width(),
			height: this.height(),
			yMinValue: options.yMinValue,
			yMaxValue: options.yMaxValue || Math.round( dataMax(options.data) * 1.1 ),
			marginTop: options.marginTop,
			marginRight: options.marginRight,
			marginBottom: options.marginBottom,
			marginLeft: options.marginLeft,
			colors: options.colors,
			fillColors: options.fillColors,
			gradients: options.gradients,
			edgeToEdge: options.edgeToEdge,
			xValues: options.xValues,
			columnCount: data && data[0] ? data[0].length : undefined
		});

		
	
		
	
		
		var layerContext = { 
			grid: grid,
			data: data,
			paper: Raphael(this[0], this.width(), this.height()),
			element: this[0]
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
		
		return this;
	};     
	
	
});