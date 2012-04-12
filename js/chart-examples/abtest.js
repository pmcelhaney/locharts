/*global define*/

define(['../chart/chart', '../chart/layers/hycd-abtest'], function (chart,  hycdAbtest) {

    $(function () {

        $('#abtest-rates').chart({
            data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
            layers: [ hycdAbtest ],
            spec: {
                labels: ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo'],
                colors:['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/ ],
                marginBottom: 20,
                marginTop: 40,
                marginLeft: 100,
                marginRight: 10
            }

        });
    });
});

/*
    <figure
        data-chart-type="hycdAbTest"
        data-values="#abtest tbody td"
        data-labels="#abtest tbody th"
        data-colors="['270-rgb(55,152,199)-rgb(70,195,255)']">
    </figure>

    orthogonal.createChart({
        data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
        layers: [ hycdAbtest ],
        meta: {
                labels: ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo'],
                colors: ['270-rgb(55,152,199)-rgb(70,195,255)']
            },
        marginBottom: 20,
        marginTop: 40,
        marginLeft: 100,
        marginRight: 10
    }).drawAt(document.getElementById(abtest-rates));
*/