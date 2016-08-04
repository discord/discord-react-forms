const chalk = require('chalk');
const exec = require('child_process').exec;
const Git = require('nodegit');
const gitbook = require('gitbook');
const httpServer = require('http-server');
const path = require('path');
const {DOCS_BUILD_PORT, DOCS_OUTPUT_FOLDER} = require('./helpers/Constants');

Git.Repository.open(path.resolve('./'))
  .then((repo) => {
    repo.getStatus().then(status => {
      if (status.length > 0) {
        console.log(chalk.red('Cannot build docs with uncommited changes'));
        process.exit(1);
      }

      buildDocs();
      switchBranchAndServe(repo);
    });
  });

function buildDocs() {
  gitbook.commands[0].exec(
    ['documentation', 'book'],
    {format: 'website'}
  );
}

function switchBranchAndServe(repo) {
  repo.checkoutBranch('gh-pages').then(() => {
    const mvProcess = exec(`mv ${DOCS_OUTPUT_FOLDER}/* ./`, () => {
      httpServer.createServer().listen(DOCS_BUILD_PORT, 'localhost', () => {
        console.log(chalk.green(
          `Docs are being served at ${chalk.blue(`http://localhost:${DOCS_BUILD_PORT}/`)}
Confirm, commit and push these changes`
        ));
      });
    });
  });
}
