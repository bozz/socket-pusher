var socket = io.connect('http://localhost:8080');
socket.on('time', function (data) {
  $('#berlin-time').html(data.berlin);
  // console.log(data.berlin);
  // socket.emit('my other event', { my: 'data' });
});



$(function() {
    
    Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

		// create the chart
		var chart = new Highcharts.StockChart({
			chart : {
				renderTo : 'chart'
			},

			title: {
				text: 'AAPL stock price by minute'
			},
			
			rangeSelector : {
				buttons : [{
					type : 'hour',
					count : 1,
					text : '1h'
				}, {
					type : 'day',
					count : 1,
					text : '1D'
				}, {
					type : 'all',
					count : 1,
					text : 'All'
				}],
				selected : 1,
				inputEnabled : false
			},
            
            exporting: {
                enabled: false
            },
			
			series : [{
				name : 'AAPL',
				type: 'candlestick',
				data : (function() {
                    // generate an array of random data
                    var data = [], time = (new Date()).getTime(), i;

                    for( i = -999; i <= 0; i++) {
                        data.push([
                            time + i * 1000,
                            Math.round(Math.random() * 100),
                            Math.round(Math.random() * 100),
                            Math.round(Math.random() * 100),
                            Math.round(Math.random() * 100)
                        ]);
                    }
                    return data;
                })(),
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
        
});