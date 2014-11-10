/**
 * A koa middleware to forward requests to the Siteimprove API
 * Writes data of interest to the siapi object literal of the koa context
 */

'use strict';

const request = require('koa-request');
const config = require('./../config');

var makeApiRequest = function *(path, qs) {
	var apiUrl = config.root + path + '?' + qs;
	console.log('Requesting', apiUrl);

	var opts = {
		url: apiUrl,
		auth: config.auth,
		headers: {
			Accept: 'application/json'
		}
	};

	return yield request(opts);
};

module.exports = function *(next) {
	var path = this.params[0];
	var qs = this.querystring;

	var response = yield makeApiRequest(path, qs);

	this.siapi = {
		path: path,
		data: JSON.parse(response.body)
	};

	yield next;
};
