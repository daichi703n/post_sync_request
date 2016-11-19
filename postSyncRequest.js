var util = require('util');

function dump(v){
  return console.log(util.inspect(v));
}

var request = require('sync-request');

console.log("Start\n");
redminePost();
console.log("\nEnd");

function redminePost(){
  var ticketUrl="rainbow-pal.ddo.jp:9980", ticketKey="ab104b18c061c8fbe7edfe08f4494c072a0813a1";
  // no need //var headerJson =  "Content-type: application/json";
  var bodyJson;
  bodyJson = {
    "issue":{
      "project_id":13,
      // NG!! "project":{"id":13,"name":"Webシステム"},
      "tracker_id":1,
      "status_id":1,
      "priority_id":2,
      "category_id":21,
      "subject":"Node.jsでJSONをPOSTできない",
      "description":"",
      "start_date":"2016-11-19",
      "done_ratio":0,
      "spent_hours":0.0,
      "custom_fields":[
        {"id":1,"name":"不具合番号","value":"634"},
        {"id":3,"name":"要求元","value":"保守"},
        {"id":4,"name":"システム","value":"HatenaBlog"}
        ]
      }
    };
  var response = request(
    'POST',
    'http://'+ticketUrl+'/issues.json?key='+ticketKey,{
    // no need //headers: headerJson,
    json: bodyJson
    });
  dump(response);
  console.log(" body");
  dump(JSON.parse(response.getBody('utf8')));
}
