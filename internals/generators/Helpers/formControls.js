const formControls = {
  text: {
    importDeclaration:
      'import {TextControl} from "app/components/form/controls/TextControl"',
    component: 'TextControl',
  },
  number: {
    importDeclaration:
      'import {NumberControl} from "app/components/form/controls/TextControl"',
    component: 'NumberControl',
  },
};

const getFormControl = (answers, config, plop) => {
  let response = [];

  if (Object.keys(answers).includes('controls')) {
    response = answers.controls.map(control => {
        const { controlType } = control;
        return formControls[controlType]
    })
  }
};
