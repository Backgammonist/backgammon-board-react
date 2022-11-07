import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Board } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Board',
  component: Board,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Board>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Board> = (args) => <Board {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {positions: {
    23: 'oo',
    18: 'xxxxx',
    16: 'xxx',
    12: 'ooooo',
    11: 'xxxxx',
    7: 'ooo',
    5: 'ooooo',
    0: 'xx'
  }}
};
