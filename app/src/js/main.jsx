'use strict';

var React = require("react");
var CommentBox = require("./components/CommentBox.jsx");

var data = JSON.parse(document.getElementById("props").innerHTML);

React.render(
	<CommentBox data={data} />,
	document.getElementById("container")
);

module.exports = true;