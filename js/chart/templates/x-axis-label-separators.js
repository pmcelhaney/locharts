define(['./colors'], function (COLORS) {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		for (i = 1; i < this.data[0].length; i++) {
			var x = 0.5 + Math.round(grid.xForIndex(i) - grid.columnWidth() / 2);
			var y = 0.5 + grid.yForBottomEdge();
			paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+5) ).attr('stroke', COLORS.LINES);
		}
	};

});