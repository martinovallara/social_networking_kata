var LINQ = require("node-linq").LINQ;
var Post = require("./post");
var moment = require("moment");
class Commands {
  constructor() {
    this.posts = [];
    this.following = {};
  }

  post(arg, pattern) {
    var params = arg.split(pattern);
    var author = params[0],
      message = params[1];
    this.posts.push(new Post(author, message));
    return arg;
  }

  follows(arg, pattern) {
    var params = arg.split(pattern);
    var author = params[0],
      follow = params[1];

    if (this.following[author] == null) this.following[author] = [];
    var following = this.following[author];
    if (!following.includes(follow)) following.push(follow);
    return `${arg} now!`;
  }

  wall(arg, pattern) {
    var author = arg.split(pattern)[0];
    var membersOfWall = [];
    membersOfWall.push(author);

    if (this.hasFollowing(author))
      membersOfWall = membersOfWall.concat(this.following[author]);

    var result = new LINQ(this.posts)
      .Where(p => {
        return membersOfWall.includes(p.author);
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

  hasFollowing(author) {
    return this.following[author] != null && this.following[author].length > 0;
  }

  read(author) {
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
