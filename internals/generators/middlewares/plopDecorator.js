const upperCaseDecorator = plop => {
  plop.setHelper('upperCase', text => text.toUpperCase());
};

const lowerCaseDecorator = plop => {
  plop.setHelper('lowerCase', text => text.toLowerCase());
};

module.exports = {
  upperCaseDecorator,
  lowerCaseDecorator,
};
