define(function () {


var COLORS = {
	LINES: '#DCDFE3',
	TEXT: '#645050'
};

var FONT = 'Verdana, Sans-Serif';


var formatDate = function(d) {
	var twoDigits = function(n) {
		return n > 9 ? n : '0' + n;
	}
	if (!d.getMonth) {
		return d;
	}
	return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
}



return {
	'bars' : function () {
		var grid = this.grid;
		var paper = this.paper;
		$(this.data[0]).each(function (i) {
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

	'x-axis labels': function (labels) {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data[0]).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, labels[i]).attr('fill', COLORS.TEXT);
		});
	},

	'values above points': function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data[0]).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this).attr('font', FONT).attr('fill', COLORS.TEXT);
		});
	},

	'x-axis label separators': function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		for (i = 1; i < this.data[0].length; i++) {
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
	

	'bubble': function (textContent) {
		var grid = this.grid;
		var data = this.data;
		var width = 130;
		var height = 40;
		

		var textPosition = function (i, datum) {
			return {
				left: grid.xForIndex(i) - width / 2 + 0.5,
				top: grid.yForValue(datum) - height - 20.5
			};
		};
		
		var textContent = textContent || function (i, value) {
			return i + ': ' + value.toString();
		};
		
		var text = $('<div id="text"></div>')
		    .appendTo(this.element)
		    .css({ border: '2px solid ' + grid.color(0), 'border-radius': '5px', background: '#fff', width: width-10, height: height-10, padding: '5px', position: 'absolute', top: textPosition(0, data[0][0]).top, left: textPosition(0,  data[0][0]).left, 'font-size': '10px' })
		    .html(textContent(0, data[0][0]));
	
		
		$(this.paper).bind('focusDatum.chart', function (event, index, datum) {
	        text.animate( textPosition(index, datum), 200, "linear", function () {
	             $(this).css('border-color', grid.color(index));
	             $(this).html(textContent(index, datum));
	        });
		});
	},
	
	'lines': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$(data).each(function (seriesIndex, series) {
			var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForValue(series[0]);
			$(series).each(function (i) {
				if (i > 0) {
					path += 'L' + ( grid.xForIndex(i) + 0.5 ) + ' ' + ( grid.yForValue(this) + 0.5 );
				}
			});
			paper.path(path).attr('stroke', grid.color(data.length - 1 - seriesIndex));
		});
		
	},
	
	'dots': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$(data).each(function (seriesIndex, series) {
			$(series).each(function (i) {
				paper.circle(grid.xForIndex(i), grid.yForValue(this), 5).attr('stroke-width', 0).attr('fill', grid.color(data.length - 1 - seriesIndex));
			});
		});
	},
	
	'area': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$(data).each(function (seriesIndex, series) {

			var path = 'M' + ( grid.xForIndex(0) + 0.5 ) + ' ' + grid.yForBottomEdge();
			$(series).each(function (i) {
				path += 'L' + (grid.xForIndex(i) + 0.5) + ' ' + (grid.yForValue(this) + 0.5);
			});
			path += 'L' + ( grid.xForIndex(series.length - 1) + 0.5 ) + ' ' + grid.yForBottomEdge();
			path += 'Z';
			paper.path(path).attr({ fill: grid.fillColor(seriesIndex),'stroke-width': 0  });
		});
		
		data;
	},
	
	'differential area': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;		
		var previousY = grid.yForBottomEdge();
				
		$(data).each(function (i) {
			var path = ['M',  ( grid.xForIndex(i) + 0.5 ), ( grid.yForValue(data[i][i]) + 0.5 ) ];
			path.push('L', (grid.xForIndex(data.length) + 0.5), (grid.yForValue(data[i][data.length]) + 0.5) );
			path.push('L', ( grid.xForIndex(data.length) + 0.5 ), (grid.yForValue(data[Math.max(0, i-1)][data.length]) + 0.5) );
			path.push('Z');
			paper.path(path).attr({  fill: grid.fillColor(i),  'stroke-width': 0, opacity: 0.4  });
		});
		
	},
	
	'hotspots': function () {
	    var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$([50, 35, 20]).each(function(rIndex, radius) {
		    $(data).each(function (seriesIndex, series) {
    			$(series).each(function (i, datum) {
    				paper.circle(grid.xForIndex(i), grid.yForValue(this), radius)
    				    .attr('fill', '#000')
    				    .attr('fill-opacity', 0)
    				    .attr('stroke-width', 0)
    				    .attr('zIndex', 100)
    				    .hover(function () {
    				      //  this.attr('fill-opacity', 0.5);
        				    $(paper).trigger('focusDatum.chart', [i, datum]);
        			    }, function() {
        			      //  this.attr('fill-opacity', 0.1);
        			    });
    			});
    		});
		});
	},
	
	'column hotspots': function () {
	    var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		

        var lastX = 0;
    	$(data[data.length-1]).each(function (i, datum) {
    	    var thisX = grid.xForIndex(i);
    	    var leftX = thisX - (thisX - lastX) / 2;
    	    var rightX = thisX + ( ( grid.xForIndex(i+1) || grid.outerWidth() ) - thisX ) / 2; 
    	    lastX = thisX;
    		paper.rect(leftX, grid.yForTopEdge(), (rightX - leftX), grid.height())
    		    .attr('fill', '#000')
    		    .attr('fill-opacity', 0)
    		    .attr('stroke-width', 0)
    		    .attr('zIndex', 100)
    		    .hover(function () {
                   // this.attr('fill-opacity', 0.5);
    			    $(paper).trigger('focusDatum.chart', [i, datum]);
    		    }, function() {
                   // this.attr('fill-opacity', 0.1);
    		    });
    	});

	},
	
	
	'candlestick' : function () {
		var grid = this.grid;
		var paper = this.paper;
		$(this.data[0]).each(function (i) {
			var datum = this;
			var width = grid.columnWidth() / 2;
			var left = grid.xForIndex(i) - (width / 2); 
			var top = grid.yForValue( Math.max(datum.open, datum.close) );
			var height = Math.max(1, grid.yForValue( Math.min(datum.open, datum.close) ) - top);
			
			
			var lineWidth = 1;
			var lineLeft = grid.xForIndex(i) - (lineWidth / 2); 
            var lineTop = grid.yForValue(datum.high);
            var lineHeight = grid.yForValue(datum.low) - lineTop;
			
		
			var line = paper.rect(lineLeft + 0.5, lineTop + 0.5, lineWidth, lineHeight).attr('fill', grid.gradient(0)).attr('stroke-width', 0);
            var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', datum.open > datum.close ? grid.gradient(0) : '#fff' ).attr('stroke', grid.gradient(0)).attr('stroke-width', 1);
            
			
			
			bar.hover(function () {
				$(paper).trigger('focusDatum.chart', [i, datum]);
				//this.attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
			}, function () {
				//this.attr('fill', grid.gradient(0)).attr('fill-opacity', 0.8);
			});
		});
	},
	
	
	'x-axis static dates': function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		var labels = ['Jan 2011', 'Feb 2011', 'Mar 2011', 'Apr 2011'];
		var index;
		for (i=0; i<4; i++) {
		    index = Math.round((i + 0.5) * this.data[0].length / 4);
			paper.text(grid.xForIndex(index), grid.yForBottomEdge() + 10.5, formatDate(this.data[0][index].date)).attr('text-anchor', 'middle').attr('font', FONT).attr('fill', COLORS.TEXT);
		
		}
	}
	
};



});

