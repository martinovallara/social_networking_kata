var Commands = require("./commands");
const invoker = require("./invoker");

class SocialNetworkKata {
  constructor() {
    var commands = new Commands(); ////
    var config = [
      {
        pattern: / -> /,
        action: (a,item) => commands.post(a, item)
      },
      {
        pattern: / follows /,
        action: (a,item) => commands.follows(a,item)
      },
      {
        pattern: / wall/,
        action: (a,item) => commands.wall(a,item)
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

exports.create = function() {
  return new SocialNetworkKata();
};