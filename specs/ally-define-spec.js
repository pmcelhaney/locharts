define(['js/ally-define.js'], function () {
	
	
	describe("ALLY.define", function () {
		it("should exist", function () {
			expect(ALLY.define).toBeDefined();
		});
		
	});
	
	
	describe("a module with no dependencies", function () {
		var wasCalled = false;
		
		ALLY.define("independentModule", [], function () {
			wasCalled = true;
			return "free as a bird";
		});
		
		it("should be called", function () {
			expect(wasCalled).toBeTruthy();
		});
		
		it("should add itself to the ALLY namespace", function (){
		   expect(ALLY.independentModule).toEqual("free as a bird"); 
		});
	});
	
	
	describe("a module with dependencies", function () {
		var message = "I need noone.";
		ALLY.mom = "Mommy";
		ALLY.dad = "Daddy";
		
		ALLY.define("dependent-module", ['mom', 'dad'], function (mom, dad) {
			message = "I need " + mom + " and " + dad + ".";
		});
		
		it("should be called with its dependencies", function () {
			expect(message).toEqual("I need Mommy and Daddy.");
		});
		

	});
	
	describe("a group of modules", function () {
		ALLY.define("five", [], function() {
		   return 5; 
		});
		
		ALLY.define("three", [], function () {
			return 3;
		});
		
		ALLY.define("sum", ['five', 'three'], function (a, b) {
			return a + b;
		});
		
		ALLY.define("difference", ['five', 'three'], function (a, b) {
			return a - b;
		});
		
		it("should work together", function () {
			expect(ALLY.sum).toEqual(8);
			expect(ALLY.difference).toEqual(2);
		});
		
		
	});
	

	
	
});