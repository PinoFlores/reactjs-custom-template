const fs = require('fs');
function pathExists(path) {
  return fs.existsSync(path);
}

module.exports = {
  pathExists,
};
