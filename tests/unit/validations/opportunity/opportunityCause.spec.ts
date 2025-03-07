jest.mock('../../../../src/services/prisma', () => {
    const prisma = {
        cause: {
            findMany: jest.fn()
        }
    };
    return { prisma: prisma };
});


import { prisma } from '../../../../src/services/prisma';
import { validateOpportunityCause, validateOpportunityCauseForCSV } from '../../../../src/validations/opportunity/opportunityCause';

describe('validateOpportunityCause - no database data', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return validation response for invalid causes - none', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([]);
        const response = await validateOpportunityCauseForCSV('Invalid Cause');
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

    it('should return true for valid causes', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        expect(await validateOpportunityCause('Animal Welfare')).toBe(true);
        expect(await validateOpportunityCause('Human Aid')).toBe(true);
    });

    it('should return false for invalid causes', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        expect(await validateOpportunityCause('Invalid Cause')).toBe(false);
        expect(await validateOpportunityCause('Another Invalid Cause')).toBe(false);
    });
});

describe('validateOpportunityCauseForCSV', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return null for valid causes', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        expect(await validateOpportunityCauseForCSV('Animal Welfare')).toBe(null);
        expect(await validateOpportunityCauseForCSV('Human Aid')).toBe(null);
    });

    it('should return validation response for invalid causes - string', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const response = await validateOpportunityCauseForCSV('Invalid Cause');
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });

    it('should return validation response for invalid causes - number', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const response = await validateOpportunityCauseForCSV(123);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });

    it('should return validation response for invalid causes - null', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const response = await validateOpportunityCauseForCSV(null);
        expect(response).toEqual({
            level: 'healing',
            message: 'Opportunity Cause should be one of: Animal Welfare, Human Aid',
            newValue: 'Animal welfare'
        });
    });
});


