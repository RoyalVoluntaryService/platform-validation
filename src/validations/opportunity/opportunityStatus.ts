import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import { getCsvValidationResponse } from "../../utils/csvValidation";
import type { CsvValidatorResponse } from "../../types/csvValidation";


export const validateOpportunityStatus = (type: string, values: string[]): boolean => values.map((val) => getAllValidCase(val)).flat().includes(type)

export const validateOpportunityStatusForCSV = (type: string | number | null | undefined, opportunityStatuses: Record<string, string>): null | CsvValidatorResponse => {
    const RECORD_STATE_VALUES = Object.values(opportunityStatuses);
    const DEFAULT_RECORD_STATE = RECORD_STATE_VALUES[0];
    const POSSIBLE_RECORD_STATES = RECORD_STATE_VALUES.map(type => toSentenceCase(toHumanString(type)));

    const toReturn = (): CsvValidatorResponse => {
        return getCsvValidationResponse(
            "healing",
            "Opportunity Status should be one of: " + POSSIBLE_RECORD_STATES.join(', '),
            toSentenceCase(toHumanString(DEFAULT_RECORD_STATE))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityStatus(type, RECORD_STATE_VALUES)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};

