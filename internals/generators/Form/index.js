const { srcPath } = require('../paths');

const formControlTypes = [
  'text',
  'number',
  'select',
  'textarea',
  'checkbox',
  'avatar',
  'password',
  'email',
  'switch',
  'searchbox',
];

const formPrompt = [
  {
    type: 'input',
    name: 'formName',
    message: 'What will be the name of this component?',
  },
  {
    type: 'confirm',
    name: 'wantRedux',
    message: 'Do you want to add Redux?',
  },
  {
    type: 'recursive',
    name: 'controls',
    message: 'Do you want to add controls to this form?',
    prompts: [
      {
        type: 'list',
        name: 'controlType',
        message: 'What type of element do you want?',
        choices: formControlTypes,
      },
      {
        type: 'input',
        name: 'controlName',
        message: 'What will be the name of this control?',
      },
      {
        type: 'input',
        name: 'controlLabel',
        message: 'Enter the control label',
      },
    ],
  },
];

const actionsHandler = answers => {
  console.log(answers);

  const actions = [];

  actions.push({
    type: 'add',
    path: `${srcPath}/${answers.formName}.js`,
    templateFile: `./Form/index.js.hbs`,
    abortOnFail: true,
  });

  return actions;
};

const formGenerator = {
  description: 'Form Generator',
  prompts: formPrompt,
  actions: data => actionsHandler(data),
};

module.exports = {
  formGenerator,
};
