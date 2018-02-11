var Commands = require("./commands");
const invoker = require("./invoker");

class SocialNetworkKata {
  constructor() {
    var commands = new Commands(); ////
    var config = [
      {
        pattern: / -> /,
        action: a => commands.post(a)
      },
      {
        defaultAction: a => commands.read(a)
      }
    ];
    this.invoker = invoker.createInvoker(config);
  }

  processLine(arg) {
    return this.invoker.processLine(arg);
  }
}

module.exports = new SocialNetworkKata();
