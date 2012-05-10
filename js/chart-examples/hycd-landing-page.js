/*global define*/

define(['../chart/chart', '../chart/templates/bar-chart-rate-comparison'], function (chart,  barChartRateComparison) {
    console.log(new Date().getTime());

    $(function () {

        var container = $('<figure></figure>').width(800).height(300).appendTo('#content');


        $(container).chart({
            data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
            template: barChartRateComparison,
            spec: {
                labels: ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo'],
                colors:['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/, '270-rgb(101,3,96)-rgb(211,6,201)' /*purple*/  ],
                opacity: 0.8,
                barRadius: 8,
                highlightIndex: 0
            }

        });
    });
});