var LINQ = require("node-linq").LINQ;
var moment = require("moment");
class SocialNetworkKata {
  constructor() {
    this.commands = new Commands();
  }

  processLine(arg) {
    var command = this.parseArg(arg);
    return command.execute();
  }

  parseArg(arg) {
    var commands = this.commands;
    var result = {
      execute() {
        return commands.reading(arg);
      }
    };

    if (arg.includes(this.commands.POSTING)) {
      result.execute = function() {
       return commands.posting(arg);
      };
    }
    return result;
  }
}

class Post {
  constructor(author, message) {
    this.author = author;
    this.message = message;
    this.date = moment();
  }
}

class Commands {
  constructor() {
    this.POSTING = " -> ";
    this.posts = [];
  }

  posting(arg) {
    var params = arg.split(this.POSTING);
    var author = params[0];
    var message = params[1];
    this.posts.push(new Post(author, message));
    return `${author}${this.POSTING}${message}`;
  }

  reading(arg) {
    var author = arg;
    return this.authorPosts(author);
  }

  authorPosts(author) {
    return new LINQ(this.posts)
      .Where(p => {
        return p.author === author;
      })
      .OrderByDescending(p => {
        return new Date(p.date);
      })
      .Select(p => {
        return p.message;
      })
      .ToArray()
      .join("\r\n");
  }
}

module.exports = new SocialNetworkKata();
