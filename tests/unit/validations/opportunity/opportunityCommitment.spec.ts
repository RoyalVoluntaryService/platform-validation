import { validateOpportunityCommitment } from '../../../../src/validations/opportunity/opportunityCommitment';

describe('validateOpportunityCommitment', () => {
    it('should return true for valid commitments', () => {
        expect(validateOpportunityCommitment('full time')).toBe(true);
        expect(validateOpportunityCommitment('part time')).toBe(true);
    });

    it('should return false for invalid commitments', () => {
        expect(validateOpportunityCommitment('freelance')).toBe(false);
        expect(validateOpportunityCommitment('')).toBe(false);
    });
});
