ALLY.define('grid', [], function () {

	/**
	 * @param min {number}
	 * @param max {number}
	 * @param size {number}
	 * @param precision {number}
	 */
	var roundOutMinAndMax = function (min, max, size, precision) {
		var size = size || 60,
			precision = precision || 2,
	   		domain = max - min,
	   		slice = Math.round(domain / size) || Math.pow(10, -precision - 1);
	
	   return [ +(min - min % slice).toPrecision(precision), +(max + slice - ( max % slice || slice ) ).toPrecision(precision) ];

	};
	
	return function (options) {
		
		var options = options || {},
			marginLeft = options.marginLeft || 0,
			marginRight = options.marginRight || 0,
			marginTop = options.marginTop || 0,
			marginBottom = options.marginBottom || 0,
			columnCount = options.columnCount || 1,
			colors = options.colors || ['#000'],
			fillColors = options.fillColors || colors,
			gradients = options.gradients || fillColors,
			edgeToEdge = options.edgeToEdge || options.xValues,
			xValues = options.xValues,
			width = ( options.width || 960 ) - marginLeft - marginRight,
			height = ( options.height || 960 ) - marginBottom - marginTop,
			roundedMinAndMax = roundOutMinAndMax(options.yMinValue || 0, options.yMaxValue || 1),
			yMinValue = roundedMinAndMax[0],
			yMaxValue = roundedMinAndMax[1];
		
		return {
			
			/**
			 * @param i {number}
			 * @return {number}
			 */
			xForIndex: function (i) { 
				var min, max;
				if (xValues) {
					min = Math.min.apply(null, xValues);
					max = Math.max.apply(null, xValues);
					return Math.round( this.xForLeftEdge() + (xValues[i] - min) * ( width / (max - min) ) );
				} else if (edgeToEdge) {
					return Math.round( i * width/(columnCount-1) + marginLeft );
				} else {
					return Math.round( ( i+0.5 ) * width/(columnCount) + marginLeft );
				}
			},
			
			/**
			 * @param x {number}
			 * @return {number}
			 */
			indexForX: function (x) {
				var ratio =	 (x - this.xForLeftEdge()) / width;
				
				if (xValues) {
					var i = 0;
					var min = 0;
					for (i = 0; i < xValues.length; i++) {
						if ( this.xForIndex(i) == x) {
							return i;
						}
						if ( this.xForIndex(i) > x) {
							return ( i > 0 && this.xForIndex(i) - x > x - this.xForIndex(i-1) ) ? i-1 : i; 
						} 
					}
					return xValues.length - 1;
				}
				else if (edgeToEdge) {
					return Math.round( ratio * (columnCount-1) );
				} else {
					return Math.min( Math.round( ratio * (columnCount) - 0.5 ), columnCount - 1);
				}
			},
			
			/**
			 * @param value {number}
			 * @return {number}
			 */
			yForValue: function (value) {
				if (isNaN(value)) return 0;
				return Math.round( this.yForBottomEdge() - (value - yMinValue) * ( height / (yMaxValue - yMinValue) ) );
			},
			
			/** 
			 * @return {number}
			 */
			xForLeftEdge: function () {
				return marginLeft;
			},
					
			/**
			 * @return {number}
			 */
			xForRightEdge: function () {
				return marginLeft + width;
			},
		
			/** 
			 * @return {number}
			 */
			yForTopEdge: function () {
				return marginTop;
			},
		
			/** 
			 * @return {number}
			 */
			yForBottomEdge: function () {
				return marginTop + height;
			},

			/** 
			 * @return {number}
			 */
			columnWidth: function () {
				return width / columnCount;
			},
		

			/** 
			 * @return {number}
			 */
			width: function () {
				return width;
			},
			
			/** 
			 * @return {number}
			 */
			outerWidth: function () {
				return options.width;
			},
		
			/** 
			 * @return {number}
			 */
			height: function () {
				return height;
			},
			
			/** 
			 * @return {number}
			 */
			outerHeight: function () {
				return options.height;
			},
		
			/** 
			 * @return {number}
			 */
			yMinValue: function () {
				return yMinValue;
			},
		
			/** 
			 * @return {number}
			 */
			yMaxValue: function () {
				return yMaxValue;
			},
			
			/** 
			 * @return {number}
			 */
			xMinValue: function () {
				return xMinValue;
			},
		
			/** 
			 * @return {number}
			 */
			xMaxValue: function () {
				return xMaxValue;
			},
			
			/** 
			 * @param {number}
			 * @return {number}
			 */
			color: function ( i ) {
				return colors[ i % colors.length ];
			},
			
			/** 
			 * @param {number}
			 * @return {number}
			 */
			fillColor: function ( i ) {
				return fillColors[ i % fillColors.length ];
			},
			
			/** 
			 * @param {number}
			 * @return {number}
			 */
			gradient: function ( i ) {
				return gradients[ i % gradients.length ];
			}
		};
	};
});



