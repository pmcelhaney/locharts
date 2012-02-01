define(function () {

	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		
		var dot = paper.circle(-100, -100, Math.min(5, Math.max(3, grid.columnWidth() / 2))).attr('stroke-width', 0).attr('fill', grid.color(1));
	   
		var moveDot = function (event, index, datum) {
			dot.attr({cx: grid.xForIndex(index), cy: grid.yForValue(data[0][index]) });
		};
		
		var target = $(this.eventTarget);
		
		target.bind('focusDatum.chart.hoverDots', moveDot);
		
		return {
			remove: function () {
				target.unbind('focusDatum.chart.hoverDots');
			}
			
		};

	
	};

});