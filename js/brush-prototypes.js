bars = function (paper, grid, data) {
	$(data).each(function (i) {
		var width = grid.columnWidth();
		var left = grid.xForIndex(i) - (width / 2); 
		var top = grid.yForValue(this);
		var height = grid.yForBottomEdge() - top;
		paper.rect(left, top, width, height);
		
		console.log(grid.xForIndex(i), left, top, width, height);
	});
};

$(function() {
	var paper = Raphael(50, 50, 600, 400);
	var grid = Grid({width: 600, height: 400, yMinValue: 0, yMaxValue: 100, xLabels: ['Jan', 'Feb', 'Ma']});

	
	bars(paper, grid, [10, 20, 40]);
	
	
});
