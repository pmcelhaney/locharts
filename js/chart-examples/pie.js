/*global define*/

define(['../chart/chart', '../math/money'], function (chart, money) {

    $(function () {

        $('#pie-chart').chart({
            data: $('#wealth-by-type tbody tr td').map(function () { return money(parseInt($(this).text(), 10)); }).toArray(),
            layers: ["borders", "pie", ["pie labels", $('#wealth-by-type thead tr th').map(function () { return $(this).text(); }).toArray()]],
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            colors: ["rgb(82,182,101)", "rgb(233,126,0)", "rgb(31,124,166)", "rgb(127,127,127)"],
            fillColors: ["rgb(50,150,180)", "rgba(136,211,245)", "rgba(44,18,98)", "rgba(90,18,98)"]
        });

    });
});
