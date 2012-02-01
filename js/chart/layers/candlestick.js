define(function () {
	
	return  function () {
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
			
		
			var line = paper.rect(lineLeft + 0.5, lineTop + 0.5, lineWidth, lineHeight).attr({ fill: grid.gradient(0), 'stroke-width': 0 });
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr({ fill: datum.open > datum.close ? grid.gradient(0) : '#fff', stroke: grid.gradient(0), 'stroke-width': 1 });
			
			
			
			bar.hover(function () {
				$(eventTarget).trigger('focusDatum.chart', [i, datum]);
				//this.attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
			}, function () {
				//this.attr('fill', grid.gradient(0)).attr('fill-opacity', 0.8);
			});
		});
	};

});