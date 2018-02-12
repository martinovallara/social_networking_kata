/**
---------------------------------------

      Social Networking Kata

---------------------------------------


Posting: Alice can publish messages to a personal timeline

> Alice -> I love the weather today
> Bob -> Damn! We lost!
> Bob -> Good game though.

Reading: Bob can view Alice’s timeline

> Alice
> I love the weather today (5 minutes ago)
> Bob
> Good game though. (1 minute ago)
> Damn! We lost! (2 minutes ago)

Following: Charlie can subscribe to Alice’s and Bob’s timelines, and view an aggregated list of all subscriptions

> Charlie -> I'm in New York today! Anyone wants to have a coffee?
> Charlie follows Alice
> Charlie wall
> Charlie - I'm in New York today! Anyone wants to have a coffee? (2 seconds ago)
> Alice - I love the weather today (5 minutes ago)

> Charlie follows Bob
> Charlie wall
> Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)
> Bob - Good game though. (1 minutes ago)
> Bob - Damn! We lost! (2 minute ago)
> Alice - I love the weather today (5 minutes ago)


User submits commands to the application:
posting: <user name> -> <message>
reading: <user name>
following: <user name> follows <another user>
wall: <user name> wall


*/
var moment = require("moment");
var chai = require("chai");
var tk = require("timekeeper");
var assert = chai.assert;
var expect = chai.expect;




var sut = require("../app/app");




//const T0 = moment("2010-10-10 10:10");
const T0 = new Date("2010-10-10 10:00");

describe("Posting: Alice can publish messages to a personal timeline", function() {
  it("Alice -> I love the weather today", function() {
    tk.freeze(T0);
    expect(sut.processLine("Alice -> I love the weather today")).to.equal(
      "Alice -> I love the weather today"
    );
  });
  it("Bob -> Damn! We lost!", function() {
    tk.freeze(new Date(T0.valueOf()).setMinutes(T0.getMinutes() + 3));
    expect(sut.processLine("Bob -> Damn! We lost!")).to.equal(
      "Bob -> Damn! We lost!"
    );
  });
  it("Bob -> Good game though.", function() {
    tk.freeze(new Date(T0.valueOf()).setMinutes(T0.getMinutes() + 4));
    expect(sut.processLine("Bob -> Good game though.")).to.equal(
      "Bob -> Good game though."
    );
  });
});

describe("Reading: Bob can view Alice’s timeline", function() {
  it("Alice time line", function() {
    tk.freeze(new Date(T0.valueOf()).setMinutes(T0.getMinutes() + 5));
    var result = sut.processLine("Alice");
    expect(result).to.contain("I love the weather today");
    expect(result).to.contain("(5 minutes ago)");
  });

  it("Bob time line", function() {
    //tk.freeze(new Date(T0.valueOf()).setMinutes(T0.getMinutes() + 5));
    var result = sut.processLine("Bob");
    expect(result).to.contain("Good game though");
    expect(result).to.contain("Damn! We lost!");

    expect(result).to.contain("(1 minute ago)");
    expect(result).to.contain("(2 minutes ago)");
  });
});


