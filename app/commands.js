var LINQ = require("node-linq").LINQ;
var Post = require("./post");
var moment = require("moment");
class Commands {
  constructor() {
    this.POST = " -> ";
    this.posts = [];
    this.followed = {};
  }

  post(arg, pattern) {
    var params = arg.split(pattern);
    var author = params[0];
    var message = params[1];
    this.posts.push(new Post(author, message));
    return arg;
  }

  follows(arg, pattern) {
    var params = arg.split(pattern);
    var author = params[0];
    var follow = params[1];

    if (this.followed[author] == null) this.followed[author] = [];
    var followed = this.followed[author];
    if (followed.indexOf(followed) == -1) followed.push(follow);
    return `${arg} now!`;
  }

  wall(arg, pattern) {
    var params = arg.split(pattern);
    var author = params[0];
    var membersOfWall = [];
    membersOfWall.push(author);

    if (this.followed[author] != null && this.followed[author].length > 0)
      membersOfWall = membersOfWall.concat(this.followed[author]);

    var result = new LINQ(this.posts)
      .Where(p => {
        return membersOfWall.indexOf(p.author) >= 0;
      })
      .OrderByDescending(p => {
        return new Date(p.date);
      })
      .Select(p => {
        var minutes = getMinutes(p);
        return `${p.author} - ${p.message} (${minutes})`;
      })
      .ToArray();

    return result.join("\r\n");
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
        return `${p.message} (${minutes})`;
      })
      .ToArray()
      .join("\r\n");
  }
}

function getMinutes(p) {
  var deltaTime = p.date - new Date();
  return moment.duration(deltaTime).humanize(true);
}

module.exports = Commands;
