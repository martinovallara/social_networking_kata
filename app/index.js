const socialNetWork = require("./socialNetworkKata");
var app = socialNetWork.create();
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var firstAsyncReadLine = function() {
  rl.question(
    "User submits commands to the application:" +
      "   posting: <user name> -> <message>\r\n" +
      "   reading: <user name>\r\n" +
      "   following: <user name> follows <another user>\r\n" +
      "   wall: <user name> wall\r\n" +
      "\r\n"+
      ">",
    function(line) {
      console.log(app.processLine(line));

      recursiveAsyncReadLine(); //Calling this function again to ask new question
    }
  );
};


var recursiveAsyncReadLine = function() {
    rl.question(
        ">",
      function(line) {
        console.log(app.processLine(line));
  
        recursiveAsyncReadLine(); //Calling this function again to ask new question
      }
    );
  };


  firstAsyncReadLine();
