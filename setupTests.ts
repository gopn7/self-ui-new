// 扩展 Jest 的 DOM 断言（提供 toBeInTheDocument、toHaveTextContent 等方法）
import '@testing-library/jest-dom';
// 导入 React 并挂载到全局，避免在每个测试文件中重复写 import React from 'react'
import React from 'react';
global.React = React;

// 可选：添加其他全局初始化逻辑，例如：
// 模拟 window.matchMedia（某些组件可能依赖）
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});