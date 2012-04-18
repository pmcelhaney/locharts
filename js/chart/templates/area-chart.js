/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './area', './dots'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, area, dots) {

    return function (labels) {

        this.print(background);
        this.print(yAxisMarkers, money);
        this.print(xAxisLabelSeparators);
        this.print(xAxisLabels);
        this.print(area);
        this.print(dots);

    };

});

