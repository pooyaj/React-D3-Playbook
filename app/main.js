var React = require('react');
var Chart = require('./chart.js');
var $ = require("jquery");


var app = React.createClass({
    getInitialState: function () {
      return {
          data: null,
        }
    },
    handleResize: function () {
        this.setState({});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        var that = this;
        $.ajax({
            url: 'sample.json',
            dataType: 'json',
            success: function(datajp){
                console.log(datajp);
                trans = datajp.statuses.map(function (x) {
                    x['x'] = x['retweet_count'];
                    x['y'] = x['retweet_count'];
                    x['z'] = 10;
                    x['w'] = 2;
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
                    />
            </div>
            );
    }
});

React.renderComponent(app(), document.body);


