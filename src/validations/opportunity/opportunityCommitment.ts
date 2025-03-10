import { OpportunityCommitment } from "@prisma/client";
import { getAllValidCase, toHumanString, toSentenceCase } from "../../utils/string";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";

const DEFAULT_OPPORTUNITY_COMMITMENT = OpportunityCommitment.REGULAR;

export const POSSIBLE_OPPORTUNITY_COMMITMENTS = Object.values(OpportunityCommitment).map(type => toSentenceCase(toHumanString(type)));

export const validateOpportunityCommitment = (type: string): boolean => Object.values(OpportunityCommitment).map((val) => getAllValidCase(val)).flat().includes(type)


export const validateOpportunityCommitmentForCSV = (type?: string | number | null): null | CsvValidatorResponse => {
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
    const isValidCase = validateOpportunityCommitment(type)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};