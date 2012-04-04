/*global define*/
define(['./x-axis-labels', './bars', './values-as-html'], function (xAxisLabels, bars, valuesAsHtml) {

    return function () {
        this.applyLayer(xAxisLabels, [ ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo'] ]);
        this.applyLayer(bars, [ 0.8, 1, 8 ]);
        this.applyLayer(valuesAsHtml, [ function (value, index) { return '<span class="apy-label"><span class="number">' + value.toFixed(2) + '</span><span class="percent">%</span> <span class="apy">APY</span></span>'; } ]);
    };

});