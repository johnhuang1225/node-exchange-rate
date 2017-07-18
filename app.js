var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var request = require("request");
var cheerio = require("cheerio");

var port = process.env.PORT || 4000;
var app = express();
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(res, response, next){
    // response.render('index',{title: 'Cool, Good', condition: true, anyArray:['a', 'b', 'c']})

    request({
        url: "http://www.findrate.tw/bank/29/#.VvEG5Xpr9Sg",
        method: "GET"
    }, function(error, res, body) {
        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(body);

          var rateDay = $("#rate_date").html();
          console.log('rateDay:' + rateDay);

          var cashBuyIn = parseFloat($("table tbody tr td.WordB")[72].children[0].data);
          var buyIn = parseFloat($("table tbody tr td.WordB")[74].children[0].data);
          var sellOut = parseFloat($("table tbody tr td.WordB")[75].children[0].data);
          var average = (buyIn + sellOut) / 2;

          var VIP0 = Math.floor(4.9 * 10) / 10;
          var VIP1 = Math.floor(average * 1000) / 1000;
          var VIP2 = Math.floor( (VIP1 + 0.03) * 1000) / 1000;
          var VIP3 = Math.floor( (VIP2 + 0.03) * 1000) / 1000;
          var VIPS1 = Math.floor( (cashBuyIn + 0.03) * 1000) / 1000;
          var VIPS2 = Math.floor( (VIPS1 + 0.03) * 1000) / 1000;
        //   VIPS2 = VIP2.toPrecision(4);
          var VIPS0 = Math.floor( (((VIPS1+VIPS2)/2)-0.003) * 1000)/ 1000;

          response.render('index', {title: '匯通天下',
                                    rateDay: rateDay,
                                    buyIn: buyIn,
                                    sellOut: sellOut,
                                    cashBuyIn: cashBuyIn,
                                    VIP0: VIP0,
                                    VIP1: VIP1,
                                    VIP2: VIP2,
                                    VIP3: VIP3,
                                    VIPS1: VIPS1,
                                    VIPS2: VIPS2,
                                    VIPS0: VIPS0,
                                    })
        }
      });

});

app.listen(port, function(){
    console.log(`Server is start on ${port}...`);
});
