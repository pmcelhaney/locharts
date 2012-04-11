/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './area', './dots'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, area, dots) {

    return function (labels) {

        this.applyLayer(background);
        this.applyLayer(yAxisMarkers, money);
        this.applyLayer(xAxisLabelSeparators);
        this.applyLayer(xAxisLabels);
        this.applyLayer(area);
        this.applyLayer(dots);

    };

});

