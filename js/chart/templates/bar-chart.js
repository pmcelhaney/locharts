/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './x-axis-labels', './x-axis-label-separators', './values-above-points', './bubble', './hotspots-column'], function (money, bars, background, yAxisMarkers, xAxisLabels, xAxisLabelSeparators, valuesAbovePoints, bubble, columnHotspots) {

    return function () {
        console.log(this.spec.marginLeft, this.spec.marginRight);
        this.print(background);
        this.print(yAxisMarkers);
        this.print(xAxisLabelSeparators);
        this.print(xAxisLabels);
        this.print(bars);
        this.print(valuesAbovePoints);
        this.print(bubble);
        this.print(columnHotspots);

    };

});