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
			angle = 0, //probably wouldn't hurt to make this configurable, too
			labels = this.spec.labels;

		var colors = this.spec['colors'] || [];
        var wrapAround = function ( a, i ) {
            return a[ i % a.length ];
        };

		while (i < dataLength) {
			dataTotal += data[i].valueOf();
			i += 1;
		}

		$(data).each(function (seriesIndex, series) {
			var value = this.valueOf(),
				valuePercent = value/dataTotal,
				angleIncrease = valuePercent * 360,
				textAngle = angle + (angleIncrease/2),
				txt = paper.text(centerX + (radius + 55) * Math.cos(-textAngle * rad), centerY + (radius + 25) * Math.sin(-textAngle * rad), labels[seriesIndex]).attr({ fill: wrapAround(colors, seriesIndex), stroke:0, 'font-size': '12px'  });
				angle += angleIncrease;
		});
	};

});