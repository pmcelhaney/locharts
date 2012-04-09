define(function() {


	return function() {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;

		var colors = this.spec['colors-fill'] || this.spec['colors'] || [];
		var wrapAround = function ( a, i ) {
			return a[ i % a.length ];
		};


		var getX = function(index) {
				return grid.xForIndex(index) + 0.5;
			};

		var getY = function(series, index) {
				if (series < 0) return grid.yForBottomEdge();
				return grid.yForValue(data[series][index]) + 0.5;
			};

		$(data).each(function(i) {

			var path = ['M', getX(i), getY(i, i)]; // left
			var j = i;

			while (j++ <= data.length) {
				path.push('L', getX(j), getY(i, j)); // interior top
			}

			while (j-- >= i) {
				path.push('L', getX(j), getY(i - 1, j)); // interior bottom
			}

			paper.path(path).attr({
				fill: wrapAround(colors, i),
				'stroke-width': 0,
				opacity: 0.4
			});
		});


	};

});
