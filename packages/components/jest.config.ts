import type { Config } from 'jest';
// 修正相对路径 - 根据文件结构应该是 '../../jest.config'
import baseConfig from '../../jest.config';

const config: Config = {
  ...baseConfig,
  rootDir: '.',
  displayName: 'components',
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default config;