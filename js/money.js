define(function () {
	var insertCommas = function (numberAsStringWithDecimal) {
		var parts = numberAsStringWithDecimal.split(".");
		var left = parts[0];
		var right = parts[1];
		var result = "";
		
		for (i=0; i<left.length; i++) { 
			if ((left.length - i) % 3 === 0 && i != 0) { 
				result += ","; 
			} 
			result += left[i];  
		}
	
		return result + '.' + right;	
	};
	
	var MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

	var daysBetweenDates = function (startDate, endDate) {		
		return Math.round( ( endDate - startDate ) / MILLISECONDS_IN_A_DAY ); 
	};

	var applyInterestBetweenStartAndEndDates =  function(principal, apr, startDate, endDate) {
		return principal * Math.pow(1 + ((apr/100)/365), daysBetweenDates(startDate, endDate));
	};
	
	var copyDate = function (date) {
		return new Date( date.getTime() );
	};
	
	var addYears = function (date, years) {
		return copyDate(date).setFullYear( date.getFullYear() + years );
	};
	
	var calculateInterest = function (principal, params) { 
		params.startDate = params.startDate || new Date();
		
		if (params.years) {
			params.endDate = addYears(params.startDate, params.years);
		}
		 		
		var newBalance = applyInterestBetweenStartAndEndDates(principal, params.apr, params.startDate, params.endDate);
	
		return Money(newBalance - principal); 
	};
	
	var Money = function (amount) {
		return {
			toString: function () { 
				return "$" + insertCommas(amount.toFixed(2)); 
			},
			valueOf: function () { 
				return parseFloat(amount.toFixed(2), 10); 
			},
			calculateInterest: function (params) {
				return calculateInterest(amount, params);
			}
		};
	};
	
	return Money;
});