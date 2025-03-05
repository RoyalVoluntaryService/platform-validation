import { OpportunityType } from "@prisma/client";
import { validateOpportunityType, validateOpportunityTypeForCSV } from "../../../../src/validations/opportunity/opportunityType";
import { getAllHumanCase, toHumanString, toSentenceCase } from "../../../../src/utils/string";

// Mock the utility functions for consistency in tests
jest.mock("../../../../src/utils/string", () => ({
  getAllHumanCase: jest.fn(),
  toHumanString: jest.fn(),
  toSentenceCase: jest.fn(),
}));

describe("validateOpportunityType", () => {
  it("should return true for valid opportunity types", () => {
    const validType = "In Person"; // Mocked return from getAllHumanCase
    (getAllHumanCase as jest.Mock).mockReturnValue([validType]);

    const result = validateOpportunityType("In Person");
    expect(result).toBe(true);
  });

  it("should return false for invalid opportunity types", () => {
    const invalidType = "Online"; // Mocked return from getAllHumanCase
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);

    const result = validateOpportunityType(invalidType);
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);
    const result = validateOpportunityType("");
    expect(result).toBe(false);
  });
});

describe("validateOpportunityTypeForCSV", () => {
  it("should return a default error message when type is undefined", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);
    (toHumanString as jest.Mock).mockReturnValue("In Person");
    (toSentenceCase as jest.Mock).mockReturnValue("In person");

    const result = validateOpportunityTypeForCSV();
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: In Person, Remote",
      newValue: "In person",
    });
  });

  it("should return a default error message when type is a number", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);
    (toHumanString as jest.Mock).mockReturnValue("In Person");
    (toSentenceCase as jest.Mock).mockReturnValue("In person");

    const result = validateOpportunityTypeForCSV(123);
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: In Person, Remote",
      newValue: "In person",
    });
  });

  it("should return a default error message when type is invalid", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);
    (toHumanString as jest.Mock).mockReturnValue("In Person");
    (toSentenceCase as jest.Mock).mockReturnValue("In person");

    const result = validateOpportunityTypeForCSV("Invalid Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: In Person, Remote",
      newValue: "In person",
    });
  });

  it("should return null when type is valid", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person"]);
    (toHumanString as jest.Mock).mockReturnValue("In Person");
    (toSentenceCase as jest.Mock).mockReturnValue("In person");

    const result = validateOpportunityTypeForCSV("In Person");
    expect(result).toBeNull();
  });

  it("should return the correct error message when type is invalid", () => {
    (getAllHumanCase as jest.Mock).mockReturnValue(["In Person", "Online", "Hybrid"]);
    (toHumanString as jest.Mock).mockReturnValue("In Person");
    (toSentenceCase as jest.Mock).mockReturnValue("In person");

    const result = validateOpportunityTypeForCSV("Non-existent Type");
    expect(result).toEqual({
      level: "healing",
      message: "Opportunity type should be one of: In Person, Remote",
      newValue: "In person",
    });
  });
});
