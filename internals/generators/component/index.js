/**
 * Component Generator
 */
const inquirer = require('inquirer');
const pathExists = require('../utils').pathExists;
const baseGeneratorPath = require('../paths').baseGeneratorPath;

inquirer.registerPrompt('directory', require('inquirer-directory'));

const ComponentProptNames = {
  componentName: 'componentName',
  path: 'path',
  wantMemo: 'wantMemo',
  wantStyledComponents: 'wantStyledComponents',
  wantTranslations: 'wantTranslations',
  wantLoadable: 'wantLoadable',
  wantTests: 'wantTests',
};

const componentGenerator = {
  description: 'Add a component',
  prompts: [
    {
      type: 'input',
      name: ComponentProptNames.componentName,
      message: 'What should it be called?',
    },
    {
      type: 'directory',
      name: ComponentProptNames.path,
      message: 'Where do you want it to be created?',
      basePath: `${baseGeneratorPath}`,
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantMemo,
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantStyledComponents,
      default: true,
      message: 'Do you want to use styled-components?',
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantTranslations,
      default: false,
      message:
        'Do you want i18n translations (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantLoadable,
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
    {
      type: 'confirm',
      name: ComponentProptNames.wantTests,
      default: false,
      message: 'Do you want to have tests?',
    },
  ],
  actions: data => {
    const answers = data;

    const componentPath = `${baseGeneratorPath}/${answers.path}/{{properCase ${ComponentProptNames.componentName}}}`;
    const actualComponentPath = `${baseGeneratorPath}/${answers.path}/${answers.componentName}`;

    if (pathExists(actualComponentPath)) {
      throw new Error(`Component '${answers.componentName}' already exists`);
    }
    const actions = [
      {
        type: 'add',
        path: `${componentPath}/index.jsx`,
        templateFile: './component/index.jsx.hbs',
        abortOnFail: true,
      },
    ];

    if (answers.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${componentPath}/Loadable.js`,
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    if (answers.wantTests) {
      actions.push({
        type: 'add',
        path: `${componentPath}/__tests__/index.test.jsx`,
        templateFile: './component/index.test.jsx.hbs',
        abortOnFail: true,
      });
    }

    if (answers.wantTranslations) {
      actions.push({
        type: 'add',
        path: `${componentPath}/messages.js`,
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${actualComponentPath}/**` },
    });

    return actions;
  },
};

module.exports = { componentGenerator, ComponentProptNames };
