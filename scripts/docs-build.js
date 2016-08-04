const chalk = require('chalk');
const exec = require('child_process').exec;
const Git = require('nodegit');
const gitbook = require('gitbook');
const httpServer = require('http-server');
const path = require('path');
const {DOCS_BUILD_PORT, DOCS_FOLDER, DOCS_OUTPUT_FOLDER, DOCS_CONFIG_FILE} = require('./helpers/Constants');

Git.Repository.open(path.resolve('./'))
  .then((repo) => {
    repo.getStatus().then(status => {
      if (status.length > 0) {
        console.log(chalk.red('Cannot build docs with uncommited changes'));
        process.exit(1);
      }

      buildDocs().then(() => switchBranchAndServe(repo));
    });
  });

function buildDocs() {
  return gitbook.commands[0].exec(
    [DOCS_FOLDER, DOCS_OUTPUT_FOLDER],
    {format: 'website', config: DOCS_CONFIG_FILE}
  );
}

function switchBranchAndServe(repo) {
  repo.checkoutBranch('gh-pages').then(() => {
    const mvProcess = exec(`cp -r ${DOCS_OUTPUT_FOLDER}/. ./`, () => {
      httpServer.createServer().listen(DOCS_BUILD_PORT, 'localhost', () => {
        console.log(chalk.green(
          `Docs are being served at ${chalk.blue(`http://localhost:${DOCS_BUILD_PORT}/`)}
Confirm, commit and push these changes`
        ));
      });
    });
  });
}
