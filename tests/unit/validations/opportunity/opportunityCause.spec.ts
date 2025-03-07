import { validateOpportunityCause } from '../../../../src/validations/opportunity/opportunityCause';

describe('validateOpportunityCause', () => {
    it('should return true for valid causes', () => {
        expect(validateOpportunityCause('Animal Welfare')).toBe(true);
        expect(validateOpportunityCause('Human Aid')).toBe(true);
    });

    it('should return false for invalid causes', () => {
        expect(validateOpportunityCause('Invalid Cause')).toBe(false);
        expect(validateOpportunityCause('Another Invalid Cause')).toBe(false);
    });
});
