'use strict';

/**
 * Checks if an object is an object literal.
 * http://stackoverflow.com/a/1482209
 * @param  {Object}  _obj Object to test
 * @return {Boolean}      True if _obj is an object literl; false otherwise
 */
exports.isObj = function(_obj) {
	var _test = _obj;
	return (typeof _obj !== 'object' || _obj === null ?
		false :
		(
			(function() {
				while (!false) {
					if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
						break;
					}
				}
				return Object.getPrototypeOf(_obj) === _test;
			})()
		)
	);
};

exports.isString = function(_str) {
	return (typeof _str  == 'string' || _str instanceof String);
};