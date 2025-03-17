import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";


export const validateOpportunityCommitment = (type: string, values: string[]): boolean => values.map((val) => getAllValidCase(val)).flat().includes(type)


export const validateOpportunityCommitmentForCSV = (type: string | number | null | undefined, opportunityCommitments: Record<string, string>): null | CsvValidatorResponse => {
    const OPPORTUNITY_COMMITMENT_VALUES = Object.values(opportunityCommitments);
    const DEFAULT_OPPORTUNITY_COMMITMENT = OPPORTUNITY_COMMITMENT_VALUES[0];
    const POSSIBLE_OPPORTUNITY_COMMITMENTS = OPPORTUNITY_COMMITMENT_VALUES.map(type => toSentenceCase(toHumanString(type)));
    
    const toReturn = (): CsvValidatorResponse => {
        return getCsvValidationResponse(
            "healing",
            "Opportunity commitment should be one of: " + POSSIBLE_OPPORTUNITY_COMMITMENTS.join(', '), // error message
            toSentenceCase(toHumanString(DEFAULT_OPPORTUNITY_COMMITMENT))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityCommitment(type, OPPORTUNITY_COMMITMENT_VALUES)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};