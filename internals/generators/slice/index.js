/**
 * Container Generator
 */

const path = require('path');
const inquirer = require('inquirer');
const pathExists = require('../utils').pathExists;
const baseGeneratorPath = require('../paths').baseGeneratorPath;

inquirer.registerPrompt('directory', require('inquirer-directory'));

const rootStatePath = path.join(__dirname, '../../../src/types/RootState.ts');

const sliceGenerator = {
  description: 'Add a redux toolkit slice',
  prompts: [
    {
      type: 'input',
      name: 'sliceName',
      message: 'What should it be called (automatically adds ...Slice postfix)',
    },
    {
      type: 'directory',
      name: 'path',
      message: 'Where do you want it to be created?',
      basePath: `${baseGeneratorPath}`,
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
  ],
  actions: data => {
    const answers = data;

    const slicePath = `${baseGeneratorPath}/${answers.path}/slice`;

    if (pathExists(slicePath)) {
      throw new Error(`Slice '${answers.sliceName}' already exists`);
    }
    const actions = [];

    actions.push({
      type: 'add',
      path: `${slicePath}/index.js`,
      templateFile: './slice/index.js.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'add',
      path: `${slicePath}/selectors.js`,
      templateFile: './slice/selectors.js.hbs',
      abortOnFail: true,
    });
    /* actions.push({
      type: 'add',
      path: `${slicePath}/types.js`,
      templateFile: './slice/types.js.hbs',
      abortOnFail: true,
    }); */
    /* actions.push({
      type: 'modify',
      path: `${rootStatePath}`,
      pattern: new RegExp(/.*\/\/.*\[IMPORT NEW CONTAINERSTATE ABOVE\].+\n/),
      templateFile: './slice/importContainerState.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: `${rootStatePath}`,
      pattern: new RegExp(/.*\/\/.*\[INSERT NEW REDUCER KEY ABOVE\].+\n/),
      templateFile: './slice/appendRootState.hbs',
      abortOnFail: true,
    }); */
    if (answers.wantSaga) {
      actions.push({
        type: 'add',
        path: `${slicePath}/saga.js`,
        templateFile: './slice/saga.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      data: { path: `${slicePath}/**` },
    });

    return actions;
  },
};

module.exports = {
  sliceGenerator,
  rootStatePath,
};
