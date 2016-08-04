const chalk = require('chalk');
const rimraf = require('rimraf');
const {DOCS_OUTPUT_FOLDER, LIB_OUTPUT_FILE} = require('./helpers/Constants');

clean(DOCS_OUTPUT_FOLDER);
clean(LIB_OUTPUT_FILE);

function clean(file) {
  return rimraf(file, (err) => {
    console.log(`${chalk.yellow('removed:')} ${chalk.grey(file)}`);
  });
}
