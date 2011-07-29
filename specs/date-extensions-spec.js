define(["date-extensions"], function(DateExt) {
	describe("Date-extensions-spec", function () {

		it("should format a date dd/mm/yyyy", function () {
			expect(DateExt.formatDate(new Date(2011, 6, 29))).toEqual("07/29/2011");
		});
		
		it("should copy a date and return the same date", function () {
			var date = new Date();
			expect(DateExt.copyDate(date)).toEqual(date);
		});
		
		it("should add years to a date parameter", function () {
			expect(DateExt.addYears(new Date(2011, 6, 29), 4)).toEqual(new Date(2015, 6, 29));
		});
		
		
		it("should calculate days between dates", function () {
			expect(DateExt.daysBetweenDates(new Date(2011, 6, 20), new Date(2011, 6, 30))).toEqual(10);
		});
	}); 
	
});