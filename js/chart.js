//requiring 'grid', but passing it as 'Grid'--is that a good thing?
ALLY.define('chart', ['grid', 'layers'], function (Grid, builtInLayers) {
	
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
		options: {	},
		
		_create: function () {
			this.container = $('<div></div>').css('position', 'relative').appendTo(this.element[0])[0];
			this.draw();
		},
		draw: function(newData) {

			if (this.paper) { this.remove(); }
			
			if (newData) this.options.data = newData;
			
			var options = this.options;
			
			if ( $.isFunction(options.data) ) {
				options.data = options.data();
			}	 
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
			
			this.paper = Raphael(this.container, this.element.width(), this.element.height());
			
			var layers = this.layers = [];
			
			var layerContext = { 
				grid: grid,
				data: data,
				paper: this.paper,
				element: this.element[0],
				container: this.container,
				eventTarget: options.eventTarget || this.element[0]
			};
		

			$.each(options.layers, function () {
				var layer = this;
				var layerFunc;
				var args = [];

				if ( $.isArray(this) ) {
					layer = this[0];
					args = this.slice(1);	
				} 

				layerFn =  $.isFunction(layer) ? layer : builtInLayers[layer] ;

				if ( $.isFunction(layerFn) ) {		
					layers.push ( layerFn.apply(layerContext, args) );	
				}
			});
		  
		  
		},
 
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
	  
		  $.Widget.prototype._setOption.apply(this,arguments);
		},
		
		remove: function () {
	   
			$(this.layers).each(function () {
				 if ( this.remove ) {
					 this.remove(); 
				 }
			});
			
			this.paper.remove();
			delete this.paper;
		},

		
		destroy: function() {
		   
		  //delete this.paper;
		  $.Widget.prototype.destroy.call(this);
		}
		

	  });
	
});