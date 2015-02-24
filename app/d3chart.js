var d3 = require('d3');
var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('g')
      .attr('class', 'd3-points')
      .attr("transform", "translate(" + 20 + "," + 20 + ")");

  this.update(el, state);
};

d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain, state.data);
  this._drawPoints(el, scales, state.data);
};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

d3Chart.xValue = function(d) { return d["x"];}

d3Chart.yValue = function(d) { return d["y"];}

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
      .attr('r', function(d) { return scales.z(d.z); });

  // EXIT
  point.exit()
      .remove();
};

d3Chart._scales = function(el, domain, data) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth - 40;
  var height = el.offsetHeight - 40;

  var x = d3.scale.linear()
    .range([0, width])
    .domain([d3.min(data, this.xValue)-1, d3.max(data, this.xValue)+1]);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain([d3.min(data, this.yValue)-1, d3.max(data, this.yValue)+1]);

  var z = d3.scale.linear()
    .range([5, 20])
    .domain([1, 10]);

  return {x: x, y: y, z: z};
};

module.exports = d3Chart;
