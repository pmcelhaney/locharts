/*global define*/

define(['../chart/chart', '../math/money'], function (chart, money) {

    $(function () {

        var labels = ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'];

        $('#differential-area').chart({
            edgeToEdge: true,
            data: $('#raise-your-rate-data').find('tbody tr').map(function () {  return [$(this).find('td').map(function () { return money(parseInt($(this).text(), 10)); }).toArray()]; }).toArray(),
            layers: [
                "borders",
                ["y-axis markers", money],
                "x-axis label separators",
                ["x-axis labels", ['Deposit'].concat($('#raise-your-rate-data').find('tbody tr').find('th:eq(0)').map(function () { return $(this).text(); }).toArray())],
                "differential area",
                "lines",
                "dots",
                ["bubble", function (i) { return (i === 3 ? 'Final balance' : ['1st', '2nd', '3rd'][i] + ' rate: ' + $('#raise-your-rate-data tbody tr').eq(i).find('th:eq(1)').text() + '%') + '<br>Date: ' + $('#raise-your-rate-data thead th').eq(i + 2).text(); }],
                "column hotspots"
            ],
            xValues: $('#raise-your-rate-data').find('thead th:gt(1)').map(function () { return new Date($(this).text()).getTime(); }).toArray(),
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 50,
            colors: ["rgb(82,182,101)", "rgb(233,126,0)", "rgb(31,124,166)", "rgb(127,127,127)"],
            fillColors: ["rgba(50,150,180,0)", "rgba(136,211,245)", "rgba(44,18,98)"],
            yMinValue: 49000,
            yMaxValue: 56000
        });

    });
});
