/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    projects: [
      {
        plugins: [
          storybookTest({
            configDir: path.join(dirname, 'packages/docs-site/.storybook'), // 明确指向docs-site的Storybook配置目录
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['packages/docs-site/.storybook/vitest.setup.ts'], // 明确指向docs-site的初始化脚本
        },
      },
    ],
  },
});