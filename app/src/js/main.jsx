'use strict';

var React = require("react");
var DataList = require("./components/DataList.jsx");

var data = JSON.parse(document.getElementById("props").innerHTML);

React.render(
	<DataList data={data} />,
	document.getElementById("container")
);

module.exports = true;