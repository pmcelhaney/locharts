window.Grid = function (options) {
	var options = options || {};
	var marginLeft = options.marginLeft || 0;
	var marginRight = options.marginRight || 0;
	var width = ( options.width || 960 ) - marginLeft - marginRight;
	var columnCount = ( options.xLabels && options.xLabels.length ) || 1;

	
	return {
		xForIndex: function (i) {
			return (i+1) * width/(columnCount+1) + marginLeft;
		}		
	};
};

