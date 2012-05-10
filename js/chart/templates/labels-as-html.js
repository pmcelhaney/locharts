define(function () {
	return function (formatter, customLabels) {
		var paper = this.paper;
		var grid = this.grid;
        var element = this.element;
        var makeHtml = formatter || function (label, index) { return '<span>' + label + '</span>'; };
        var labels = customLabels || this.spec.labels;
		$(this.data[0]).each(function (i) {
            var css = {position: 'absolute', width: grid.columnWidth(), height: grid.yForBottomEdge() - grid.yForValue(this), left: grid.xForIndex(i) - grid.columnWidth() / 2, bottom: grid.outerHeight() - grid.yForBottomEdge()};
            var div = $('<div></div>').css(css);
			$(element).children('div').append(div);
            $(div).append(makeHtml(labels[i], i));
		});
	};

});
