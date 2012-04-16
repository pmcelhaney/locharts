define(['./colors'], function (COLORS) {

    return function (formatter, position) {
        formatter = this.spec.yAxisLabelFormatter || formatter || (function (n) { return n; });
        var paper = this.paper;
        var grid = this.grid;
        var element = this.element;
        var i, y;

        var yValues = grid.yValuesForGridLines();

        for (i = 0; i < yValues.length; i++ ) {
            y = 0.5 + grid.yForValue(yValues[i]);
            //draws the horizontal background lines, should probably be optional
            paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', COLORS.LINES).attr('z-index', 0);
            var cssProperties = {
                position: 'absolute',
                top: y - 7
            };
            if (position === 'right') {
                cssProperties['right'] = 0;
                cssProperties['width'] = grid.outerWidth() - grid.xForRightEdge() - 5;
            } else {
                cssProperties['left'] = 0;
                cssProperties['width'] = grid.xForLeftEdge() - 5;
            }

            $('<span class="y-axis-label">' + formatter(yValues[i]).toString() + '</span>').css(cssProperties).appendTo(this.container);
        }

        return {
            remove: function () {
                $(element).find('.y-axis-label').remove();
            }
        };
    };
});
