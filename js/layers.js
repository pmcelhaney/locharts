define(function () {


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
			var width = grid.columnWidth() * 0.5;
			var left = grid.xForIndex(i) - (width / 2); 
			var top = grid.yForValue(datum);
			var height = grid.yForBottomEdge() - top;
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', grid.gradient(0)).attr('stroke-width', 0).attr('fill-opacity', 0.8);
			bar.hover(function () {
				$(paper).trigger('focusDatum.chart', [i, datum]);
				this.attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
			}, function () {
				this.attr('fill', grid.gradient(0)).attr('fill-opacity', 0.8);
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
			paper.path('M' + x + ' ' + y + 'L' + x + ' ' + (y+5) ).attr('stroke', COLORS.LINES);
		}
	},

	'y-axis markers': function (numberOfRows, formatter) {
		var formatter = formatter || (function (n) { return n; }); 
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
				paper.text(grid.xForLeftEdge() + 0.5 - 5, grid.yForValue(i), formatter(i)).attr('text-anchor', 'end').attr('font', FONT).attr('fill', COLORS.TEXT);
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
		var width = 130;
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
			return grid.xLabelForIndex(i) + '\nEarnings: ' + data[i].toString();
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
	},
	
	'lines': function () {
		var paper = this.paper;
		var grid = this.grid;
		var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForValue(this.data[0]);
		$(this.data).each(function (i) {
			if (i > 0) {
				path += 'L' + ( grid.xForIndex(i) + 0.5 ) + ' ' + ( grid.yForValue(this) + 0.5 );
			}
		});
		paper.path(path);
	},
	
	'dots': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.circle(grid.xForIndex(i), grid.yForValue(this), 5).attr('stroke-width', 0).attr('fill', grid.fillColor(0));
		});
	},
	
	'area': function () {
		var paper = this.paper;
		var grid = this.grid;

		var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForValue(0);
		$(this.data).each(function (i) {
			path += 'L' + (grid.xForIndex(i) + 0.5) + ' ' + (grid.yForValue(this) + 0.5);
		});
		path += 'L' + ( grid.xForIndex(this.data.length - 1) + 0.5 ) + ' ' + grid.yForValue(0);
		path += 'Z';
		paper.path(path).attr({ fill: grid.fillColor(0), stroke: grid.color(0) });
	}

};

});

