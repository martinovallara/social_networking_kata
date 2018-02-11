var LINQ = require("node-linq").LINQ;
var Post = require("./post");

class Commands {
  constructor() {
    this.POSTING = " -> ";
    this.posts = [];
  }

  posting(arg) {
    console.log("execute posting");
    var params = arg.split(this.POSTING);
    var author = params[0];
    var message = params[1];
    this.posts.push(new Post(author, message));
    return `${author}${this.POSTING}${message}`;
  }

  reading(arg) {
    console.log("execute reading");
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

module.exports = Commands;
