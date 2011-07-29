ALLY.define('money', ['date-extensions'], function (DateExt) {
	
	/**
	 * @param numberAsStringWithDecimal {string}
	 * @return {string}
	 */
	var insertCommas = function (numberAsStringWithDecimal) {
		var parts = numberAsStringWithDecimal.split("."),
			left = parts[0],
			right = parts[1],
			result = "",
			leftLength = left.length,
			i = 0;
		
		while(i < leftLength){ 
			if ((leftLength - i) % 3 === 0 && i != 0) { 
				result += ","; 
			} 
			result += left.charAt(i);
			
			i += 1;
		}
	
	
		return result + '.' + right;	
	};
	
	/**
	 * @param principal {number}
	 * @param apr {number}
	 * @param startDate {Date object}
	 * @param endDate {Date object}
	 * @return {number}
	 */
	var applyInterestBetweenStartAndEndDates =	function(principal, apr, startDate, endDate) {
		return principal * Math.pow(1 + ((apr/100)/365), DateExt.daysBetweenDates(startDate, endDate));
	};

	
	//params argument is an object with lots of possible properties...should make
	//this consistent with the above function	
	/**
	 * @param principal {number}
	 * @param params {object}
	 * @return {Money object}
	 */
	var calculateInterest = function (principal, params) { 
		params.startDate = params.startDate || new Date();
		
		if (params.years) {
			params.endDate = DateExt.addYears(params.startDate, params.years);
		}
				
		var newBalance = applyInterestBetweenStartAndEndDates(principal, params.apr, params.startDate, params.endDate);
	
		return Money(newBalance - principal); 
	};
	
	
	/**
	 * @param amount {number}
	 * @return {object}
	 */
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