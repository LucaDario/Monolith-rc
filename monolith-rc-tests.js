// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by monolith-rc.js.
import { name as packageName } from "meteor/monolith-rc";

// Write your tests here!
// Here is an example.
Tinytest.add('monolith-rc - example', function (test) {
  test.equal(packageName, "monolith-rc");
});
