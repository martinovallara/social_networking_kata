var LINQ = require("node-linq").LINQ;
var Post = require("./post");

class Commands {
  constructor() {
    this.POSTING = " -> ";
    this.posts = [];
  }

  post(arg) {
    var params = arg.split(this.POSTING);
    var author = params[0];
    var message = params[1];
    this.posts.push(new Post(author, message));
    return `${author}${this.POSTING}${message}`;
  }

  read(arg) {
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
        var minutes = getMinutes(p);
        return `${p.message} (${minutes} minute${plurals(minutes)} ago)`;
      })
      .ToArray()
      .join("\r\n");
  }
}

module.exports = Commands;


function plurals(minutes) {
  return minutes == 1 ? '' : 's';
}

function getMinutes(p) {
  var deltaTime = (new Date() - p.date);
  var minutes = Math.round(((deltaTime % 86400000) % 3600000) / 60000); // minutes
  return minutes;
}

