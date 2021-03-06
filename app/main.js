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
        var that = this;
        window.addEventListener('resize', this.handleResize);
        this.loadData().then(function success(result) {
            that.setState({data:result});
        });
    },
    loadData: function () {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: 'sample.json',
                dataType: 'json',
                success: function(datajp){
                    trans = datajp.statuses.map(function (x) {
                        x['x'] = x['retweet_count'];
                        x['y'] = x['retweet_count'];
                        x['z'] = 10;
                        x['w'] = 2;
                        return x;
                    });
                    setTimeout(function () {
                        resolve(trans);    
                    }, 2000);
                }
            });
        });
        return promise;
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


