define(function () {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();

		var colors = this.spec['colors'] || [];
		var wrapAround = function ( a, i ) {
				return a[ i % a.length ];
			};

		$(data).each(function (seriesIndex, series) {
			$(series).each(function (i) {
				paper.circle(grid.xForIndex(i), grid.yForValue(this), 5).attr('stroke-width', 0).attr('fill', wrapAround(colors, data.length - 1 - seriesIndex) || grid.color(data.length - 1 - seriesIndex));
			});
		});
	};
});