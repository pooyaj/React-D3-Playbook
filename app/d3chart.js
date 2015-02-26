var d3 = require('d3');
var d3Chart = {};

d3Chart.props = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);
  this.props = props;
  svg.append('g')
      .attr('class', 'd3-points')
      .attr("transform", "translate(" + props.margin.top + "," + props.margin.left + ")");

  this.update(el, state);
};

d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.data);
  if (scales) {
    this._drawAxis(el, scales);
    this._drawPoints(el, scales, state.data);
  }
};

d3Chart.destroy = function(el) {
};

d3Chart._xValue = function(d) { return d["x"];}

d3Chart._yValue = function(d) { return d["y"];}

d3Chart._zValue = function(d) { return d["z"];}

d3Chart._wValue = function(d) { return d["w"];}


d3Chart._drawAxis = function(el, scales) {
  var svg = d3.select(el).select('.d3'),
      xAxis = d3.svg.axis().scale(scales.x).orient("bottom"),
      yAxis = d3.svg.axis().scale(scales.y).orient("left");


      // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +this.props.height+ ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", this.props.width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Calories");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Protein (g)");
}

d3Chart._drawPoints = function(el, scales, data) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });

  // ENTER
  point.enter().append('circle')
      .attr('class', 'd3-point');

  // ENTER & UPDATE
  point.attr('cx', function(d) { return scales.x(d.x); })
      .attr('cy', function(d) { return scales.y(d.y); })
      .attr('r', function(d) { return scales.z(d.z); })
      .style("fill", function(d) { return scales.w(d.w);});
  // EXIT
  point.exit()
      .remove();
};

d3Chart._scales = function(el, data) {
  if (!data) {
    return null;
  }

  var width = el.offsetWidth - this.props.margin.left - this.props.margin.right;
  var height = el.offsetHeight - this.props.margin.top - this.props.margin.bottom;

  var x = d3.scale.linear()
    .range([0, width])
    .domain([d3.min(data, this._xValue)-1, d3.max(data, this._xValue)+1]);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain([d3.min(data, this._yValue)-1, d3.max(data, this._yValue)+1]);

  var z = d3.scale.linear()
    .range([5, 15])
    .domain([d3.min(data, this._zValue)-1, d3.max(data, this._zValue)+1]);

  var color = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["red", "yellow", "green"]);

  return {x: x, y: y, z: z, w: color};
};

module.exports = d3Chart;
