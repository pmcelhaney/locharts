define(function () {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();

		var colors =  this.spec['colors-fill'] || this.spec['colors'] || [];

		var roundRobin = function ( a, i ) {
				return a[ i % a.length ];
			};

		$(data).each(function (seriesIndex, series) {

			var path = ['M', ( grid.xForIndex(0) + 0.5 ), ' ', grid.yForBottomEdge()];
			$(series).each(function (i) {
				path.push('L', (grid.xForIndex(i) + 0.5), ' ', (grid.yForValue(this) + 0.5));
			});
			path.push('L',	( grid.xForIndex(series.length - 1) + 0.5 ),  ' ',	grid.yForBottomEdge());
			path.push('Z');
			paper.path(path.join('')).attr({ fill: roundRobin(colors, data.length - 1 - seriesIndex),'stroke-width': 0  });
		});

	};

});