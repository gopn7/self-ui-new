import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from "path"

import { fileURLToPath } from "url"
/** @type { import('@storybook/react-vite').StorybookConfig } */
/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
import { createRequire } from "module"

// function getAbsolutePath(value: string): any {
//   return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
// }

function getAbsolutePath(value: string): any {
 const require = createRequire(import.meta.url)
  try {
    // 优先解析 package.json（普通包）
    return dirname(require.resolve(`${value}/package.json`))
  } catch {
    // 对于子路径（如 'react/jsx-runtime'），直接解析模块入口文件
    return require.resolve(value)
  }
}
const config: StorybookConfig = {
  "stories": [
   '../../components/**/components/**/*.stories.@(tsx|ts|jsx|js)',
    '../../components/**/components/**/*.mdx',
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },
  viteFinal: async (viteConfig:any) => {
    // 确保 monorepo 中只使用一个 react / react-dom / jsx-runtime 实例
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = [
      ...(viteConfig.resolve.alias || []),
      { find: 'react', replacement: getAbsolutePath('react') },
      { find: 'react-dom', replacement: getAbsolutePath('react-dom') },
      { find: 'react/jsx-runtime', replacement: getAbsolutePath('react/jsx-runtime') },
    ];
    return viteConfig;
  },
    typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop:any) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
export default config;
