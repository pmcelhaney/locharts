ALLY = window.ALLY || {};



/*
ALLY.define(name, dependencies, fn)

Defines a module and puts it in the ALLY namespace. Use this function to 
replace the boiler-plate (function () { ... }()) call that wraps JavaScript
files.

Instead of: 

ALLY.car = ( function (wheels, engine) { 

	// A whole bunch of code 


	return { ... }; 
}(ALLY.wheels, ALLY.engine));


You can write:

ALLY.define('car', ['wheels', 'engine'], function (wheels, engine)) {

	// A whole bunch of code
	

	return { ... };	
});

This format will make it possible to later use an Asynchronous Module Definitions (AMD) loader
to automatically load the required scripts on demand. And it just happens to make the boilerplate
code a little simpler and more standardized.

*/
ALLY.define = function (name, dependencies, fn) {
	
	if (window.define && define.amd && !define.amd.dontReplaceAllyDefine) {
		return define(name, dependencies, fn);
	}
	
    var i;
    var args = [];
    for (i=0; i < dependencies.length; i++) {
        args.push(ALLY[ dependencies[i].split('/').slice(-1)[0] ]); 
    }
    ALLY[name] = fn.apply(this, args);
};
