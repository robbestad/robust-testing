const { expect } = require("chai");
const JSCheck = require("./jscheck/jscheck");
const {validatePassword} = require("../src/password");
let jsc = JSCheck();

test("Validates password", done => {
  function on_done(log) {
    try {
      expect(log.ok).to.eql(true);
      done();
    } catch (error) {
      done(error);
    }
  }

  jsc.claim(
    "Validate password against policy",
      function predicate(verdict, data) {
      return verdict(validatePassword(data));
    },
    [
      jsc.string(
        2,jsc.character("A", "Z"),
        1,jsc.one_of(["!", "@", "#", "$", "%","&",")","(","="]),
        2,jsc.character("1", "9"),
        5,jsc.character("a", "z")
      ),
    ]
  );
  jsc.check({
    nr_trials: 10,
    on_result: on_done,
    detail: 1
  });
});
