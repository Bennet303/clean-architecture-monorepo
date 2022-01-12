import { IonicModule } from '@ionic/angular';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UserCardComponent } from './user-card.component';

export default {
  title: 'Shared Components/UserCardComponent',
  component: UserCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [UserCardComponent],
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<UserCardComponent>;

const Template: Story<UserCardComponent> = (args: UserCardComponent) => ({
  component: UserCardComponent,
  props: args,
});

export const undefinedUser = Template.bind({});
undefinedUser.args = {
  userId: undefined,
};
export const setUser = Template.bind({});
setUser.args = {
  userId: '1',
};
