/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './values-above-points', './bubble', './hotspots-column'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, valuesAbovePoints, bubble, columnHotspots) {

    return function (labels) {
 // ["borders", ["y-axis markers", money], "x-axis label separators", ["x-axis labels", labels], "area", "dots"]

        this.applyLayer(background);
        this.applyLayer(yAxisMarkers);
        this.applyLayer(xAxisLabelSeparators);
        this.applyLayer(xAxisLabels);
        this.applyLayer(bars);
        this.applyLayer(valuesAbovePoints);
        this.applyLayer(bubble);
        this.applyLayer(columnHotspots);

    };

});