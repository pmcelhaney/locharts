define(function () {
	
	return function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var eventTarget = this.eventTarget;
		var container = this.container;
		var containerOffsetLeft = $(container).offset().left;
	
		var oldColumnIndex;
		
		$('<div></div>')
			.css({'background-color': '#fff', opacity: 0, width: grid.width(), height: grid.height(), position: 'absolute', top: grid.yForTopEdge(), left: grid.xForLeftEdge()})
			.mousemove(function (e) { 
				newColumnIndex = grid.indexForX(e.pageX - containerOffsetLeft);
				if (newColumnIndex !== oldColumnIndex) {
				 
				 	$(eventTarget).trigger('focusDatum.chart', [newColumnIndex, data[data.length-1][newColumnIndex]]);
			
					if (oldColumnIndex !== undefined) {
					   $(eventTarget).trigger('blurDatum.chart', [oldColumnIndex, data[data.length-1][oldColumnIndex]]);
					}
				
					oldColumnIndex = newColumnIndex;
				}
			})
			.appendTo(container);
	

		var lastX = 0;
		$(data[data.length-1]).each(function (i, datum) {
			var thisX = grid.xForIndex(i);
			var leftX = thisX - (thisX - lastX) / 2;
			var rightX = thisX + ( ( grid.xForIndex(i+1) || grid.outerWidth() ) - thisX ) / 2; 
			lastX = thisX;
		});
		

	};

});