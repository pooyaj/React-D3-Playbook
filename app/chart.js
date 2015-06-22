var React = require('react');
var d3Chart = require("./d3chart.js");

var Chart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
    },
    getInitialState: function () {
        return {
            dataLoaded: false, 
            chartCreated: false
        };
    },
    componentDidMount: function () {

    },
    componentDidUpdate:  function () {        
        var el = this.getDOMNode();
        this.createOrUpdateChart(el, this.getChartData());
    },
    componentWillReceiveProps: function (nextProps) {              
        if (nextProps != null) {            
            this.setState({dataLoaded: true});    
        }
    },
    componentWillUnmount:  function () {
        var el=this.getDOMNode();
        d3Chart.destroy(el);
    },
    render: function() {
        if (this.state.dataLoaded) {            
            return (
                    <div className="Chart"></div>
                   );            
        } else {
            return (
                    <div className="Chart"><div>Loading ... </div></div>
                   );
        }
    },
    getChartData: function () {
        return {
            data: this.props.data
        };
    },
    createChart: function (el, data) {
        var w = el.clientWidth;
        d3Chart.create(el,{
            width: w,
            height: '300',
            margin: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20}
            },
            data
            );
        this.setState({chartCreated: true});
    }, 
    createOrUpdateChart: function (el, data) {
        if (this.state.chartCreated) {
            d3Chart.update(el, data);
        } else {
            this.createChart(el, data);
        }
    }
});

module.exports = Chart;
