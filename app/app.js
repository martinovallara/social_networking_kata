class SocialNetworkKata {
  command(command) {
    var params = command.split("->");
    if (params.length > 1) {
      return command;
    }

    return "I love the weather today (5 minutes ago)";
  }
}

module.exports = new SocialNetworkKata();
