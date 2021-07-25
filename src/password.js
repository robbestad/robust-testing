function validateInput(data) {
  if (typeof data !== "string") return false;
  let input = data.trim();
  if (input.length <= 4) return false;
  return input.length <= 50;
}

function validatePassword(data) {
  if (validateInput(data)) {
    let policyTest = {
      uppercaseLetters: 0,
      lowercaseLetters: 0,
      symbols: 0,
      numbers: 0,
    };
    for (let i = 0; i < data.length; i++) {
      let digit = data[i];
      if ("@!#$%&/()=".indexOf(digit) > -1) {
        policyTest.symbols = 1 + policyTest.symbols;
        continue;
      }
      if (parseInt(digit, 10).toString() === digit) {
        policyTest.numbers = 1 + policyTest.numbers;
        continue;
      }
      if (digit.toLocaleUpperCase() === digit) {
        policyTest.uppercaseLetters = 1 + policyTest.uppercaseLetters;
        continue;
      }
      if (digit.toLowerCase() === digit) {
        policyTest.lowercaseLetters = 1 + policyTest.lowercaseLetters;
      }
    }
    return (
      policyTest.uppercaseLetters > 1 &&
      policyTest.lowercaseLetters > 4 &&
      policyTest.numbers > 0 &&
      policyTest.symbols > 0
    );
  }
  return false;
}

module.exports = {
  validateInput,
  validatePassword,
};
