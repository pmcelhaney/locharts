define(function () {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$(data).each(function (seriesIndex, series) {
			var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForValue(series[0]);
			$(series).each(function (i) {
				if (i > 0) {
					path += 'L' + ( grid.xForIndex(i) + 0.5 ) + ' ' + ( grid.yForValue(this) + 0.5 );
				}
			});
			paper.path(path).attr('stroke', grid.color(data.length - 1 - seriesIndex));
		});
		
	};

});