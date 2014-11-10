/**
 * A koa middleware to forward requests to the Siteimprove API
 */

'use strict';

const request = require('koa-request');
const config = require('./../config');

var makeApiRequest = function *(path) {
	var apiUrl = config.root + path;
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
	var response = yield makeApiRequest(path);
	this.body = JSON.parse(response.body);
	yield next;
};
