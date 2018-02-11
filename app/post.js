var moment = require("moment");

class Post {
  constructor(author, message) {
    this.author = author;
    this.message = message;
    this.date = moment();
  }
}

module.exports = Post;
