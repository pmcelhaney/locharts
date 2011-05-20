define(function () {


var COLORS = {
	LINES: '#DCDFE3',
	TEXT: '#645050'
};



var formatDate = function(d) {
	var twoDigits = function(n) {
		return n > 9 ? n : '0' + n;
	};
	if (!d.getMonth) {
		return d;
	}
	return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
};



return {
	'bars' : function (widthFactor, opacity) {
	    var opacity = opacity || 0.8;
		var grid = this.grid;
		var paper = this.paper;
		var eventTarget = this.eventTarget;
		var bars = [];
		$(this.data[0]).each(function (i) {
			var datum = this;
			var width = Math.round( grid.columnWidth() * (widthFactor || 0.5) );
			var left = Math.floor(grid.xForIndex(i) - (width / 2)); 
			var top = grid.yForValue(datum);
			var height = grid.yForBottomEdge() - top;
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr('fill', grid.gradient(0)).attr('stroke-width', 0).attr('fill-opacity', opacity);
			bar.hover(function () {
				$(eventTarget).trigger('focusDatum.chart', [i, datum]);
			//	this.attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
			}, function () {
			    $(eventTarget).trigger('blurDatum.chart', [i, datum]);
			//	this.attr('fill', grid.gradient(0)).attr('fill-opacity', opacity);
			});
			bars[i] = bar;
			
		});


        var barRecievesFocus = function (event, i, datum) {
		    bars[i].attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
		};
		
		var barLosesFocus = function (event, i, datum) {
		    bars[i].attr('fill', grid.gradient(0)).attr('fill-opacity', opacity);
		};
		
		$(eventTarget).bind('focusDatum.chart', barRecievesFocus);
		$(eventTarget).bind('blurDatum.chart', barLosesFocus);
		
        
        return {
		    name: 'bars',
		    remove: function () {
		        $(eventTarget).unbind('focusDatum.chart', barRecievesFocus);
        		$(eventTarget).unbind('blurDatum.chart', barLosesFocus);
		    }  
		};

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
			paper.text(grid.xForIndex(i), grid.yForValue(this) - 10, this).attr('fill', COLORS.TEXT);
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
				paper.text(grid.xForLeftEdge() + 0.5 - 5, grid.yForValue(i), formatter(i)).attr('text-anchor', 'end').attr('fill', COLORS.TEXT);
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
	
		
		$(this.eventTarget).bind('focusDatum.chart', function (event, index, datum) {
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
	    var eventTarget = this.eventTarget;
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
        				    $(eventTarget).trigger('focusDatum.chart', [i, datum]);
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
		var eventTarget = this.eventTarget;
		

        var lastX = 0;
    	$(data[data.length-1]).each(function (i, datum) {
    	    var thisX = grid.xForIndex(i);
    	    var leftX = thisX - (thisX - lastX) / 2;
    	    var rightX = thisX + ( ( grid.xForIndex(i+1) || grid.outerWidth() ) - thisX ) / 2; 
    	    lastX = thisX;
    		paper.rect(leftX, 0, (rightX - leftX), grid.outerHeight())
    		    .attr('fill', '#000')
    		    .attr('fill-opacity', 0)
    		    .attr('stroke-width', 0)
    		    .attr('zIndex', 100)
    		    .hover(function () {
                  // this.attr('fill-opacity', 0.5);
    			    $(eventTarget).trigger('focusDatum.chart', [i, datum]);
    		    }, function() {
    		        $(eventTarget).trigger('blurDatum.chart', [i, datum]);
                  // this.attr('fill-opacity', 0.1);
    		    });
    	});

	},
	
	
	'candlestick' : function () {
		var grid = this.grid;
		var paper = this.paper;
		var eventTarget = this.eventTarget;
		$(this.data[0]).each(function (i) {
			var datum = this;
			var width = Math.round(grid.columnWidth() / 2);
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
				$(eventTarget).trigger('focusDatum.chart', [i, datum]);
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
			paper.text(grid.xForIndex(index), grid.yForBottomEdge() + 10.5, formatDate(this.data[0][index].date)).attr('text-anchor', 'middle').attr('fill', COLORS.TEXT);
		
		}
	},
	
	'hover dots': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		
		var dot = paper.circle(-100, -100, Math.min(5, Math.max(3, grid.columnWidth() / 2))).attr('stroke-width', 0).attr('fill', grid.color(1));
       
        var moveDot = function (event, index, datum) {
	        dot.attr({cx: grid.xForIndex(index), cy: grid.yForValue(data[0][index]) });
		};
		
		$(this.eventTarget).bind('focusDatum.chart', moveDot);
		
		return {
		    remove: function () {
		        $(this.eventTarget).unbind('focusDatum.chart', moveDot);
		    }
		    
		};

	
	},
	
	'scrubber': function (start, stop) {
	    var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var eventTarget = this.eventTarget;
		
		
		var clickArea = this.paper.rect(grid.xForLeftEdge(), grid.yForTopEdge(), grid.width(), grid.height());
		clickArea.attr('fill', '#fff');
        clickArea.attr('opacity', 0);
    	clickArea.attr('stroke-width', 0);
		clickArea.click(function (e) { 
		    selection.attr('x', Math.min( Math.max(e.x - selection.attr('width') / 2, grid.xForLeftEdge() ), grid.xForRightEdge() - selection.attr('width') ) );
		    leftHandle.attr('x', selection.attr('x') - 5);
		    rightHandle.attr('x', selection.attr('x') + selection.attr('width') - 5);
		    $(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(selection.attr('x')), grid.indexForX(selection.attr('x')) + selection.attr('width')]);
		});

		var selection = this.paper.rect(grid.xForIndex(start) + 0.5, grid.yForTopEdge() + 0.5, grid.xForIndex(stop) - grid.xForIndex(start), grid.height());
    	selection.attr('fill', '#000');
        selection.attr('opacity', 0.5);
    	selection.attr('stroke-width', 0);
 
        var leftHandle = this.paper.rect(grid.xForIndex(start) + 0.5 - 5, grid.yForTopEdge() + 0.5, 10, grid.height());
        leftHandle.attr('fill', '#00f');
        leftHandle.attr('opacity', 0);
    	leftHandle.attr('stroke-width', 0);
    	leftHandle.attr('cursor', 'ew-resize');
    	
    	leftHandle.drag(
    	    
    	    function (dx, dy) {
                var boundDx = Math.max(dx, grid.xForLeftEdge() - selection.ox);
                boundDx = Math.min(boundDx, selection.oWidth - 12);
                this.attr({x: this.ox + boundDx });
                selection.attr({x: selection.ox + boundDx, width: selection.oWidth - boundDx });
            },
    	    
    	    function () {
    	        this.ox = this.attr("x");
    	        selection.ox = selection.attr("x");
    	        selection.oWidth = selection.attr("width");
    	    },
    	    
            
    	    function () {
                $(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(selection.attr('x')), grid.indexForX(selection.attr('x')) + selection.attr('width')]);
            }
    	    
    	);
    	
    	
    	var rightHandle = this.paper.rect(grid.xForIndex(start) + 0.5 + selection.attr('width') - 5, grid.yForTopEdge() + 0.5, 10, grid.height());
        rightHandle.attr('fill', '#f00');
        rightHandle.attr('opacity', 0);
    	rightHandle.attr('stroke-width', 0);
    	rightHandle.attr('cursor', 'ew-resize');
    	

        rightHandle.drag(
    	    
    	    function (dx, dy) {
    	        var boundDx = Math.max(dx, 12 - selection.oWidth );
                boundDx = Math.min(boundDx, grid.xForRightEdge() - selection.oWidth - selection.ox);
                this.attr({x: this.ox + boundDx });
                selection.attr({width: selection.oWidth + boundDx });
            },
    	    
    	    function () {
    	        this.ox = this.attr("x");
    	        selection.ox = selection.attr("x");
    	        selection.oWidth = selection.attr("width");
    	    },
    	    
            
    	    function () {
                $(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(selection.attr('x')), grid.indexForX(selection.attr('x')) + selection.attr('width')]);
            }
    	    
    	);

    	
        
        var scrubIndexMoved = function (event, start, stop) {
            selection.attr({ x: grid.xForIndex(start) + 0.5, width: grid.xForIndex(stop) - grid.xForIndex(start) });
        };
        
 
        

        
        selection.drag(
            function (dx, dy) {
                var min = grid.xForRightEdge() - this.attr('width');
                var max = grid.xForLeftEdge();
                this.attr({x: Math.max(max, Math.min( min, this.ox + dx ) ) });
                leftHandle.attr({x: Math.max(max, Math.min( min, leftHandle.ox + dx ) ) });
                rightHandle.attr({x: Math.max(max + this.attr('width'), Math.min( min + this.attr('width'), rightHandle.ox + dx ) ) });
            },
            
            function () {
                this.ox = this.attr("x");
                leftHandle.ox = leftHandle.attr("x");
                rightHandle.ox = rightHandle.attr("x");
            },
            
            function () {
                $(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(this.attr('x')), grid.indexForX(this.attr('x')) + this.attr('width')]);
            }
            
        );
 
        $(this.eventTarget).bind('moveScrubIndex.chart', scrubIndexMoved);
	}
	
};



});

