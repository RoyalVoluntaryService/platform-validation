jest.mock('../../../../src/services/prisma', () => {
    const prisma = {
        cause: {
            findMany: jest.fn()
        }
    };
    return { prisma: prisma };
});


import { prisma } from '../../../../src/services/prisma';
import { validateCsvRowDataAndReturnErrors } from "../../../../src/validations/opportunity/validateOpportunityCsvRow";
import { CsvValidatorImportValue } from "../../../../src/types/csvValidation";

describe('validateDataAndReturnErrors', () => {
    it('should return null when there are no errors', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const result = await validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toBeNull();
    });

    it('should return errors for invalid opportunity type', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const result = await validateCsvRowDataAndReturnErrors(
            "Something Else" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('opportunityType');
    });

    it('should return errors for invalid opportunity status', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const result = await validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Regular" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "None" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('status');
    });

    it('should return errors for invalid opportunity status', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const result = await validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Flexible" as CsvValidatorImportValue,
            "Not A Cause" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('cause');
    });

    it('should return errors for invalid opportunity commitment', async () => {
        (prisma.cause.findMany as jest.Mock).mockResolvedValue([
            { causeName: 'Animal Welfare' },
            { causeName: 'Human Aid' }
        ]);
        const result = await validateCsvRowDataAndReturnErrors(
            "In Person" as CsvValidatorImportValue,
            "Never" as CsvValidatorImportValue,
            "Animal Welfare" as CsvValidatorImportValue,
            "Active" as CsvValidatorImportValue
        );
        expect(result).toHaveProperty('commitment');
    });
});
