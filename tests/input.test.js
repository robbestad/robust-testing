const { expect } = require("chai");
const Fuzz = require("jest-fuzz");
const {validateInput} = require("../src/password");

const stringFuzzer = Fuzz.Fuzzer({
  random50: Fuzz.string({ length: 50 }),
  random100: Fuzz.string({ length: 100 }),
});

Fuzz.test("Validate long enough user input", stringFuzzer(), (data) => {
  const result = validateInput(data.random50);
  expect(result).to.eql(true);
});

Fuzz.test("Invalidates too long", stringFuzzer(), (data) => {
  const result = validateInput(data.random100);
  expect(result).to.eql(false);
});

test("Invalidates if input is too short", () => {
  const result = validateInput("abc");
  expect(result).to.eql(false);
});
