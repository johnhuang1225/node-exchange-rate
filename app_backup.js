// http://freshwebdev.com/newbie-how-to-create-simple-scraping-data-from-web-with-node-js-cheerio-and-request-js.html

// 最終方案:https://jonlabelle.com/snippets/view/javascript/nodejs-scraping-example

var http = require("http");
var request = require("request");
var cheerio = require("cheerio");



http.createServer(function(req, res) {
  var serverRes = res;

  request({
    url: "http://www.findrate.tw/bank/29/#.VvEG5Xpr9Sg",
    method: "GET"
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(body);

      var rateDay = $("#rate_date").html();
      console.log('rateDay:' + rateDay);

      var cashBuyIn = parseFloat($("table tbody tr td.WordB")[72].children[0].data);
      var buyIn = parseFloat($("table tbody tr td.WordB")[74].children[0].data);
      var sellOut = parseFloat($("table tbody tr td.WordB")[75].children[0].data);
      var average = (buyIn + sellOut) / 2;

      //var VIP0 = Math.floor(average * 10) / 10;
      var VIP0 = Math.floor(4.9 * 10) / 10;
      var VIP1 = Math.floor(average * 1000) / 1000;
      var VIP2 = Math.floor( (VIP1 + 0.03) * 1000) / 1000;
      var VIP3 = Math.floor( (VIP2 + 0.03) * 1000) / 1000;
      var VIPS1 = Math.floor( (cashBuyIn + 0.03) * 1000) / 1000;
      var VIPS2 = Math.floor( (VIPS1 + 0.03) * 1000) / 1000;
      var VIPS0 = Math.floor( (((VIPS1+VIPS2)/2)-0.003) * 1000)/ 1000;

      console.log("buyIn:" + buyIn + ",sellOut:" + sellOut);
      console.log("average = " + average);
      //console.log("VIP0 = " + VIP0);
      console.log("VIP0 = " + VIP0);
      console.log("VIP1 = " + VIP1);
      console.log("VIP2 = " + VIP2);
      console.log("VIP3 = " + VIP3);
      console.log("VIPS0 = " + VIPS0);
      console.log("VIPS1 = " + VIPS1);
      console.log("VIPS2 = " + VIPS2);


      serverRes.write("<!DOCTYPE html>");
      serverRes.write("<html lang='zh-TW'>");
      serverRes.write("<head>");
      serverRes.write("<meta charset='UTF-8'>");
      serverRes.write("<meta http-equiv='refresh' content='10'>");
      serverRes.write("<title>ExchangeRate</title>");
      serverRes.write("</head>");
      serverRes.write("<body>");

      serverRes.write("<h1>匯通天下</h1>");
      serverRes.write("<div>更新時間:" + rateDay +"</div><br>");
      serverRes.write("<div>即期買入 " + buyIn + "</div>");
      serverRes.write("<div>即期賣出 " + sellOut + "</div>");
      serverRes.write("<div>現金買入 " + cashBuyIn + "</div><br>");
      //serverRes.write("<div>VIP0 <input type='text' style='font-size:25px;background-color:pink;' value=" + VIP0 + "  disabled></div><br>");
      //serverRes.write("<div>VIP1 <input type='text' style='font-size:25px;background-color:yellow;' value=" + VIP1 + "  disabled></div><br>");
      //serverRes.write("<div>VIP2 <input type='text' style='font-size:25px;background-color:lightgreen;' value=" + VIP2.toPrecision(4) + "  disabled></div><br>");
      //serverRes.write("<div>VIPS1 <input type='text' style='font-size:25px;background-color:blue;' value=" + VIPS1 + "  disabled></div><br>");

      serverRes.write("<div><span>VIP0</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:mediumpurple;'>" + VIP0 + "</span></div><br>");
      serverRes.write("<div><span>VIP1</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:lightseagreen;'>" + VIP1 + "</span></div><br>");
      serverRes.write("<div><span>VIP2</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:lightblue;'>" + VIP2.toPrecision(4) + "*</span></div><br>");
      //serverRes.write("<div><span>VIP3</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:#A2CD5A;'>" + VIP3.toPrecision(4) + "</span></div><br>");
      serverRes.write("==============================<br><br>");
      serverRes.write("買入<br><br>");
      serverRes.write("<div><span>VIPS0</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:orangered;'>" + VIPS0 + "*</span></div><br>");
      serverRes.write("<div><span>VIPS1</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:lightcoral;'>" + VIPS1 + "</span></div><br>");
      serverRes.write("<div><span>VIPS2</span>&nbsp;&nbsp;&nbsp;<span style='font-size:25px;background-color:#FFFF00;'>" + VIPS2 + "</span></div>");


      serverRes.write("</body>");
      serverRes.write("</html>");
      serverRes.end("");

    }
  });

}).listen(3000);
