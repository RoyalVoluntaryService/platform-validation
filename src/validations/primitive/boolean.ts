import { toHumanString, toSentenceCase } from "../../utils/string";
import type { CsvValidatorResponse } from "../../types/csvValidation";
import { getCsvValidationResponse } from "../../utils/csvValidation";

const booleanData = {
    "true": [
        1,
        "1",
        "true",
        "True",
        "TRUE",
        "yes",
        "Yes",
        "YES"
    ],
    "false": [
        0,
        "0",
        "false",
        "False",
        "FALSE",
        "no",
        "No",
        "NO"
    ]
}
const possibleBooleans = [
    ...booleanData["true"],
    ...booleanData["false"]
]

const possibleBooleansToReturn = Object.keys(booleanData)

const DEFAULT_BOOLEAN = possibleBooleansToReturn[0];

export const validateBoolean = (type: string | number): boolean => possibleBooleans.includes(type)

export const validateBooleanForCSV = (type?: string | number | null): null | CsvValidatorResponse => {
    const toReturn = (): CsvValidatorResponse => {
        return getCsvValidationResponse(
            "healing",
            "Opportunity commitment should be one of: " + possibleBooleansToReturn.map(val => toSentenceCase(val)).join(', '),
            toSentenceCase(toHumanString(DEFAULT_BOOLEAN))
        )
    }
    if (!type && type !== 0) {
        return toReturn()
    }
    const isValidCase = validateBoolean(type)
    if (!isValidCase) {
        return toReturn()
    }
    return null
};