define(function () {
	return function (formatter) {
		var paper = this.paper;
		var grid = this.grid;
        var element = this.element;
        var makeHtml = formatter || function (value, index) { return '<span class="chart-value">' + value + '</span>'; };
		$(this.data[0]).each(function (i) {
            var css = {position: 'absolute', width: grid.columnWidth(), height: grid.yForBottomEdge() - grid.yForValue(this), left: grid.xForIndex(i) - grid.columnWidth() / 2, bottom: grid.outerHeight() - grid.yForBottomEdge()};
            var div = $('<div class="chart-value-container"></div>').css(css);
			$(element).children('div').append(div);
            $(div).append(makeHtml(this, i));
		});
	};

});
