var Commands = require("./commands");
const invoker = require("./invoker");

class SocialNetworkKata {
  constructor() {
    var commands = new Commands();////
    var config = [
      {
        pattern: / -> /,
        action: arg => {
          return commands.post(arg);
        }
      },
      {
        defaultAction: arg => {
          return commands.read(arg);
        }
      }
    ];
    this.invoker = invoker.createInvoker(config);
  }

  processLine(arg) {
    return this.invoker.processLine(arg);
  }
}

module.exports = new SocialNetworkKata();
