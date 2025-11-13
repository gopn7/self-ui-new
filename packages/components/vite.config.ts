import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: 
    [react(), dts({
      outDir: '../../dist/components', // 类型文件输出到和 JS 产物同一目录
      include: ['components/**/*'], // 要生成类型的目录（根据你的源码路径调整）
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'], // 排除 Story 文件，不生成其类型
    })],
  
  build: {
    outDir: path.resolve(__dirname, '../../dist/components'),
    lib: {
      entry: path.resolve(__dirname, 'index.tsx'), // 组件库入口
      formats: ['es', 'cjs'], // 输出 ES Module + CommonJS 格式
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 声明外部依赖（避免打包进组件库，由使用者项目安装）
      external: ['react', 'react-dom', 'classnames', '@fortawesome/*', 'react-transition-group'],
      output: {
        globals: { // UMD 格式的全局变量映射
          react: 'React',
          'react-dom': 'ReactDOM',
          classnames: 'classNames'
        }
      }
    }
  },
  resolve: {
    alias: {
    '@components': path.resolve(__dirname, ''), // 根路径别名
    '@hooks': path.resolve(__dirname, 'hooks'), // hooks目录别名
    '@styles': path.resolve(__dirname, 'styles'), // styles目录别名
    }
  }
});
