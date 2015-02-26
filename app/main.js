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
            url: 'http://127.0.0.1:5000/tweets?query=vancouver',
            dataType: 'jsonp',
            success: function(datajp){
                console.log(datajp);
                trans = datajp.map(function (x) {
                    x['x'] = x['n_followers_count'];
                    x['y'] = x['n_listed_count'];
                    x['z'] = x['authority'];
                    x['w'] = x['sentiment'];
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


