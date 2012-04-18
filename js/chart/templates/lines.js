define(function () {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();

		var colors = this.spec['colors'] || [];
		var self = this;
		var roundRobin = function ( a, i ) {
				return a[ i % a.length ];
			};

		$(data).each(function (seriesIndex, series) {
			var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForValue(series[0]);
			$(series).each(function (i) {
				if (i > 0) {
					path += 'L' + ( grid.xForIndex(i) + 0.5 ) + ' ' + ( grid.yForValue(this) + 0.5 );
				}
			});
			paper.path(path).attr('stroke', colors[0]);
		});

	};

});