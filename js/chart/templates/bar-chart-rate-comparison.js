/*global define*/
define(['./x-axis-labels', './bars', './values-as-html', './labels-as-html'], function (xAxisLabels, bars, valuesAsHtml, labelsAsHtml) {

    var formatter = function (value, index) {
        return '<span style="position: relative; width: 100%; top: -24px; display: block; margin: 0 12%; text-align: center; font-size: 16px; font-family: sans-serif">' + value.toFixed(2) + '%</span>';
    };

    var labelFormatter = function (value, index) {
        return '<div style="position: absolute; bottom: -36px; display: block; margin: 0 12%; text-align: center; font-size: 16px; width: 100%; height: 32px"><span style="text-align: center; font-family: sans-serif"">' + value + '</span></div>';
    };

    return function (labels) {
        this.print(bars);
        this.print(valuesAsHtml, [ formatter ]);
        this.print(labelsAsHtml, [ labelFormatter ]);
    };

});

/*






*/