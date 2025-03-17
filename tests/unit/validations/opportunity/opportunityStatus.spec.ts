
import { validateOpportunityStatus, validateOpportunityStatusForCSV } from "../../../../src/validations/opportunity/opportunityStatus";

const validStatuses = {
  "ACTIVE": "Active",
  "INACTIVE": "Inactive",
}
const validStatusValues = Object.values(validStatuses);

describe("validateOpportunityStatus", () => {
  it("should return true for valid opportunity status", () => {
    const result = validateOpportunityStatus("ACTIVE", validStatusValues);
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity status", () => {
    const result = validateOpportunityStatus("SOMETHING_ELSE", validStatusValues);
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityStatus("", validStatusValues);
    expect(result).toBe(false);
  });
});

describe("validateOpportunityStatusForCSV", () => {
  it("should return a default error message when status is undefined", () => {
    const result = validateOpportunityStatusForCSV(undefined, validStatuses);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Active",
    });
  });

  it("should return a default error message when status is a number", () => {
    const result = validateOpportunityStatusForCSV(123, validStatuses);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Active",
    });
  });

  it("should return a default error message when status is invalid", () => {
    const result = validateOpportunityStatusForCSV("Invalid Type", validStatuses);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Active",
    });
  });

  it("should return null when status is valid", () => {
    const resultOne = validateOpportunityStatusForCSV("ACTIVE", validStatuses);
    const resultTwo = validateOpportunityStatusForCSV("Active", validStatuses);
    const resultThree = validateOpportunityStatusForCSV("active", validStatuses);
    const resultFour = validateOpportunityStatusForCSV("INACTIVE", validStatuses);
    const resultFive = validateOpportunityStatusForCSV("Inactive", validStatuses);
    const resultSix = validateOpportunityStatusForCSV("inactive", validStatuses);
    expect(resultOne).toBeNull();
    expect(resultTwo).toBeNull();
    expect(resultThree).toBeNull();
    expect(resultFour).toBeNull();
    expect(resultFive).toBeNull();
    expect(resultSix).toBeNull();
  });
  

  it("should return the correct error message when status is invalid", () => {
    const result = validateOpportunityStatusForCSV("Non-existent Type", validStatuses);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity Status should be one of: Active, Inactive",
      newValue: "Active",
    });
  });
});
