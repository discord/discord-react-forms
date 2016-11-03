const exec = require('child_process').exec;
const path = require('path');
const chalk = require('chalk');
const {LIB_FOLDER, LIB_STYLE_FOLDER, LIB_OUTPUT_FOLDER} = require('./helpers/Constants');

function build() {
  console.log(chalk.green('Running babel'));
  exec(`babel ${LIB_FOLDER} --out-dir ${LIB_OUTPUT_FOLDER}`, () => {
    console.log(chalk.green('Copying styles'));
    exec(`cp -r ${path.join(LIB_FOLDER, LIB_STYLE_FOLDER)} ${LIB_OUTPUT_FOLDER}`);
  });
}

build();
