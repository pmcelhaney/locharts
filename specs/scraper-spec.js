/*global define, describe, it, expect */

define(['js/chart/scraper'], function (scraper) {



    describe("scraper", function () {
        it("should find a single value", function () {
            var data = $('<strong>hello <em>world</em></strong>').scrape('em');
            expect(data).toEqual('world');
        });

        it("should find an array of values", function () {
            var data = $('<table><tr><td>1</td><td>2</td><td>3</td>').scrape(['td']);
            expect(data).toEqual(['1', '2', '3']);
        });

        it("should find an array of arrays", function () {
            var html = ['<div><table>',
            '<tr><td>1<td>2<td>3',
            '<tr><td>1<td>4<td>9',
            '<tr><td>2<td>4<td>6</table></div>'].join('');

            var data = $(html).scrape(['tr', 'td']);
            expect(data).toEqual([ ['1', '2', '3'], ['1', '4', '9'], ['2', '4', '6'] ]);
        });

        it("should find an array of arrays of arrays", function () {
            var html = ['<div><table>',
            '<tr><td>1<td>2<td>3',
            '<tr><td>1<td>4<td>9',
            '<tr><td>2<td>4<td>6</table></div>'].join('');

            var data = $(html).scrape(['table', 'tr', 'td']);
            expect(data).toEqual([ [ ['1', '2', '3'], ['1', '4', '9'], ['2', '4', '6'] ] ]);
        });

        it("should find an object", function () {
            var html = ['<ul>',
            '<li class="a">1',
            '<li class="b">2',
            '<li class="c">3</ul>'].join('');

            var data = $(html).scrape({'a': '.a', 'b': '.b', 'c': '.c'});
            expect(data).toEqual({a: '1', b: '2', c: '3'});
        });

        it("should find an array of objects", function () {
            var html = ['<table>',
            '<tr><td>1<td>2<td>3',
            '<tr><td>1<td>4<td>9',
            '<tr><td>2<td>4<td>6</table>'].join('');

            var data = $(html).scrape(['tr', {a: 'td:nth-of-type(1)', b: 'td:nth-of-type(2)', c: 'td:nth-of-type(3)'}]);
            expect(data).toEqual([ {a: '1', b: '2', c: '3'}, {a: '1', b: '4', c: '9'}, {a: '2', b: '4', c: '6'} ]);
        });

        it("should filter values through a function if passed", function () {
            var data = $('<ul><li>3</li><li>6</li><li>9</li></ul>').scrape(['li'], parseFloat);
            expect(data).toEqual([3, 6, 9]);
        });

    });

});