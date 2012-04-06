/*global define*/

define(['../chart/chart', '../chart/layers/hycd-abtest'], function (chart,  hycdAbtest) {

    $(function () {

        $('#abtest-rates').chart({
            data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
            layers: [ hycdAbtest ],
            meta: { labels: ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo'] },
            marginBottom: 20,
            marginTop: 40,
            marginLeft: 100,
            marginRight: 10,
            gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/ , '270-rgb(101,3,96)-rgb(211,6,201)' /*purple*/ ]

        });
    });
});