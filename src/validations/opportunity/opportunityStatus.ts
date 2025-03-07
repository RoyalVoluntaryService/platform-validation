import { RecordState } from "@prisma/client";
import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import { getCsvValidationResponse } from "../../utils/csvValidation";
import type { CsvValidatorResponse } from "../../types/csvValidation";

const DEFAULT_RECORD_STATE = RecordState.INACTIVE;

export const POSSIBLE_RECORD_STATES = Object.values(RecordState).map(type => toSentenceCase(toHumanString(type)));

export const validateOpportunityStatus = (type: string): boolean => Object.values(RecordState).map((val) => getAllValidCase(val)).flat().includes(type)


export const validateOpportunityStatusForCSV = (type?: string | number | null): null | CsvValidatorResponse => {
    function toReturn(): CsvValidatorResponse {
        return getCsvValidationResponse(
            "healing",
            "Opportunity Status should be one of: " + POSSIBLE_RECORD_STATES.join(', '),
            toSentenceCase(toHumanString(DEFAULT_RECORD_STATE))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityStatus(type)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};

