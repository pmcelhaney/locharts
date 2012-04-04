/*global define*/

define(['../chart/chart', '../chart/layers/bar-chart', '../math/money'], function (chart, barChart, money) {

    $(function () {

        var labels = ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'];

        $('#bar').chart({
            data: [money(50598.54), money(51204.25), money(51817.21), money(52437.51)],
            layers: [ [ barChart, labels ] ],
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 10,
            gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/ , '270-rgb(101,3,96)-rgb(211,6,201)' /*purple*/ ]

        });
    });
});
