/*global define*/

define(['../chart/chart', '../math/money'], function (chart, money) {

    $(function () {

        $('#pie-chart').chart({
            data: $('#wealth-by-type tbody tr td').map(function () { return money(parseInt($(this).text(), 10)); }).toArray(),
            layers: ["borders", "pie", "pie labels"],
            spec: {
                labels: $('#wealth-by-type thead tr th').map(function () { return $(this).text(); }).toArray(),
                colors: ["rgb(82,182,101)", "rgb(233,126,0)", "rgb(31,124,166)", "rgb(127,127,127)"]
            },
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20
        });

    });
});
