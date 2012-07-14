
var fs = require('fs'),
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('stocks', server);

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");

    var entry = {
      name: 'Google Inc.',
      symbol: 'GOOG',
      file: 'goog.csv'
    }

    var dbData = [];
    var stream = fs.createReadStream(entry.file);
    stream.setEncoding('ASCII');

    stream.on('data', function(data){
      // console.log("data:", data);

      var currentDay = false;
      var lines = data.split('\n');
      for(var i=0; i<lines.length; i++) {
        var segs = lines[i].split(',');
        // console.log("segs:", segs.length)
        if(segs.length == 6) {

          if(segs[0].search('a') != -1) {
            currentDay  = segs[0].slice(1) + "000";
            currentDay = parseInt(currentDay) - 21600000;
            segs[0] = 0;
          }

          dbData.push({
            name: entry.name,
            symbol: entry.symbol,
            date: currentDay + parseInt(segs[0]) * 60000,
            close: segs[1],
            high: segs[2],
            low: segs[3],
            open: segs[4],
            volume: segs[5]
          });
        }
      }

      console.log("found ", dbData.length, " entries");
    });

    db.createCollection('quotes', function(err, collection) {
      if(!err) {
        collection.insert(dbData, {safe: true}, function(err, result) {
          if(err){
            console.log("error inserting records...", err);
          } else {
            console.log("imported successfully.");
          }
        });
      }
    });
  }
});
