import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checker } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Checker',
  component: Checker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Checker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checker> = (args) => <Checker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'player'
};
