
import { validateCsvRowDataAndReturnErrors } from "../../../../src/validations/opportunity/validateOpportunityCsvRow";
import { CsvValidatorImportValue } from "../../../../src/types/csvValidation";
const exampleCauses = [
    { causeName: 'Animal Welfare' },
    { causeName: 'Human Aid' }
]
describe('validateDataAndReturnErrors', () => {
    it('should return null when there are no errors', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue,
            {
                causes: exampleCauses
            }
        );
        expect(result).toBeNull();
    });

    it('should return errors for invalid opportunity type', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "Something Else" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue,
            {
                causes: exampleCauses
            }
        );
        expect(result).toHaveProperty('opportunityType');
    });

    it('should return errors for invalid opportunity status', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Regular" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "None" as CsvValidatorImportValue,
            {
                causes: exampleCauses
            }
        );
        expect(result).toHaveProperty('status');
    });

    it('should return errors for invalid opportunity status', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Not A Cause" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue,
            {
                causes: exampleCauses
            }
        );
        expect(result).toHaveProperty('cause');
    });

    it('should return errors for invalid opportunity commitment', () => {
        const result = validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Never" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue,
            {
                causes: exampleCauses
            }
        );
        expect(result).toHaveProperty('commitment');
    });
});
