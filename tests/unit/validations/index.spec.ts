import * as validationExports from '../../../src/validations/index';

describe('Validation barrel file exports', () => {
    test('should export all expected modules', () => {
        expect(validationExports).toHaveProperty('validateOpportunityCause');
        expect(validationExports).toHaveProperty('validateOpportunityCauseForCSV');
        expect(validationExports).toHaveProperty('validateOpportunityCommitment');
        expect(validationExports).toHaveProperty('validateOpportunityCommitmentForCSV');
        expect(validationExports).toHaveProperty('validateOpportunityStatus');
        expect(validationExports).toHaveProperty('validateOpportunityStatusForCSV');
        expect(validationExports).toHaveProperty('validateOpportunityType');
        expect(validationExports).toHaveProperty('validateOpportunityTypeForCSV');
        expect(validationExports).toHaveProperty('validateCsvRowDataAndReturnErrors');
        expect(validationExports).toHaveProperty('validateBoolean');
        expect(validationExports).toHaveProperty('validateBooleanForCSV');

    });
});
