class Invoker {
  constructor(config) {
    this.patternCommands = config;
  }

  processLine(arg) {
    var matchedAction = this.patternCommands.find(a => {
      return this.isMatchedPattern(a, arg) || a.defaultAction != null;
    });

    if (matchedAction.action != null) return matchedAction.action(arg, matchedAction.pattern);

    return matchedAction.defaultAction(arg);
  }

  isMatchedPattern(a, arg) {
    return a.pattern != null && a.pattern.test(arg);
  }
}
exports.createInvoker = function(config) {
  return new Invoker(config);
};
