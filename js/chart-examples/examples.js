define(['../chart/templates/bar-chart', './bar', './line', './area', './raise-your-rate', './pie', './abtest'], function(barChart) {

    $(function () {
        $('.bar-chart').chart({
            template: barChart ,
            spec: {
                yAxisFormatter: function (x) {return x; }
            }
        });

    });

});
