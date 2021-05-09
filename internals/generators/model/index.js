const inquirer = require('inquirer');
const { pathExists } = require('../utils');
const { baseGeneratorPath, srcPath } = require('../paths');
const { firstLetterUpperCase } = require('../utils/strFormater');
require('handlebars-helpers')();

inquirer.registerPrompt('directory', require('inquirer-directory'));

const modelExtraComponents = {
  modelName: 'modelName',
  path: 'path',
  wantTable: 'wantTable',
  wantForm: 'wantForm',
  wantRedux: 'wantRedux',
  wantTests: 'wantTests',
};

const promptsArray = [
  {
    type: 'input',
    name: modelExtraComponents.modelName,
    message: 'What should it be called?',
  },
  {
    type: 'directory',
    name: modelExtraComponents.path,
    message: 'Where do you want it to be created?',
    basePath: `${baseGeneratorPath}`,
  },
  {
    type: 'confirm',
    name: modelExtraComponents.wantForm,
    default: false,
    message: 'Do you want to create a form?',
  },
  {
    type: 'confirm',
    name: modelExtraComponents.wantTable,
    default: false,
    message: 'Do you want to create a table?',
  },
  {
    type: 'confirm',
    name: modelExtraComponents.wantRedux,
    default: false,
    message: 'Do you want to implement redux?',
  },
  {
    type: 'confirm',
    name: modelExtraComponents.wantTests,
    default: false,
    message: 'Do you want to create a tests?',
  },
];

const actionsHandler = data => {
  const answers = data;
  const actions = [];
  const componentPath = `${baseGeneratorPath}/${answers.path}/{{properCase ${modelExtraComponents.modelName}}}`;
  const actualComponentPath = `${baseGeneratorPath}/${answers.path}/${answers.modelName}`;

  if (pathExists(actualComponentPath)) {
    throw new Error(`Component '${answers.modelName}' already exists`);
  }

  actions.push({
    type: 'add',
    path: `${componentPath}/index.jsx`,
    templateFile: './model/index.jsx.hbs',
    abortOnFail: true,
  });

  actions.push({
    type: 'add',
    path: `${componentPath}/index.less`,
    templateFile: './model/index.less.hbs',
    abortOnFail: true,
  });

  if (answers.wantForm) {
    actions.push({
      type: 'add',
      path: `${componentPath}/Form/index.jsx`,
      templateFile: './model/Form/index.jsx.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `${componentPath}/Form/index.less`,
      templateFile: './model/Form/index.less.hbs',
      abortOnFail: true,
    });
  }

  if (answers.wantTable) {
    actions.push({
      type: 'add',
      path: `${componentPath}/Table/index.jsx`,
      templateFile: './model/Table/index.jsx.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `${componentPath}/Table/index.less`,
      templateFile: './model/Table/index.less.hbs',
      abortOnFail: true,
    });
  }

  if (answers.wantRedux) {
    console.log(answers.modelName);
    actions.push({
      type: 'add',
      path: `${srcPath}/store/action/${firstLetterUpperCase(
        answers.modelName,
      )}Action.js`,
      templateFile: './model/redux/action.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `${srcPath}/store/reducer/${firstLetterUpperCase(
        answers.modelName,
      )}Reducer.js`,
      templateFile: './model/redux/reducer.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `${srcPath}/store/type/${firstLetterUpperCase(
        answers.modelName,
      )}Type.js`,
      templateFile: './model/redux/type.js.hbs',
      abortOnFail: true,
    });
  }

  if (answers.wantTests) {
    actions.push({
      type: 'add',
      path: `${componentPath}/__tests__/index.test.jsx`,
      templateFile: './model/__tests__/index.test.jsx.hbs',
      abortOnFail: true,
    });
  }

  actions.push({
    type: 'prettify',
    data: { path: `${actualComponentPath}/**` },
  });

  return actions;
};

const modelGenerator = {
  description: 'Build Model',
  prompts: promptsArray,
  actions: data => actionsHandler(data),
};

module.exports = { modelGenerator, modelExtraComponents };
