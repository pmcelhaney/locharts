define(function () {
	return function (options) {
		var options = options || {};
		var marginLeft = options.marginLeft || 0;
		var marginRight = options.marginRight || 0;
		var marginTop = options.marginTop || 0;
		var marginBottom = options.marginBottom || 0;
	
		var width = ( options.width || 960 ) - marginLeft - marginRight;
		var height = ( options.height || 960 ) - marginBottom - marginTop;
	
		var xLabels = options.xLabels || [];
	
		var columnCount = ( options.xLabels && options.xLabels.length ) || 1;
	
		var yMinValue = options.yMinValue || 0;
		var yMaxValue = options.yMaxValue || 1;
	
	
		return {
			xForIndex: function (i) {
				return (i+0.5) * width/(columnCount) + marginLeft;
			},
		
			yForValue: function (value) {
				return this.yForBottomEdge() - (value - yMinValue) * ( height / (yMaxValue - yMinValue) );
			},
		
			xForLeftEdge: function () {
				return marginLeft;
			},
		
			xForRightEdge: function () {
				return marginLeft + width;
			},
		
		
			yForTopEdge: function () {
				return marginTop;
			},
		
			yForBottomEdge: function () {
				return marginTop + height;
			},

			columnWidth: function () {
				return width / columnCount;
			},
		
			xLabelForIndex: function (i) {
				return options.xLabels[i] ;
			},
		
			width: function () {
				return width;
			},
		
			height: function () {
				return height;
			},
		
			yMinValue: function () {
				return yMinValue;
			},
		
			yMaxValue: function () {
				return yMaxValue;
			}
		};
	};
});



