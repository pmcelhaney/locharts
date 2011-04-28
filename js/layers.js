define(function () {
var GRADIENTS = {
	BLUE: '270-rgba(55,152,199,1)-rgba(70,195,255,.5)',
	PURPLE: '270-rgb(101,3,96)-rgb(211,6,201)'
};


return {
	'bars' : function () {
		var grid = this.grid;
		var paper = this.paper;
		$(this.data).each(function (i) {
			var datum = this;
			var width = grid.columnWidth() * 0.8;
			var left = grid.xForIndex(i) - (width / 2); 
			var top = grid.yForValue(datum);
			var height = grid.yForBottomEdge() - top;
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', GRADIENTS.BLUE).attr('stroke-width', 0);
			bar.hover(function () {
				$(paper).trigger('focusItem.chart', [i, datum]);
				this.attr('fill', GRADIENTS.PURPLE);
			}, function () {
				this.attr('fill', GRADIENTS.BLUE);
			});
		});
	},

	'x-axis labels': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, grid.xLabelForIndex(i));
		});
	},

	'values above points': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this);
		});
	},

	'x-axis label separators': function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		for (i = 1; i < this.data.length; i++) {
			var x = 0.5 + Math.round(grid.xForIndex(i) - grid.columnWidth() / 2);
			var y = 0.5 + grid.yForBottomEdge();
			paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+10) );
		}
	},

	'y-axis markers': function (numberOfRows) {
		var paper = this.paper;
		var grid = this.grid;
		var i, y;
		var roughIncrement = Math.round( ( grid.yMaxValue() - grid.yMinValue() ) / (numberOfRows || 5));
		var roundNumber = Math.pow(10, (Math.floor(Math.log(roughIncrement) / Math.LN10)) );
		var increment = roughIncrement - (roughIncrement % roundNumber);
		for (i = Math.floor(grid.yMinValue()); i < grid.yMaxValue() ; i += increment) {
			if (i > grid.yMinValue()) {
				y = 0.5 + grid.yForValue(i);
				paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', '#eee').attr('z-index', 0);
				paper.text(grid.xForLeftEdge() + 0.5 - 5, grid.yForValue(i), i + '').attr('text-anchor', 'end');
			}
		}
	},

	'borders': function () {
		this.paper.rect(this.grid.xForLeftEdge() + 0.5, this.grid.yForTopEdge() + 0.5, this.grid.width(), this.grid.height());
	},
	

	'bubble': function () {
		var bubble = this.paper.rect(this.grid.xForIndex(0) - 29.5, this.grid.yForValue(this.data[0]) - 60.5, 60, 40, 10).attr('fill', '#fff');
		var grid = this.grid;
		var data = this.data;
		$(this.paper).bind('focusItem.chart', function (event, index, datum) {
			bubble.animate({x: grid.xForIndex(index) - 29.5, y: grid.yForValue(datum) - 60.5 }, 300, "<>");
		});
	}

};

});

