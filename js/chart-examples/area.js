/*global define*/

define(['../chart/chart', '../chart/templates/area-chart', '../math/money'], function (chart, areaChart, money) {

    $(function () {

        $('#area').chart({
            data: [
                [money(100), money(200), money(300), money(400)],
                [money(100), money(200), money(400), money(600)],
                [money(100), money(200), money(400), money(800)]
            ],
            template: areaChart,
            spec: {
                edgeToEdge: true,
                labels:  ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
                colors: ['rgb(55,152,199)', 'rgb(101,3,96)', 'rgb(75,125,220)'],
                marginBottom: 20,
                marginTop: 40,
                marginLeft: 100,
                marginRight: 50
            }

        });
    });
});
