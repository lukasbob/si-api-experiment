'use strict';

var React = require("react");

var DataList = React.createClass({
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

		if (this.state.data.data.items) {
			list = <List data={this.state.data.data.items} />;
		} else {
			list = <p>No data</p>;
		}

		return (
			<div className="comp-item-box">
				<h1>{this.state.data.path}</h1>
				{list}
				<pre>
					{JSON.stringify(this.state.data, null, "  ")}
				</pre>

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
			<li>
				<table>
					<col className="comp-prop-key" />
					<col className="comp-prop-value" />
					{propNodes}
				</table>
			</li>
		);
	}
});

module.exports = DataList;