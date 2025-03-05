import { OpportunityType } from "@prisma/client";
import { validateOpportunityType, validateOpportunityTypeForCSV } from "../../../../src/validations/opportunity/opportunityType";
import { getAllHumanCase, toHumanString, toSentenceCase } from "../../../../src/utils/string";

// Remove the mocks for the utility functions
// jest.mock("../../../../src/utils/string", () => ({
//   getAllHumanCase: jest.fn(),
//   toHumanString: jest.fn(),
//   toSentenceCase: jest.fn(),
// }));

describe("validateOpportunityType", () => {
  it("should return true for valid opportunity types", () => {
    const result = validateOpportunityType("Remote");
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity types", () => {
    const result = validateOpportunityType("Online");
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityType("");
    expect(result).toBe(false);
  });
});

describe("validateOpportunityTypeForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    const result = validateOpportunityTypeForCSV();
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "In person",
    });
  });

  it("should return a default error message when type is a number", () => {
    const result = validateOpportunityTypeForCSV(123);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "In person",
    });
  });

  it("should return a default error message when type is invalid", () => {
    const result = validateOpportunityTypeForCSV("Invalid Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "In person",
    });
  });

  it("should return null when type is valid", () => {
    const result = validateOpportunityTypeForCSV("In person");
    expect(result).toBeNull();
  });

  it("should return the correct error message when type is invalid", () => {
    const result = validateOpportunityTypeForCSV("Non-existent Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: Remote, In person",
      newValue: "In person",
    });
  });
});
