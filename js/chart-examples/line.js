/*global define*/

define(['../chart/chart', '../chart/layers/line-chart', '../math/money'], function (chart, lineChart, money) {

    $(function () {

        $('#line').chart({
            data: [money(50598.54), money(51204.25), money(51817.21), money(52437.51)],
            layers: [ lineChart ],
            spec: {
                labels: ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
                marginBottom: 20,
                marginTop: 40,
                marginLeft: 100,
                marginRight: 10
            }
        });
    });
});
