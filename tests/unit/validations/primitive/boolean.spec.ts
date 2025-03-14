import { validateBoolean, validateBooleanForCSV } from "../../../../src/validations/primitive/boolean";

describe("validateBoolean", () => {
  it("should return true for valid boolean", () => {
    const result = validateBoolean("true");
    expect(result).toBe(true);
  });

  it("should return false for invalid boolean", () => {
    const result = validateBoolean("Uh Huh");
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateBoolean("");
    expect(result).toBe(false);
  });
});

describe("validateBooleanForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    const result = validateBooleanForCSV();
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: True, False",
      "newValue": "True"
    });
  });

  it("should return a default error message when type is invalid", () => {
    const result = validateBooleanForCSV("Invalid Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: True, False",
      "newValue": "True"
    });
  });

  it("should return null when type is valid", () => {
    const resultOne = validateBooleanForCSV("yes");
    expect(resultOne).toBeNull();
    const resultTwo = validateBooleanForCSV("Yes");
    expect(resultTwo).toBeNull();
    const resultThree = validateBooleanForCSV("YES");
    expect(resultThree).toBeNull();
    const resultFour = validateBooleanForCSV("no");
    expect(resultFour).toBeNull();
    const resultFive = validateBooleanForCSV("No");
    expect(resultFive).toBeNull();
    const resultSix = validateBooleanForCSV("NO");
    expect(resultSix).toBeNull();
    const resultSeven = validateBooleanForCSV("true");
    expect(resultSeven).toBeNull();
    const resultEight = validateBooleanForCSV("True");
    expect(resultEight).toBeNull();
    const resultNine = validateBooleanForCSV("TRUE");
    expect(resultNine).toBeNull();
    const resultTen = validateBooleanForCSV("false");
    expect(resultTen).toBeNull();
    const resultEleven = validateBooleanForCSV("False");
    expect(resultEleven).toBeNull();
    const resultTwelve = validateBooleanForCSV("FALSE");
    expect(resultTwelve).toBeNull();
    const resultThirteen = validateBooleanForCSV(1);
    expect(resultThirteen).toBeNull();
    const resultFourteen = validateBooleanForCSV(0);
    expect(resultFourteen).toBeNull();
    const resultFifteen = validateBooleanForCSV("1");
    expect(resultFifteen).toBeNull();
    const resultSixteen = validateBooleanForCSV("0");
    expect(resultSixteen).toBeNull();
  });
});
