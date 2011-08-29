define(function () {

	return function () {
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
	};
	
});