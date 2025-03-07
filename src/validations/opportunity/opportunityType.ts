import { OpportunityType } from "@prisma/client";
import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";

const DEFAULT_OPPORTUNITY_TYPE = OpportunityType.IN_PERSON;

export const POSSIBLE_OPPORTUNITY_TYPES = Object.values(OpportunityType).map(type => toSentenceCase(toHumanString(type)));

export const validateOpportunityType = (type: string): boolean => Object.values(OpportunityType).map((val) => getAllValidCase(val)).flat().includes(type)


export const validateOpportunityTypeForCSV = (type?: string | number | null): null | CsvValidatorResponse => {
    function toReturn(): CsvValidatorResponse {
        return getCsvValidationResponse(
            "healing",
            "Opportunity type should be one of: " + POSSIBLE_OPPORTUNITY_TYPES.join(', '), // error message
            toSentenceCase(toHumanString(DEFAULT_OPPORTUNITY_TYPE))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityType(type)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};

