import { OpportunityType } from "@prisma/client";
import { getAllHumanCase, toHumanString, toSentenceCase } from "../../utils/string";

const DEFAULT_OPPORTUNITY_TYPE = OpportunityType.IN_PERSON;

export const POSSIBLE_OPPORTUNITY_TYPES = [
    // toSentenceCase(toHumanString(OpportunityType.IN_PERSON.toString())),
    // toSentenceCase(toHumanString(OpportunityType.REMOTE.toString())),
    "In Person",
    "Remote",
]

export const validateOpportunityType = (type: string): boolean => {
    return Object.values(OpportunityType).map((val) => getAllHumanCase(val)).flat().includes(type)
};

export const validateOpportunityTypeForCSV = (type?: string | number | null) => {
    console.log(POSSIBLE_OPPORTUNITY_TYPES)
    function toReturn() {
        return {
            level: "healing",
            message: "Opportunity type should be one of: " + POSSIBLE_OPPORTUNITY_TYPES.join(', '), // error message
            newValue: toSentenceCase(toHumanString(DEFAULT_OPPORTUNITY_TYPE))
        }
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

