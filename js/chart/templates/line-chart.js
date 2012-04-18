/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './lines', './dots'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, lines, dots) {

    return function (labels) {

        this.print(background);
        this.print(yAxisMarkers, money);
        this.print(xAxisLabelSeparators);
        this.print(xAxisLabels);
        this.print(lines);
        this.print(dots);

    };

});