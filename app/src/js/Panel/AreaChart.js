import React, {Component, PropTypes} from "react";
import History from "../Helper/History";
import Axis from "./Axis";
import d3 from "d3";
import {hexToRgb} from "../Helper/util";

var height = 280;
class AreaChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 640
		};
		this.history = new History(60, 0);

		this.xScale = d3.scale.linear()
			.domain([60, 0])
			.range([0, this.state.width]);

		this.yScale = d3.scale.linear()
			.domain([0, 100])
			.range([height, 0]);

		this.area = d3.svg.area()
			.x((d, i) => this.xScale(60 - i))
			.y0(height)
			.y1(d => this.yScale(d))
			.interpolate("linear");
	}
	componentWillReceiveProps(nextProps) {
		var data = nextProps.data[nextProps.field];
		this.history.push(data);
	}
	renderArea() {
		var translate = `translate(30, 20)`;
		var fill = hexToRgb(this.props.fill);
		var fillColor = `rgba(${fill.r}, ${fill.g}, ${fill.b}, 0.3)`;
		var data = this.history.get();
		
		return (
			<path className="area" transform={translate}
				fill={fillColor} stroke={this.props.fill}
				d={this.area(data) } />
		);
	}
	render() {
		return (
			<svg>
				<Axis height={height} scale={this.yScale} axisType="y"
					orient="left" uiClass="axis" ticks={10} />
				<Axis height={height} scale={this.xScale} axisType="x"
					orient="bottom" uiClass="axis no-text" ticks={10} tickFormat="s" />
				{this.renderArea() }
			</svg>
		);
	}
}

AreaChart.propTypes = {
	type: PropTypes.string,
	field: PropTypes.string,
	data: PropTypes.object,
	fill: PropTypes.string
};

export default AreaChart;