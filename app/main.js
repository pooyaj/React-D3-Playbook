var React = require('react');
var Chart = require('./chart.js');
var $ = require("jquery");


var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 's4f8phiw', x: 51, y: 145, z: 9}
];

var app = React.createClass({
    getInitialState: function () {
      return {
          data: sampleData,
          domain: {x: [0, 30], y: [0,100]}
        }
    },
    handleResize: function () {
        this.setState({});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        var that = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/tweets?query=vancouver',
            dataType: 'jsonp',
            success: function(datajp){
                console.log(datajp);
                trans = datajp.map(function (x) {
                    x['x'] = x['n_followers_count'];
                    x['y'] = x['n_listed_count'];
                    x['z'] = 1;
                    return x;
                });
                that.setState({data:trans});
            }
        });
    },
    render: function () {
        return (
            <div className="App">
                <Chart 
                    data={this.state.data}
                    domain={this.state.domain}
                    />
            </div>
            );
    }
});

React.renderComponent(app(), document.body);


