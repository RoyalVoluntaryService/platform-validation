import type { CsvValidatorResponse, CsvValidatorResponseLevel } from "../types/csvValidation";

export const getCsvValidationResponse = (level: CsvValidatorResponseLevel, message: string, newValue: string): CsvValidatorResponse => {
    return {
        level,
        message,
        newValue
    }
};