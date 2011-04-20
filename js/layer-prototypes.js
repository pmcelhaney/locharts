var layers = {

'bars' : function (paper, grid, data) {
	$(data).each(function (i) {
		var width = grid.columnWidth() * 0.8;
		var left = grid.xForIndex(i) - (width / 2); 
		var top = grid.yForValue(this);
		var height = grid.yForBottomEdge() - top;
		paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', '#eee');
		
	});
},

'x-axis labels': function (paper, grid, data) {
	$(data).each(function (i) {
		paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, grid.xLabelForIndex(i));
	});
},

'values above points': function (paper, grid, data) {
	$(data).each(function (i) {
		paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this);
	});
},

'x-axis label separators': function (paper, grid, data) {
	var i;
	for (i = 1; i < data.length; i++) {
		var x = 0.5 + Math.round(grid.xForIndex(i) - grid.columnWidth() / 2);
		var y = 0.5 + grid.yForBottomEdge();
		paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+10) );
	}
},

'y-axis markers': function (paper, grid, data, numberOfRows) {
	var i, y;
	var roughIncrement = Math.round( ( grid.yMaxValue() - grid.yMinValue() ) / (numberOfRows || 5));
	var roundNumber = Math.pow(10, (Math.floor(Math.log(roughIncrement) / Math.LN10)) );
	var increment = roughIncrement - (roughIncrement % roundNumber);
	for (i = Math.floor(grid.yMinValue()); i < grid.yMaxValue() ; i += increment) {
		if (i > grid.yMinValue()) {
			y = 0.5 + grid.yForValue(i);
			paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', '#eee').attr('z-index', 0);
			paper.text(grid.xForLeftEdge() + 0.5 - 5, grid.yForValue(i), i + '').attr('text-anchor', 'end');
		}
	}
},



'borders': function (paper, grid) {
	paper.rect(grid.xForLeftEdge() + 0.5, grid.yForTopEdge() + 0.5, grid.width(), grid.height());
}

};

$(function() {
	var data = [100, 142, 40, 151];
	
	var paper = Raphael(50, 100, 600, 400);
	var grid = Grid({
		width: 600, 
		height: 400, 
		yMinValue: 0, 
		yMaxValue: Math.max.apply(null, data) * 1.1, 
		xLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
		marginBottom: 20,
		marginTop: 10,
		marginLeft: 100,
		marginRight: 10
	});

	var layersToInclude = ["borders", ["y-axis markers", 4], "x-axis label separators",  "x-axis labels",  "bars", "values above points"];
	
	
	$.each(layersToInclude, function () {
		var options = [];
		var arguments = [paper, grid, data];
		if ($.isArray(this)) {
			layer = layers[this[0]];
			arguments.push(this.slice(1));
		} else {
			layer = layers[this];
		}
	
		layer.apply(null, arguments);
	});
	

		
	
});
