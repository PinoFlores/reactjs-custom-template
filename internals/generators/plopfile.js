const componentGenerator = require('./component').componentGenerator;
const sliceGenerator = require('./slice').sliceGenerator;
const { modelGenerator } = require('./model/index');
const {
  lowerCaseDecorator,
  upperCaseDecorator,
} = require('./middlewares/plopDecorator');

const { formGenerator } = require('../generators/Form/index');

const shell = require('shelljs');

function plop(plop) {
  plop.setPrompt('directory', require('inquirer-directory'));
  plop.setPrompt('recursive', require('inquirer-recursive'));

  // Generators
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('form', formGenerator);

  plop.setGenerator('slice', sliceGenerator);
  plop.setGenerator('model', modelGenerator);

  // Middlawares
  lowerCaseDecorator(plop);
  upperCaseDecorator(plop);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data;
    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return '';
  });
}

module.exports = plop;
