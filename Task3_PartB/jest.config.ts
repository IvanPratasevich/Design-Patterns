export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'], // вместо ['<rootDir>/tests']
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
