var Commands = require("./commands");
//var invoker = require("./invoker");
var Invoker = require("./invoker").Invoker;
var command = Invoker.command; 
var commandDefault = Invoker.commandDefault;
class SocialNetworkKata {
  constructor() {
    var commands = new Commands();
    Invoker.command(/ -> /, arg => {
      return commands.posting(arg);
    });

    Invoker.commandDefault(arg => {
      return commands.reading(arg);
    });
  }

  processLine(arg) {
    return Invoker.processLine(arg);
  }
}

module.exports = new SocialNetworkKata();
