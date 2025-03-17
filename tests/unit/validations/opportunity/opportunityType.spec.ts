import { validateOpportunityType, validateOpportunityTypeForCSV } from "../../../../src/validations/opportunity/opportunityType";

const validOpportunityTypes = {
  "REMOTE": "Remote",
  "IN_PERSON": "In person",
}
const validOpportunityTypeValues = Object.values(validOpportunityTypes);

describe("validateOpportunityType", () => {
  it("should return true for valid opportunity types", () => {
    const result = validateOpportunityType("Remote", validOpportunityTypeValues);
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity types", () => {
    const result = validateOpportunityType("Online", validOpportunityTypeValues);
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityType("", validOpportunityTypeValues);
    expect(result).toBe(false);
  });
});

describe("validateOpportunityTypeForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    const result = validateOpportunityTypeForCSV(undefined, validOpportunityTypes);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "Remote",
    });
  });

  it("should return a default error message when type is a number", () => {
    const result = validateOpportunityTypeForCSV(123, validOpportunityTypes);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "Remote",
    });
  });

  it("should return a default error message when type is invalid", () => {
    const result = validateOpportunityTypeForCSV("Invalid Type", validOpportunityTypes);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "Remote",
    });
  });

  it("should return null when type is valid", () => {
    const resultOne = validateOpportunityTypeForCSV("In person", validOpportunityTypes);
    const resultTwo = validateOpportunityTypeForCSV("In Person", validOpportunityTypes);
    const resultThree = validateOpportunityTypeForCSV("in person", validOpportunityTypes);
    const resultFour = validateOpportunityTypeForCSV("IN PERSON", validOpportunityTypes);
    const resultFive = validateOpportunityTypeForCSV("IN_PERSON", validOpportunityTypes);
    const resultSix = validateOpportunityTypeForCSV("remote", validOpportunityTypes);
    const resultSeven = validateOpportunityTypeForCSV("Remote", validOpportunityTypes);
    const resultEight = validateOpportunityTypeForCSV("REMOTE", validOpportunityTypes);
    expect(resultOne).toBeNull();
    expect(resultTwo).toBeNull();
    expect(resultThree).toBeNull();
    expect(resultFour).toBeNull();
    expect(resultFive).toBeNull();
    expect(resultSix).toBeNull();
    expect(resultSeven).toBeNull();
    expect(resultEight).toBeNull();
  });


  it("should return the correct error message when type is invalid", () => {
    const result = validateOpportunityTypeForCSV("Non-existent Type", validOpportunityTypes);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "Remote",
    });
  });
});
