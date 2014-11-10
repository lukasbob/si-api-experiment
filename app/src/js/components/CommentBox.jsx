'use strict';

var React = require("react");

var CommentBox = React.createClass({
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		this.setState({	data: comments.concat([comment]) });
	},

	getInitialState: function() {
		return {data: this.props.data };
	},

	componentDidMount: function(){
		this.setState({ data: this.props.data });
	},

	render: function() {
		var list;

		if (this.state.data.items) {
			list = <List data={this.state.data.items} />;
		} else {
			list = <p>No data</p>;
		}

		return (
			<div className="comp-item-box">
				<h1>Sites</h1>
				{list}
			</div>
		);
	}
});

var List = React.createClass({
	render: function() {
		var itemNodes = this.props.data.map(function(item) {
			return (
				<Item data={item} key={item.site_id} />
			);
		});

		return (
			<ul className="comp-item-list">
				{itemNodes}
			</ul>
		);
	}
});

var Item = React.createClass({

	render: function () {
		var keys = Object.keys(this.props.data)
		var propNodes = keys.map(function(key) {
			var data = this.props.data[key];

			return (
				<tr key={key}>
					<th className="right">{key}:</th> <td>{data}</td>
				</tr>
			);
		}.bind(this))

		return (
			<li><table>{propNodes}</table></li>
		);
	}
});

module.exports = CommentBox;