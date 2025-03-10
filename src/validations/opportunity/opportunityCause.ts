import { Cause } from "@prisma/client";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";
import { toSentenceCase, toHumanString } from "../../utils/string";


export const validateOpportunityCause = (cause: string, causes: Pick<Cause, 'causeName'>[]): boolean => {
    return causes.map(cause => cause.causeName).includes(cause);
};

export const validateOpportunityCauseForCSV = (type: string | number | null | undefined, causes: Pick<Cause, 'causeName'>[]): null | CsvValidatorResponse => {


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
    const isValidCase = validateOpportunityCause(type, causes)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};