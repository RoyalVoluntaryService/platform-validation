import { prisma } from "../../../src/services/prisma";

describe('Prisma Service', () => {
    it('should create a PrismaClient instance', () => {
        expect(prisma).toBeDefined();
        expect(prisma).toBeInstanceOf(Object);
    });
});
