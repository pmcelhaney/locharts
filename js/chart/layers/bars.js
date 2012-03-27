define(function() {

	return function(widthFactor, opacity, radius) {
		opacity = opacity || 0.8;
		radius = radius || 0;
		var grid = this.grid;
		var paper = this.paper;
		var eventTarget = this.eventTarget;
		var bars = [];

		var width = Math.round(grid.columnWidth() * (widthFactor || 0.5));
		var fillColor = grid.gradient(0);
		var yForBottomEdge = grid.yForBottomEdge();

		$(this.data[0]).each(function(i) {
			var datum = this;

			var left = Math.floor(grid.xForIndex(i) - width / 2);
			var top = grid.yForValue(datum);
			var height = yForBottomEdge - top;
			var x = left + 0.5;
			var y = top + 0.5;
			var bar = paper.rect(x, y, width, height + radius, radius).attr({
				'fill': fillColor,
				'opacity': opacity,
				'stroke-width': 0,
				'clip-rect': [x, y, width, height]
			});
			bars[i] = bar;
		});

		var barReceivesFocus = function(event, i, datum) {
				bars[i].attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
			};

		var barLosesFocus = function(event, i, datum) {
				bars[i].attr('fill', grid.gradient(0)).attr('fill-opacity', opacity);
			};

		$(eventTarget).bind('focusDatum.chart', barReceivesFocus);
		$(eventTarget).bind('blurDatum.chart', barLosesFocus);


		return {
			name: 'bars',
			remove: function() {
				$(eventTarget).unbind('focusDatum.chart', barReceivesFocus);
				$(eventTarget).unbind('blurDatum.chart', barLosesFocus);
			}
		};
	};


});
