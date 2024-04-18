import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // storybook에 보여질 대상 파일 경로
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  // storybook에 사용되는 추가 기능 설정
  addons: [
    '@storybook/addon-onboarding', // storybook 초기 사용에 도움이 될 수 있는 가이드 기능 제공
    '@storybook/addon-links', // storybook 내부에서 페이지 이동을 가능하게 하는 link 기능 제공
    '@storybook/addon-essentials', // storybook 초기 사용에 도움이 되는 third-party 기능 제공
    '@chromatic-com/storybook', // storybook 초기 사용에 도움이 될 수 있는 가이드 기능 제공
    '@storybook/addon-interactions', // storybook에서 렌더링 이후 user interaction이 가능하도록 기능 제공
  ],
  // storybook에서 사용되는 framework 구체화를 위한 설정
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // storybook에 보여지는 파일들 대상으로 자동 문서화 기능 제공 (stories 파일 내부에서 tags: ['autodocs'] 설정 활용)
  docs: {
    autodocs: 'tag',
  },
};
export default config;
