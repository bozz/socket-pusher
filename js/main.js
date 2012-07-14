var socket = io.connect('http://localhost:8080');
socket.on('newQuote', function (data) {
  if(data.date) {
    var time = (new Date(data.date)).getTime();
    var quote = [time, parseFloat(data.open), parseFloat(data.high), parseFloat(data.open), parseFloat(data.close)];
    // console.log("quote:", time, quote);
    window.chart.series[0].addPoint(quote, true, false);
  }
});


$(function() {

  Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});

		// create the chart
		window.chart = new Highcharts.StockChart({
			chart : {
				renderTo : 'chart'
			},
			title: {
				text: 'Google stocks'
			},
			rangeSelector : {
				buttons : [{
					type : 'minute',
					count : 1,
					text : '1m'
				}, {
					type : 'minute',
					count : 5,
					text : '5m'
				}, {
					type : 'all',
					text : 'All'
				}],
				selected : 1,
				inputEnabled : false
			},
      rangeSelector: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
			series : [{
				name : 'quotes',
				type: 'candlestick',
        data: [],
				// data : (function() {
          // generate an array of random data
        //   var data = [], time = (new Date()).getTime(), i;

        //   for( i = -999; i <= 0; i++) {
        //     data.push([
        //               time + i * 1000,
        //               Math.round(Math.random() * 100),
        //               Math.round(Math.random() * 100),
        //               Math.round(Math.random() * 100),
        //               Math.round(Math.random() * 100)
        //     ]);
        //   }
        //   return data;
        // })(),
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
        
});
