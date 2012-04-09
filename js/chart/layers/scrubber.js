define(function () {

	return function (start, stop) {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var eventTarget = this.eventTarget;
		var container = this.container;

		var announceChange = function () {
			$(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(selection.attr('x')), grid.indexForX(selection.attr('x')) + selection.attr('width')]);
		};


		$(this.eventTarget).bind('moveScrubIndex.chart',
			function (event, start, stop) {
				selection.attr({ x: grid.xForIndex(start) + 0.5, width: grid.xForIndex(stop) - grid.xForIndex(start) });
				leftHandle.attr('x', selection.attr('x') - 5);
				rightHandle.attr('x', selection.attr('x') + selection.attr('width') - 5);
			}
		);


		var clickArea = this.paper.rect(grid.xForLeftEdge(), grid.yForTopEdge(), grid.width(), grid.height());
		clickArea.attr('fill', '#fff');
		clickArea.attr('opacity', 0);
		clickArea.attr('stroke-width', 0);
		clickArea.click(function (e) {
			selection.attr('x', Math.min( Math.max(e.pageX - $(container).offset().left - selection.attr('width') / 2, grid.xForLeftEdge() ), grid.xForRightEdge() - selection.attr('width') ) );
			leftHandle.attr('x', selection.attr('x') - 5);
			rightHandle.attr('x', selection.attr('x') + selection.attr('width') - 5);
			announceChange();
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

			announceChange

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


			announceChange

		);


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

			announceChange

		);


	};


});