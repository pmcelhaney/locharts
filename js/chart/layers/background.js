define(['./colors'], function (COLORS) {


	return function () {
		var rect = this.paper.rect(this.grid.xForLeftEdge() + 0.5, this.grid.yForTopEdge() + 0.5, this.grid.width(), this.grid.height());
		rect.attr('fill', '#f0f0f0');
		rect.attr('stroke', COLORS.LINES);
	};

});