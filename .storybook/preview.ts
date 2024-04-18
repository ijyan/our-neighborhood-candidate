import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    // 발생되는 event handler 이름이 regix에 포함되는 경우 actions에 발생된 event 로그 표시 제공
    // ex) onClick event가 발생되는 경우 onClick event 처리와 관련된 로그 표시를 actions에서 확인 가능
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        // props 이름이 regex에 포함되는 경우 color 선택 ui 제공
        // ex) props 이름이 backgroundColor인 경우 color 선택할 수 있는 ui 제공
        color: /(background|color)$/i,

        // props 이름이 regex에 포함되는 경우 date 선택 ui 제공
        // ex) props 이름이 인 경우 startDate인 경우 date 선택할 수 있는 ui 제공
        date: /Date$/i,
      },
    },
  },
};

export default preview;
