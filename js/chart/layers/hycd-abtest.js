/*global define*/
define(['./x-axis-labels', './bars', './values-as-html'], function (xAxisLabels, bars, valuesAsHtml) {

    return function () {
        xAxisLabels.call(this, ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo']);
        bars.call(this, 0.8, 1, 8);
        valuesAsHtml.call(this, function (value, index) { return '<span class="apy-label"><span class="number">' + value.toFixed(2) + '</span><span class="percent">%</span> <span class="apy">APY</span></span>'; });
    };

});