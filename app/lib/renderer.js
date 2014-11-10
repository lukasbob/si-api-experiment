'use strict';

require('node-jsx').install();
var React = require('react');
var commentBox = React.createFactory(require('./../src/js/components/DataList.jsx'));

module.exports = function *(next) {

	var markup = React.renderToString(commentBox({ data: this.siapi }));

	yield this.render("generic", {
		markup: markup,
		data: JSON.stringify(this.siapi, null, " ")
	});
};