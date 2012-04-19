/*global define*/

define(function () {
    var filter = function (val) { return val; };
    $.fn.scrape  =  function (template, customFilter) {
        filter = customFilter || filter;
        return scrape(this, template);
    };

    var scrape = function (context, template) {
        if (typeof template === "string") {
            return filter( $(context).find(template).text() );
        }

        if ($.isArray(template)) {
            return scrapeArray(context, template);
        }

        if (typeof template === 'object') {
            return scrapeMap(context, template);
        }
    };

    var scrapeArray = function (context, template) {
        if (template.length === 1) {
            return scrapeValues(context, template[0]);
        } else {
            var result = [];
            $(context).find(template[0]).map(function () {
                if (typeof template[1] === 'string') {
                    result.push(scrape(this, template.slice(1)));
                } else {
                    result.push(scrape(this, template[1] ));
                }
            });
            return result;
        }
    };

    var scrapeMap = function(context, template) {
        var obj = {};
        $.each(template, function(key, selector) { obj[key] = scrape(context, selector);  });
        return obj;
    };

    var scrapeValues = function (context, selector) {
        return $(context).find(selector).map( function () { return filter ( $(this).text() ); } ).toArray();
    };
});