import * as allExports from '../../src';

describe('Validation barrel file exports', () => {
    test('should export all expected modules', () => {
        expect(allExports).toHaveProperty('toHumanString');
        expect(allExports).toHaveProperty('validateOpportunityCause');
    });
});
