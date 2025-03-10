import { validateOpportunityCommitment, validateOpportunityCommitmentForCSV } from "../../../../src/validations/opportunity/opportunityCommitment";

// Remove the mocks for the utility functions
// jest.mock("../../../../src/utils/string", () => ({
//   getAllValidCase: jest.fn(),
//   toHumanString: jest.fn(),
//   toSentenceCase: jest.fn(),
// }));

describe("validateOpportunityCommitment", () => {
  it("should return true for valid opportunity commitments", () => {
    const result = validateOpportunityCommitment("Flexible");
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity commitments", () => {
    const result = validateOpportunityCommitment("Online");
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityCommitment("");
    expect(result).toBe(false);
  });
});

describe("validateOpportunityCommitmentForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    const result = validateOpportunityCommitmentForCSV();
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Regular",
    });
  });

  it("should return a default error message when type is a number", () => {
    const result = validateOpportunityCommitmentForCSV(123);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Regular",
    });
  });

  it("should return a default error message when type is invalid", () => {
    const result = validateOpportunityCommitmentForCSV("Invalid Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Regular",
    });
  });

  it("should return null when type is valid", () => {
    const resultOne = validateOpportunityCommitmentForCSV("Regular");
    const resultTwo = validateOpportunityCommitmentForCSV("regular");
    const resultThree = validateOpportunityCommitmentForCSV("REGULAR");
    const resultFour = validateOpportunityCommitmentForCSV("Flexible");
    const resultFive = validateOpportunityCommitmentForCSV("flexible");
    const resultSix = validateOpportunityCommitmentForCSV("FLEXIBLE");
    expect(resultOne).toBeNull();
    expect(resultTwo).toBeNull();
    expect(resultThree).toBeNull();
    expect(resultFour).toBeNull();
    expect(resultFive).toBeNull();
    expect(resultSix).toBeNull();
  });
  

  it("should return the correct error message when type is invalid", () => {
    const result = validateOpportunityCommitmentForCSV("Non-existent Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Regular",
    });
  });
});
