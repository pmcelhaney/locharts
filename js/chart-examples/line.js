/*global define*/

define(['../chart/chart', '../chart/layers/line-chart', '../math/money'], function (chart, lineChart, money) {

    $(function () {

        var labels = ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'];

        $('#line').chart({
            data: [money(50598.54), money(51204.25), money(51817.21), money(52437.51)],
            layers: [ [lineChart, labels] ],
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 10,
            fillColors: ['rgb(55,152,199)', 'rgb(101,3,96)']
        });
    });
});
