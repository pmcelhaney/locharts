/**
 * A collection of utility functions for doing work with Dates.
 */

ALLY.define('date-extensions', [], function () {
	
	var MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
	
	return {
		
		/**
		 * @param d {Date object}
		 * @return String
		 */
		formatDate: function(d) {
			var twoDigits = function(n) {
				return n > 9 ? n : '0' + n;
			};
			if (!d.getMonth) {
				return d;
			}
			return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
		},
		
		/**
		 * @param date {Date object}
		 * @return {Date object}
		 */
		copyDate: function (date) {
			return new Date( date.getTime() );
		},
		
		/**
		 * @param date {Date Object}
		 * @param years {number}
		 * @return {Date object}
		 */
		addYears: function (date, years) {
			//console.log(date);
			//console.log(this.copyDate(date));
			//console.log(this.copyDate(date).setFullYear( date.getFullYear() + years ));
			return new Date(this.copyDate(date).setFullYear( date.getFullYear() + years ));
		},
		
		/** 
		 * @param startDate {Date object}
		 * @param endDate {Date object}
		 * @return {number}
		 */
		daysBetweenDates: function (startDate, endDate) {		
			return Math.round( ( endDate - startDate ) / MILLISECONDS_IN_A_DAY ); 
		}		
	}
});