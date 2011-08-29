define(['date-extensions'], function (DateExt) {
	
	/**
	 * @param {string} numberAsStringWithDecimal 
	 * @returns {string}
	 */
	var insertCommas = function (numberAsStringWithDecimal) {
		var parts = numberAsStringWithDecimal.split(".");
		var	left = parts[0];
		var	right = parts[1];
		var result = "";
		
		for(var i = 0; i < left.length; i++){ 
			if ((left.length - i) % 3 === 0 && i != 0) { 
				result += ","; 
			} 
			result += left.charAt(i);
		}
	
	
		return result + '.' + right;	
	};
	
	/**
	 * @param {number} principal
	 * @param {object} params Params can include startDate, endDate, years, and apr
	 * @returns {number}
	 */
	var applyInterestBetweenStartAndEndDates =	function(principal, params) {
		return principal * Math.pow(1 + ((params.apr/100)/365), DateExt.daysBetweenDates(params.startDate, params.endDate));
	};

	/**
	 * @param {number} principal 
	 * @param {object} params Params can include startDate, endDate, years, and apr
	 * @returns {object} Money object
	 */
	var calculateInterest = function (principal, params) { 
		params.startDate = params.startDate || new Date();
		
		if (params.years) {
			params.endDate = DateExt.addYears(params.startDate, params.years);
		}
				
		var newBalance = applyInterestBetweenStartAndEndDates(principal, params);
	
		return Money(newBalance - principal); 
	};
	
	
	/**
	 * @param {number} amount
	 * @returns {object}
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