# requestモジュールでコールバック関数を使用せず戻り値を返す

webブラウザなしで動作し、サーバーサイドでも使用することができるnode.js。ExpressなどのWenアプリケーションフレームワークを使用してサービス開発、また、Seleniumやmochaなどのテストフレームワークと組み合わせてテストを自動化することもできる。

手軽に使用することができるため、ちょっとしたAPIアクセスにも便利だ。その際にHTTP GET, POSTするためのrequestモジュールで戻り値を返す方法を記載する。

一般的な方法でコールバック関数を使えばよいのだが、処理速度を求められないプログラムの場合は非同期より同期処理の方が扱いやすい。  

結論として、requestモジュールではコールバック関数を使用せずに同期処理をすることはできない。そのため、sync-requestモジュールを使用して同期処理にする。

## requestモジュールを使用する
[request - npm](https://www.npmjs.com/package/request)

requestモジュールをインストールする。
~~~
$ npm install request
~~~

シンプルにGoogleにアクセスする。ステータスコードを戻り値とする。

**returnReqAsync.js**

~~~javascript
var request = require('request');
var returnCode;

console.log("Start  Return Request Async");
returnCode = httpGet();
console.log("Status Code (main)     : "+returnCode)
console.log("End    Return Request Async");

function httpGet(){
  var options = {
    url: 'https://google.com/',
    method: 'GET',
    }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Status Code (function) : "+response.statusCode)
      return response.statusCode;
    }
  })
}
~~~

すると以下の出力となる。

> 
Start  Return Request Async  
Status Code (main)     : undefined  
End    Return Request Async  
Status Code (function) : 200  

main関数のStatus Codeに戻り値が入っていないことが分かる。また、最後のEndの後に関数内のconsole.logが出力されている。

この動作の要因がJavaScriptの高速化のための非同期処理だ。httpGetの処理完了を待たずに次の処理が進む。

## sync-requestモジュールを使用する
[sync-request - npm](https://www.npmjs.com/package/sync-request)

requestモジュールをインストールする。
~~~
$ npm install sync-request
~~~

sync-requestモジュールで同様の操作をする。使い方に合わせて調整あり。

**returnReqSync.js**

~~~javascript
var request = require('sync-request');
var returnCode;

console.log("Start  Return Request Sync");
returnCode = httpGet();
console.log("Status Code (main)     : "+returnCode)
console.log("End    Return Request Sync");

function httpGet(){
  var response = request(
    'GET',
    'https://google.com/'
    )
    if (response.statusCode == 200) {
      console.log("Status Code (function) : "+response.statusCode)
      return response.statusCode;
    }
}
~~~

これにより、以下の通り同期処理となって、想定通りに戻り値が返り、main関数で受け取れている。

> 
Start  Return Request Sync  
Status Code (function) : 200  
Status Code (main)     : 200  
End    Return Request Sync  

## まとめ
Node.js (javascript) でHTTP GET 及び POST するときに **sync-requestモジュール**を使用することで同期処理をすることができる。

APIから情報を取得(GET)して、他のAPIに送信(POST)するときなど、同期処理にしたいときに適用できる。

## サンプル取得データ(API)
### OpenWeatherMap
多くの記事が投稿されている気象情報APIから取得する。

### Redmine
自宅で使用しているRedmineのチケット情報をAPI経由でJSONで取得して操作する。


## 参考
[request - Github](https://github.com/request/request)
[request - npm](https://www.npmjs.com/package/request)
[sync-request - npm](https://www.npmjs.com/package/sync-request)

個人ブログを参考にさせていただきました。ありがとうございます。

[Node.js: request モジュールを使って GET リクエストを行う - Sarabande.jp](http://blog.sarabande.jp/post/52095868617)
[Node.jsのrequestモジュールを使ってHTTPSでPOSTリクエストを行う - Qiita](http://qiita.com/penta515/items/074b5c7694b9bcec1043)
[Node.jsでasyncモジュールを使って同期処理を行う - Qiita](http://qiita.com/ogawatachi/items/a4f6f3571b9fbedd9672)
