define(function () {
var GRADIENTS = {
	BLUE: '270-rgba(55,152,199,0.1)-rgba(70,195,255,0.1)',
	PURPLE: '270-rgb(101,3,96)-rgb(211,6,201)'
};

var COLORS = {
	LINES: '#DCDFE3',
	TEXT: '#645050'
};

var FONT = 'Verdana, Sans-Serif';


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
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', GRADIENTS.BLUE).attr('stroke-width', 0).attr('fill-opacity', 0.5);
			bar.hover(function () {
				$(paper).trigger('focusDatum.chart', [i, datum]);
				this.attr('fill', GRADIENTS.PURPLE).attr('fill-opacity', 1);
			}, function () {
				this.attr('fill', GRADIENTS.BLUE).attr('fill-opacity', 0.5);
			});
		});
	},

	'x-axis labels': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, grid.xLabelForIndex(i)).attr('fill', COLORS.TEXT);
		});
	},

	'values above points': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this).attr('font', FONT).attr('fill', COLORS.TEXT);
		});
	},

	'x-axis label separators': function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		for (i = 1; i < this.data.length; i++) {
			var x = 0.5 + Math.round(grid.xForIndex(i) - grid.columnWidth() / 2);
			var y = 0.5 + grid.yForBottomEdge();
			paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+10) ).attr('stroke', COLORS.LINES);
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
				paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', COLORS.LINES).attr('z-index', 0);
				paper.text(grid.xForLeftEdge() + 0.5 - 5, grid.yForValue(i), i + '').attr('text-anchor', 'end').attr('font', FONT).attr('fill', COLORS.TEXT);
			}
		}
	},

	'borders': function () {
		var rect = this.paper.rect(this.grid.xForLeftEdge() + 0.5, this.grid.yForTopEdge() + 0.5, this.grid.width(), this.grid.height());
		rect.attr('fill', '#FBFBFB');
		rect.attr('stroke', COLORS.LINES);
		
	},
	

	'bubble': function () {
		var grid = this.grid;
		var data = this.data;
		var width = 100;
		var height = 40;
		
		var bubblePosition = function (i) {
			return {
				x: grid.xForIndex(i) - width / 2 + 0.5,
				y: grid.yForValue(data[i]) - height - 20.5
			};
		};
		
		var textPosition = function (i) {
			return {
				x: grid.xForIndex(i) - width / 2 + 10.5,
				y: grid.yForValue(data[i]) - height
			};
		};
		
		var textContent = function (i) {
			return data[i].valueOf() + " widgets\nsold this month.";
		};
		
		var bubble = this.paper.rect(bubblePosition(0).x, bubblePosition(0).y, width, height, 5)
			.attr('fill', '#fff')
			.attr('stroke', COLORS.LINES)
			.attr('stroke-width', 2);
		var text = this.paper.text(textPosition(0).x, textPosition(0).y, textContent(0)).attr("text-anchor", "start");
		
	
		
		$(this.paper).bind('focusDatum.chart', function (event, index, datum) {
			text.animate( textPosition(index), 200, "<", function () {
				this.attr('text', textContent(index));
			});
			bubble.animate(bubblePosition(index), 200, "<");
				
			
		});
	}

};

});

