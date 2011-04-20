bars = function (paper, grid, data) {
	$(data).each(function (i) {
		var width = grid.columnWidth();
		var left = grid.xForIndex(i) - (width / 2); 
		var top = grid.yForValue(this);
		var height = grid.yForBottomEdge() - top;
		paper.rect(left, top, width, height).translate(0.5, 0.5).attr('fill', '#eee');
		
	});
};

xAxis = function (paper, grid, data) {
	$(data).each(function (i) {
		paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, grid.xLabelForIndex(i));
	});
};

$(function() {
	var paper = Raphael(50, 50, 600, 400);
	var grid = Grid({
		width: 600, 
		height: 400, 
		yMinValue: 0, 
		yMaxValue: 50, 
		xLabels: ['Jan', 'Feb', 'Mar'],
		marginBottom: 20,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10
	});
	var data = [10, 20, 40];
	
	bars(paper, grid, data);
	xAxis(paper, grid, data);
	
});
