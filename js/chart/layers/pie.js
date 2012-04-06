define(function () {

	return function () {
		var grid = this.grid,
			paper = this.paper,
			data = this.data[0],
			dataLength = data.length,
			dataTotal = 0,
			i = 0,
			rad = Math.PI / 180,
			centerX = grid.xMidpoint(),
			centerY = grid.yMidpoint(),
			radius = 100, //need to make this configurable
			angle = 0; //probably wouldn't hurt to make this configurable, too

		var colors = this.meta['colors-fill'] || this.meta['colors'] || [];
        var wrapAround = function ( a, i ) {
            return a[ i % a.length ];
        };


		//get the sum of all the values so that we can determine percents later
		while (i < dataLength) {
			dataTotal += data[i].valueOf();
			i += 1;
		}

		$(data).each(function (seriesIndex, series) {
			var value = this.valueOf(),
				valuePercent = value/dataTotal,
				angleIncrease = valuePercent * 360,
				coords = grid.sectorCoordinates(centerX, centerY, radius, angle, angle + angleIncrease),
				path = paper.path(["M", centerX, centerY, "L", coords['x1'], coords['y1'], "A", radius, radius, 0, +(angleIncrease > 180), 0, coords['x2'], coords['y2'], "z"])
							.attr({ fill: wrapAround(colors, seriesIndex), 'stroke-width': 2, opacity: 0.4 });
				angle += angleIncrease;
		});
	};
});