import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import StatusItemListComponent from './status-item-list.component';
import { RuleLevelPopup } from '../../resources/RuleLevelPopup';
import { Rule } from '../../resources/Rule';

/* const model2 = new PasswordLevelPopup(); */
const modelWithItens: RuleLevelPopup & {toJSON?: {}} = new RuleLevelPopup();
const rule1 = new Rule({
  label: 'Item 1',
  condition: () => true,
  levelText: '',
});
const rule2 = new Rule({
  label: 'Item 2',
  condition: () => true,
  levelText: '',
});
const rule3 = new Rule({
  label: 'Item 3',
  condition: () => true,
  levelText: '',
});

modelWithItens.rules.push(rule1)
modelWithItens.rules.push(rule2)
modelWithItens.rules.push(rule3)
modelWithItens['toJSON'] = () => ({});


const meta: Meta<StatusItemListComponent> = {
  title: 'Molecule/Status Item List',
  component: StatusItemListComponent,
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 15px; background: white">${story}</div>`)],
  argTypes: {
    popupController: {
      name: 'Controller',
      description: 'Controller to show the password rules',
      control: 'object',
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Component to show a list with a label and your status',
      }
    }
  },
};

export default meta;
type Story = StoryObj<StatusItemListComponent>;

export const DefaultStatusList: Story = {
  args: {
    popupController: modelWithItens,
  },
  render: (args: StatusItemListComponent) => ({
    props: {
      ...args,
      popupController: modelWithItens,
    },
    template: `
      <status-item-list [popupController]="popupController"></status-item-list>
    `,
  }),
};

const modelOkItens = new RuleLevelPopup();
const ruleOk1 = new Rule({
  label: 'Item 1',
  condition: () => true,
  levelText: '',
});
const ruleOk2 = new Rule({
  label: 'Item 2',
  condition: () => true,
  levelText: '',
});
ruleOk2.updateStatus()
ruleOk1.updateStatus()
modelOkItens.rules.push(ruleOk1)
modelOkItens.rules.push(ruleOk2)
export const OkStatusList: Story = {
  args: {
    popupController: modelOkItens,
  },
  render: (args: StatusItemListComponent) => ({
    props: {
      ...args,
      popupController: modelOkItens,
    },
    template: `
      <status-item-list [popupController]="popupController"></status-item-list>
    `,
  }),
};