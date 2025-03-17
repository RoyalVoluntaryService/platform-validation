import { validateOpportunityCommitment, validateOpportunityCommitmentForCSV } from "../../../../src/validations/opportunity/opportunityCommitment";

const validCommitments = {
  "FLEXIBLE": "Flexible",
  "REGULAR": "Regular",
}
const validCommitmentValues = Object.values(validCommitments);

describe("validateOpportunityCommitment", () => {
  it("should return true for valid opportunity commitments", () => {
    const result = validateOpportunityCommitment("Flexible", validCommitmentValues);
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity commitments", () => {
    const result = validateOpportunityCommitment("Online", validCommitmentValues);
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = validateOpportunityCommitment("", validCommitmentValues);
    expect(result).toBe(false);
  });
});

describe("validateOpportunityCommitmentForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    const result = validateOpportunityCommitmentForCSV(undefined, validCommitments);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Flexible",
    });
  });

  it("should return a default error message when type is a number", () => {
    const result = validateOpportunityCommitmentForCSV(123, validCommitments);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Flexible",
    });
  });

  it("should return a default error message when type is invalid", () => {
    const result = validateOpportunityCommitmentForCSV("Invalid Type", validCommitments);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Flexible",
    });
  });

  it("should return null when type is valid", () => {
    const resultOne = validateOpportunityCommitmentForCSV("Regular", validCommitments);
    const resultTwo = validateOpportunityCommitmentForCSV("regular", validCommitments);
    const resultThree = validateOpportunityCommitmentForCSV("REGULAR", validCommitments);
    const resultFour = validateOpportunityCommitmentForCSV("Flexible", validCommitments);
    const resultFive = validateOpportunityCommitmentForCSV("flexible", validCommitments);
    const resultSix = validateOpportunityCommitmentForCSV("FLEXIBLE", validCommitments);
    expect(resultOne).toBeNull();
    expect(resultTwo).toBeNull();
    expect(resultThree).toBeNull();
    expect(resultFour).toBeNull();
    expect(resultFive).toBeNull();
    expect(resultSix).toBeNull();
  });
  

  it("should return the correct error message when type is invalid", () => {
    const result = validateOpportunityCommitmentForCSV("Non-existent Type", validCommitments);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity commitment should be one of: Flexible, Regular",
      newValue: "Flexible",
    });
  });
});
