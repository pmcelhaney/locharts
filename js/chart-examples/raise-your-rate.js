/*global define*/

define(['../chart/chart', '../math/money', '../chart/layers/raise-your-rate-chart'], function (chart, money, raiseYourRateChart) {

    $(function () {

        $('#differential-area').chart({
            edgeToEdge: true,
            data: $('#raise-your-rate-data').find('tbody tr').map(function () {  return [$(this).find('td').map(function () { return money(parseInt($(this).text(), 10)); }).toArray()]; }).toArray(),
            layers: [ raiseYourRateChart],
            meta: {
                labels: ['Deposit'].concat($('#raise-your-rate-data').find('tbody tr').find('th:eq(0)').map(function () { return $(this).text(); }).toArray()),
                colors: ["rgb(82,182,101)", "rgb(233,126,0)", "rgb(31,124,166)", "rgb(127,127,127)"],
                'colors-fill': ["rgba(50,150,180,0)", "rgba(136,211,245)", "rgba(44,18,98)"]
            },
            xValues: $('#raise-your-rate-data').find('thead th:gt(1)').map(function () { return new Date($(this).text()).getTime(); }).toArray(),
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 50,
            yMinValue: 49000,
            yMaxValue: 56000
        });

    });
});
