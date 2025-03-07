
import { validateOpportunityStatus, validateOpportunityStatusForCSV } from "../../../../src/validations/opportunity/opportunityStatus";


describe("validateOpportunityStatus", () => {
  it("should return true for valid opportunity status", () => {
    const result = validateOpportunityStatus("ACTIVE");
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity status", () => {
    const result = validateOpportunityStatus("SOMETHING_ELSE");
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityStatus("");
    expect(result).toBe(false);
  });
});

describe("validateOpportunityStatusForCSV", () => {
  it("should return a default error message when status is undefined", () => {
    const result = validateOpportunityStatusForCSV();
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Inactive",
    });
  });

  it("should return a default error message when status is a number", () => {
    const result = validateOpportunityStatusForCSV(123);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Inactive",
    });
  });

  it("should return a default error message when status is invalid", () => {
    const result = validateOpportunityStatusForCSV("Invalid Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Inactive",
    });
  });

  it("should return null when status is valid", () => {
    const resultOne = validateOpportunityStatusForCSV("ACTIVE");
    const resultTwo = validateOpportunityStatusForCSV("Active");
    const resultThree = validateOpportunityStatusForCSV("active");
    const resultFour = validateOpportunityStatusForCSV("INACTIVE");
    const resultFive = validateOpportunityStatusForCSV("Inactive");
    const resultSix = validateOpportunityStatusForCSV("inactive");
    expect(resultOne).toBeNull();
    expect(resultTwo).toBeNull();
    expect(resultThree).toBeNull();
    expect(resultFour).toBeNull();
    expect(resultFive).toBeNull();
    expect(resultSix).toBeNull();
  });
  

  it("should return the correct error message when status is invalid", () => {
    const result = validateOpportunityStatusForCSV("Non-existent Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Inactive",
    });
  });
});
