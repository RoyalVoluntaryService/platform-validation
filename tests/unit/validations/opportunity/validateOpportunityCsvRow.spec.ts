import { validateDataAndReturnErrors } from "../../../../src/validations/opportunity/validateOpportunityCsvRow";
import { CsvValidatorImportValue } from "../../../../src/types/csvValidation";

describe('validateDataAndReturnErrors', () => {
    it('should return null when there are no errors', () => {
        const result = validateDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "COMMITMENT" as CsvValidatorImportValue,
            "CAUSE" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toBeNull();
    });

    it('should return errors for invalid opportunity type', () => {
        const result = validateDataAndReturnErrors(
            "Something Else" as CsvValidatorImportValue,
            "COMMITMENT" as CsvValidatorImportValue,
            "CAUSE" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('opportunityType');
    });

    it('should return errors for invalid opportunity status', () => {
        const result = validateDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "COMMITMENT" as CsvValidatorImportValue,
            "CAUSE" as CsvValidatorImportValue,
            "None" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('opportunityStatus');
    });

    // Add more tests as needed
});
