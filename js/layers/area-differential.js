define(function () {

	return  function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;	

		$(data).each(function (i) {
			var path = ['M',  ( grid.xForIndex(i) + 0.5 ), ( grid.yForValue(data[i][i]) + 0.5 ) ];
			path.push('L', (grid.xForIndex(data.length) + 0.5), (grid.yForValue(data[i][data.length]) + 0.5) );
			path.push('L', ( grid.xForIndex(data.length) + 0.5 ), (grid.yForValue(data[Math.max(0, i-1)][data.length]) + 0.5) );
			path.push('Z');
			paper.path(path).attr({	fill: grid.fillColor(i), 'stroke-width': 0, opacity: 0.4 });
		});

		
	};

});