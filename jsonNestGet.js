var request = require('sync-request');
var returnCode;

console.log("Start  Return Request Sync");
returnCode = httpGet();
console.log("Status Code (main)     : "+returnCode);
console.log("End    Return Request Sync");

function httpGet(){
  var response = request(
    'GET',
    'http://rainbow-pal.ddo.jp:9980/issues.xml?key=ab104b18c061c8fbe7edfe08f4494c072a0813a1'
    );
    if (response.statusCode == 200) {
      console.log("Status Code (function) : "+response.statusCode);
      return response.statusCode;
    }
}
