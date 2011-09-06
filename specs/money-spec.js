define(["js/money"], function(Money) {
	describe("Money", function () {
		/* 
			.calculateInterest({apr, years})
			.plusInterest({apr, years})

			Optional parameters: daysInAYear, daysInALeapYear, startDate, endDate, months.
		*/

		
		it("should know how to print $5.00", function () {
			expect(Money(5).toString()).toEqual("$5.00");
		});
	
		it("should know how to print $4.99", function () {
			expect(Money(4.99).toString()).toEqual("$4.99");
		});

		it("should know how to print $1,234,567.89", function () {
			expect(Money(1234567.89).toString()).toEqual("$1,234,567.89");
		});

		it("should know its value (valueOf)", function () {
			expect(Money(1234567.89).valueOf()).toEqual(1234567.89);
		});
	
		describe("should correctly calculate interest between a start and end date", function () {

			var tenThousandBucks;
		
			beforeEach( function () {
				tenThousandBucks = Money(10000);
			});
				
			it("between a start and end date", function () {
				expect( tenThousandBucks.calculateInterest( {startDate: new Date(2010, 0, 1), apr: 3.05, endDate: new Date(2011, 0, 1) } ).valueOf() ).toEqual(309.69);
			});
	
			it("over one year", function () {
				expect( tenThousandBucks.calculateInterest( {startDate: new Date(2010, 0, 1), apr: 3.05, years: 1 } ).valueOf() ).toEqual(309.69);
			});
		
		
		});
	
	}); 
	
});