define(['./colors'], function (COLORS) {

	return function (labels) {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data[0]).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, labels[i]).attr('fill', COLORS.TEXT);
			
		});
	};
	
});