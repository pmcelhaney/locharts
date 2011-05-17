define(['./grid', './layers'], function (Grid, builtInLayers) {
	
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
	
	
    // The jQuery.aj namespace will automatically be created if it doesn't exist
      $.widget("ally.chart", {
        // These options will be used as defaults
        options: {  },
        _create: function() {
    
            var options = this.options;
          	var data = ( options.data && $.isArray( options.data[0] ) ) ? options.data : [options.data];

    		var grid = (options.Grid || Grid)( {
    			width: this.element.width(),
    			height: this.element.height(),
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
    			paper: Raphael(this.element[0], this.element.width(), this.element.height()),
    			element: this.element[0],
    			eventTarget: options.eventTarget || this
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
          
          
        },
 
        _setOption: function(key, value) {
          // Use the _setOption method to respond to changes to options
          $.Widget.prototype._setOption.apply(this,arguments);
        },
        destroy: function() {
          // Use the destroy method to reverse everything your plugin has applied
          $.Widget.prototype.destroy.call(this);
        }
      });
	
});