import { IonicModule } from '@ionic/angular';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
  title: 'Components/HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [HeaderComponent],
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<HeaderComponent>;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args,
});

export const emptyHeader = Template.bind({});
emptyHeader.args = {
  title: undefined,
  size: undefined,
};
export const setHeader = Template.bind({});
setHeader.args = {
  title: 'Home Page',
  size: 'large',
};
