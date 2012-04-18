define(function () {

	var roundRobin = function ( a, i ) {
		return a[ i % a.length ];
	};

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var colors = this.spec.colors;

		var dot = paper.circle(-100, -100, Math.min(5, Math.max(3, grid.columnWidth() / 2))).attr('stroke-width', 0).attr('fill', roundRobin(colors,1));

		var moveDot = function (event, index, datum) {
			dot.attr({cx: grid.xForIndex(index), cy: grid.yForValue(data[0][index]) });
		};

		var target = $(this.spec.eventTarget);

		target.bind('focusDatum.chart.hoverDots', moveDot);

		return {
			remove: function () {
				target.unbind('focusDatum.chart.hoverDots');
			}

		};


	};

});