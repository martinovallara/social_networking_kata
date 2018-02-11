class Invoker {
  constructor() {
    console.log("new Invoker");
    this.patternCommands = [];
  }

  command(pattern, action) {
    console.log(`this of invoker is undefined: ${this == null}`);
    this.patternCommands.push({ pattern: pattern, action: action });
  }

  commandDefault(action) {
    this.patternCommands.push({ pattern: /.*/, action: action });
  }

  processLine(arg) {
    return this.patternCommands
      .find(a => {
        return a.pattern.test(arg);
      })
      .action(arg);
  }
}

//var invoker = new Invoker();
/*
module.exports.command = invoker.command;
module.exports.commandDefault = invoker.commandDefault;
module.exports.processLine = invoker.processLine;
*/
module.exports = {
  Invoker: new Invoker()
};
