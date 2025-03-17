
import { validateCsvRowDataAndReturnErrors } from "../../../../src/validations/opportunity/validateOpportunityCsvRow";
import { CsvValidatorImportValue } from "../../../../src/types/csvValidation";
const exampleCauses = [
    { causeName: 'Animal Welfare' },
    { causeName: 'Human Aid' }
]

const exampleOpportunityTypes = {
    "REMOTE": "Remote",
    "IN_PERSON": "In person",
}

const exampleCommitments = {
    "FLEXIBLE": "Flexible",
    "REGULAR": "Regular",
}

const exampleStatuses = {
    "ACTIVE": "Active",
    "INACTIVE": "Inactive",
}

const validCsvRowData = {
    opportunityType: "In Person" as CsvValidatorImportValue,
    commitment: "Flexible" as CsvValidatorImportValue,
    cause: "Animal Welfare" as CsvValidatorImportValue,
    status: "Active" as CsvValidatorImportValue,
    dbsCheck: "true" as CsvValidatorImportValue,
    trainingRequired: "false" as CsvValidatorImportValue,
    inputData: {
        causes: exampleCauses,
        commitments: exampleCommitments,
        opportunityTypes: exampleOpportunityTypes,
        statuses: exampleStatuses
    }
}

describe('validateDataAndReturnErrors', () => {
    it('should return null when there are no errors', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            validCsvRowData.commitment,
            validCsvRowData.cause,
            validCsvRowData.status,
            validCsvRowData.dbsCheck,
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toBeNull();
    });

    it('should return errors for invalid opportunity type', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "Something Else" as CsvValidatorImportValue,
            validCsvRowData.commitment,
            validCsvRowData.cause,
            validCsvRowData.status,
            validCsvRowData.dbsCheck,
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('opportunityType');
    });

    it('should return errors for invalid opportunity status', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            validCsvRowData.commitment,
            validCsvRowData.cause,
            "Regular" as CsvValidatorImportValue,
            validCsvRowData.dbsCheck,
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('status');
    });

    it('should return errors for invalid opportunity status', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            validCsvRowData.commitment,
            "Not A Cause" as CsvValidatorImportValue,
            validCsvRowData.status,
            validCsvRowData.dbsCheck,
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('cause');
    });

    it('should return errors for invalid opportunity commitment', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            "Never" as CsvValidatorImportValue,
            validCsvRowData.cause,
            validCsvRowData.status,
            validCsvRowData.dbsCheck,
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('commitment');
    });

    it('should return errors for invalid opportunity dbsCheck', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            validCsvRowData.commitment,
            validCsvRowData.cause,
            validCsvRowData.status,
            "Dont Think So",
            validCsvRowData.trainingRequired,
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('dbsCheck');
    });

    it('should return errors for invalid opportunity trainingRequired', () => {
        const result = validateCsvRowDataAndReturnErrors(
            validCsvRowData.opportunityType,
            validCsvRowData.commitment,
            validCsvRowData.cause,
            validCsvRowData.status,
            validCsvRowData.dbsCheck,
            "Dont Think So",
            validCsvRowData.inputData
        );
        expect(result).toHaveProperty('trainingRequired');
    });
});
