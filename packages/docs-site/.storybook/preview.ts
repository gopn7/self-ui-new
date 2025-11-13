import type { Preview } from '@storybook/react-vite'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      source: {
        highlight: {
          engine: (code: string, language: string) => {
            return hljs.highlightAuto(code, [language]).value;
          },
        },
      },
    },
  },
};

export default preview;