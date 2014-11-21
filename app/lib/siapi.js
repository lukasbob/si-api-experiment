/**
 * A koa middleware to forward requests to the Siteimprove API
 * Writes data of interest to the siapi object literal of the koa context
 */

'use strict';

const request = require('koa-request');
const config = require('./../config');
const utils = require('./utils');

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
	var raw = JSON.parse(response.body);

	this.siapi = {
		path: path,
		data: raw,
		links: searchForLinks(raw)
	};

	yield next;
};

var searchForLinks = function(obj) {
	var links = [];
	for (var k in obj) {
		if (k === '_links') {
			links.push(obj[k]);
		}

		if (utils.isObj(obj[k])) {
			searchForLinks(obj[k]);
		}
	}

	return links;
};

