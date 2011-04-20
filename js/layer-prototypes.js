var layers = {

'bars' : function () {
	var grid = this.grid;
	var paper = this.paper;
	$(this.data).each(function (i) {
		var width = grid.columnWidth() * 0.8;
		var left = grid.xForIndex(i) - (width / 2); 
		var top = grid.yForValue(this);
		var height = grid.yForBottomEdge() - top;
		paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', '#eee');
		
	});
},

'x-axis labels': function () {
	var paper = this.paper;
	var grid = this.grid;
	$(this.data).each(function (i) {
		paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, grid.xLabelForIndex(i));
	});
},

'values above points': function () {
	var paper = this.paper;
	var grid = this.grid;
	$(this.data).each(function (i) {
		paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this);
	});
},

'x-axis label separators': function () {
	var paper = this.paper;
	var grid = this.grid;
	var i;
	for (i = 1; i < this.data.length; i++) {
		var x = 0.5 + Math.round(grid.xForIndex(i) - grid.columnWidth() / 2);
		var y = 0.5 + grid.yForBottomEdge();
		paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+10) );
	}
},

'y-axis markers': function (numberOfRows) {
	var paper = this.paper;
	var grid = this.grid;
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



'borders': function () {
	this.paper.rect(this.grid.xForLeftEdge() + 0.5, this.grid.yForTopEdge() + 0.5, this.grid.width(), this.grid.height());
}

};

$(function() {
	
	
	var chart = {
		data: [100, 142, 40, 151],
		paper: Raphael(50, 100, 600, 400)
	};
	
	
	chart.grid = Grid({
		width: 600, 
		height: 400, 
		yMinValue: 0, 
		yMaxValue: Math.max.apply(null, chart.data) * 1.1, 
		xLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
		marginBottom: 20,
		marginTop: 10,
		marginLeft: 100,
		marginRight: 10
	});


	var layersToInclude = ["borders", ["y-axis markers", 4], "x-axis label separators",  "x-axis labels",  "bars", "values above points"];
	
	$.each(layersToInclude, function () {
		var arguments = [];
		if ($.isArray(this)) {
			layer = layers[this[0]];
			arguments.push(this.slice(1));
		} else {
			layer = layers[this];
		}
	
		layer.apply(chart, arguments);
	});
	
});
