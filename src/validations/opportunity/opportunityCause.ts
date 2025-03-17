import type { CsvCauseInput, CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";
import { toSentenceCase, toHumanString } from "../../utils/string";


export const validateOpportunityCause = <T extends CsvCauseInput>(cause: string, causes: T[]): boolean => {
    return causes.map(cause => cause.causeName).includes(cause);
};

export const validateOpportunityCauseForCSV = <T extends CsvCauseInput>(type: string | number | null | undefined, causes: T[]): null | CsvValidatorResponse => {


    const toReturn = (): CsvValidatorResponse => {
        return getCsvValidationResponse(
            "healing",
            "Opportunity Cause should be one of: " + causes.map(cause => cause.causeName).join(', '),
            toSentenceCase(toHumanString(causes[0]?.causeName ?? "None set"))
        )
    }
    if (!type || typeof type === "number") {
        return toReturn()
    }
    const isValidCase = validateOpportunityCause<T>(type, causes)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};