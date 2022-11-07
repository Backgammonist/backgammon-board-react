import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Point } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Point',
  component: Point,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '180px',  }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Point>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Point> = (args) => <Point {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'player'
};
