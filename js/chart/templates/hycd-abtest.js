/*global define*/
define(['./x-axis-labels', './bars', './values-as-html'], function (xAxisLabels, bars, valuesAsHtml) {

    return function (labels) {
        this.print(xAxisLabels);
        this.print(bars);
        this.print(valuesAsHtml, [ function (value, index) { return '<span class="apy-label"><span class="number">' + value.toFixed(2) + '</span><span class="percent">%</span> <span class="apy">APY</span></span>'; } ]);
    };

});