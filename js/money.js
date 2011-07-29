ALLY.define('money', ['date-extensions'], function (DateExt) {
	var insertCommas = function (numberAsStringWithDecimal) {
		var parts = numberAsStringWithDecimal.split("."),
			left = parts[0],
			right = parts[1],
			result = "",
			leftLength = left.length,
			i;
		
		while(i < leftLength){
			if ((left.length - i) % 3 === 0 && i != 0) { 
				result += ","; 
			} 
			result += left.charAt(i);
			i += 1;
		}
	
	
		return result + '.' + right;	
	};
	
	var applyInterestBetweenStartAndEndDates =	function(principal, apr, startDate, endDate) {
		return principal * Math.pow(1 + ((apr/100)/365), DateExt.daysBetweenDates(startDate, endDate));
	};

	
	//seems like a bad practice to hide your parameters inside an object
	//because then your API for this function is hidden
	//why not: function(principle, startDate, endDate, apr)?
	var calculateInterest = function (principal, params) { 
		params.startDate = params.startDate || new Date();
		
		if (params.years) {
			params.endDate = DateExt.addYears(params.startDate, params.years);
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