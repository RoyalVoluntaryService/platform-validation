export type CsvValidatorImportValue = string | number | null;

export type CsvValidatorResponseLevel = "error" | "info" | "healing";

export type CsvValidatorResponse = {
    level: CsvValidatorResponseLevel;
    message: string;
    newValue: string;
}

export type CsvCauseInput = {
    causeName: string;
}