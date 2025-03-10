import { validateOpportunityCause, validateOpportunityCauseForCSV } from '../../../../src/validations/opportunity/opportunityCause';

const exampleCauses = [
    { causeName: 'Animal Welfare' },
    { causeName: 'Human Aid' }
]

describe('validateOpportunityCause - no database data', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return validation response for invalid causes - none', async () => {
        
        const response = await validateOpportunityCauseForCSV('Invalid Cause', []);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: ',
            newValue: 'None set'
        });
    });
});


describe('validateOpportunityCause', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return true for valid causes', () => {
        expect(validateOpportunityCause('Animal Welfare', exampleCauses)).toBe(true);
        expect(validateOpportunityCause('Human Aid', exampleCauses)).toBe(true);
    });

    it('should return false for invalid causes', () => {
        expect(validateOpportunityCause('Invalid Cause', exampleCauses)).toBe(false);
        expect(validateOpportunityCause('Another Invalid Cause', exampleCauses)).toBe(false);
    });
});

describe('validateOpportunityCauseForCSV', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return null for valid causes', () => {
        expect(validateOpportunityCauseForCSV('Animal Welfare', exampleCauses)).toBe(null);
        expect(validateOpportunityCauseForCSV('Human Aid', exampleCauses)).toBe(null);
    });

    it('should return validation response for invalid causes - string', () => {
        const response = validateOpportunityCauseForCSV('Invalid Cause', exampleCauses);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });

    it('should return validation response for invalid causes - number', () => {
        const response = validateOpportunityCauseForCSV(123, exampleCauses);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });

    it('should return validation response for invalid causes - null', () => {
        const response = validateOpportunityCauseForCSV(null, exampleCauses);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });
});


