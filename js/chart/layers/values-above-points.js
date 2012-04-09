define(['./colors'], function (COLORS) {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data[0]).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this).attr('fill', COLORS.TEXT);
		});
	};

});
