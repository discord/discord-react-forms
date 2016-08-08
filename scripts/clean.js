const chalk = require('chalk');
const rimraf = require('rimraf');
const {DOCS_OUTPUT_FOLDER, LIB_OUTPUT_FILE, EXAMPLES_OUTPUT_FOLDER} = require('./helpers/Constants');

clean(DOCS_OUTPUT_FOLDER);
clean(LIB_OUTPUT_FILE);
clean(EXAMPLES_OUTPUT_FOLDER);

function clean(file) {
  return rimraf(file, (err) => {
    console.log(`${chalk.yellow('removed:')} ${chalk.grey(file)}`);
  });
}
