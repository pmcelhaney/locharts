/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './horizontal-grid-lines', './dots'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, lines, dots) {

    return function (labels) {

        this.applyLayer(background);
        this.applyLayer(yAxisMarkers, money);
        this.applyLayer(xAxisLabelSeparators);
        this.applyLayer(xAxisLabels);
        this.applyLayer(lines);
        this.applyLayer(dots);

    };

});