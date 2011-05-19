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
        
        _create: function () {
            this.draw();
        },
        draw: function(newData) {

            if (this.paper) { this.remove(); }
            
            if (newData) this.options.data = newData;
            
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
    		
    		this.paper = Raphael(this.element[0], this.element.width(), this.element.height());

    		var layerContext = { 
    			grid: grid,
    			data: data,
    			paper: this.paper,
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

    			layerFn = layer.draw || ( $.isFunction(layer) ? layer : builtInLayers[layer] );

    			if ( $.isFunction(layerFn) ) {			
    				layerFn.apply(layerContext, args);	
    			}
    		});
          
          
        },
 
        _setOption: function(key, value) {
          // Use the _setOption method to respond to changes to options
          $.Widget.prototype._setOption.apply(this,arguments);
        },
        
        remove: function () {
            this.paper.remove();
            delete this.paper;
        },
        
        destroy: function() {
          //delete this.paper;
          $.Widget.prototype.destroy.call(this);
        }
      });
	
});