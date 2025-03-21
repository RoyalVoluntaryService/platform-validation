/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    coverageReporters: ['html', 'text-summary'],
    collectCoverageFrom: ['src/**/*.ts'],
    reporters: [
      'default',
      [
        'jest-html-reporter',
        {
          pageTitle: 'Test Report',
          outputPath: './coverage/report.html',
        },
      ],
    ]
  };
