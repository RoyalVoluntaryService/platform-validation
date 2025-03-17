import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";


export const validateOpportunityType = (type: string, values: string[]): boolean => values.map((val) => getAllValidCase(val)).flat().includes(type)


export const validateOpportunityTypeForCSV = (type: string | number | null | undefined, opportunityTypes: Record<string, string>): null | CsvValidatorResponse => {
    const OPPORTUNITY_TYPES_VALUES = Object.values(opportunityTypes);
    const DEFAULT_OPPORTUNITY_TYPE = OPPORTUNITY_TYPES_VALUES[0];
    const POSSIBLE_OPPORTUNITY_TYPES = OPPORTUNITY_TYPES_VALUES.map(type => toSentenceCase(toHumanString(type)));
    
    const toReturn = (): CsvValidatorResponse => {
        return getCsvValidationResponse(
            "healing",
            "Opportunity type should be one of: " + POSSIBLE_OPPORTUNITY_TYPES.join(', '), // error message
            toSentenceCase(toHumanString(DEFAULT_OPPORTUNITY_TYPE))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityType(type, OPPORTUNITY_TYPES_VALUES)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};

