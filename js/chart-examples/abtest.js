/*global define*/

define(['../chart/chart', '../chart/layers/x-axis-labels', '../chart/layers/bars', '../chart/layers/values-as-html'], function (chart, xAxisLabels, bars, valuesAsHtml) {

    $(function () {

        $('#abtest-rates').chart({
            data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
            layers: [
                [xAxisLabels, ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo']],
                [bars, 0.8, 1, 8],
                [valuesAsHtml, function (value, index) { return '<span class="apy-label"><span class="number">' + value.toFixed(2) + '</span><span class="percent">%</span> <span class="apy">APY</span></span>'; }]
            ],
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 10,
            gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/ , '270-rgb(101,3,96)-rgb(211,6,201)' /*purple*/ ]

        });
    });
});