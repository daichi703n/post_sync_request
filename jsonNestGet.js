var util = require('util');

function dump(v){
  return console.log(util.inspect(v));
}

var request = require('sync-request');
var returnJson;
var ticketCount=4; //ticket per page

console.log("Start\n");
returnJson = redmineGet(ticketCount);
//dump(returnJson);  //check all result

console.log(" Start check each ticket :");
var customFieldsLength, cf=["id", "name", "value"]; //cf:Custom Fields
for(var i=0; i<ticketCount; i++){
  console.log("\n");dump(returnJson["issues"][i]["id"]);dump(returnJson["issues"][i]["subject"]);

  customFieldsLength = returnJson["issues"][i]["custom_fields"].length;
  //console.log("\n customFields : ");
  for(var j=0; j<customFieldsLength; j++){
    //dump(returnJson["issues"][i]["custom_fields"]);
    cf = returnJson["issues"][i]["custom_fields"][j];
    //console.log("  index: "+j+" | id: "+cf.id+"  name: "+cf.name+"  value: "+cf.value);
    if((cf.id==4) && (cf.value == "HatenaBlog")){console.log("  HatenaBlog ticket!!");}
  }
}

console.log("\nEnd");

function redmineGet(ticketLimit){
  var ticketJson, ticketOffset=0;
  var ticketUrl="rainbow-pal.ddo.jp:9980", ticketKey="ab104b18c061c8fbe7edfe08f4494c072a0813a1";
  var response = request(
    'GET',
    'http://'+ticketUrl+'/issues.json?status_id=%2a&limit='+ticketLimit+'&offset='+ticketOffset+'&key='+ticketKey
    );
    if (response.statusCode == 200) {
      //console.log("Redmine : "+response.body);
      ticketJson = JSON.parse(response.body);
      return ticketJson;
    }
}
