var React = require('react');
var d3Chart = require("./d3chart.js");

var Chart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
    },
    componentDidMount: function () {
        var el = this.getDOMNode();
        var w = el.clientWidth;
console.log(w);
        d3Chart.create(el,{
            width: w,
            height: '300',
            margin: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20}
            },
            this.getChartState()
            );
    },
    componentDidUpdate:  function (){
        var el = this.getDOMNode();
        d3Chart.update(el, this.getChartState());
    },
    getChartState : function () {
        return {
            data: this.props.data
        };
    },
    componentWillUnmount:  function (){
        var el=this.getDOMNode();
        d3Chart.destroy(el);
    },
    render: function() {
        return (
                <div className="Chart"></div>
               );
    }

});



module.exports = Chart;
