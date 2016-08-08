const chalk = require('chalk');
const exec = require('child_process').exec;
const Git = require('nodegit');
const gitbook = require('gitbook');
const httpServer = require('http-server');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./helpers/webpack.config');
const {
  DOCS_BUILD_PORT, DOCS_FOLDER, DOCS_OUTPUT_FOLDER, DOCS_CONFIG_FILE, DOCS_PATH,
  EXAMPLES_FOLDER, EXAMPLES_OUTPUT_FOLDER, EXAMPLES_PATH,
  MASTER_BRANCH, GH_PAGES_BRANCH
} = require('./helpers/Constants');

function logStep(step) {
  console.log(chalk.green(step));
}

function logError(err) {
  console.error(chalk.red(err));
  process.exit(1);
}

function openRepo() {
  logStep('Opening repo');
  return Git.Repository.open(path.resolve('./'));
}

function closeIfStatus(repo) {
  logStep('Checking status');
  return new Promise((resolve, reject) => {
    repo.getStatus().then(status => {
      if (status.length > 0) {
        reject('Cannot build docs with uncommited changes');
      }
      resolve();
    });
  });
}

function buildDocs() {
  logStep('Building docs');
  return gitbook.commands[0].exec(
    [DOCS_FOLDER, DOCS_OUTPUT_FOLDER],
    {format: 'website', config: DOCS_CONFIG_FILE}
  );
}

function buildExample() {
  logStep('Building example site');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig.getExampleBuildConfig(), (err, stats) => {
      if (err) {
        reject(err);
      }
      else {
        console.log(stats.toString({colors: true}));
        exec(`cp ${EXAMPLES_FOLDER}/index.html ${EXAMPLES_OUTPUT_FOLDER}`, resolve);
      }
    });
  });
}

function switchBranch(repo, branch) {
  console.log(`Switching branch to ${branch}`);
  return repo.checkoutBranch(branch);
}

function clearGitFiles() {
  console.log('Cleaning old built files');
  return new Promise((resolve) => {
    exec('git ls-tree --name-only -d -r -z HEAD | xargs -0 | rm -rf', resolve);
  });
}

function copyBuiltFiles() {
  console.log('Copying the built files');
  return new Promise(resolve => {
    exec(`cp -r ${DOCS_OUTPUT_FOLDER}/* ${DOCS_PATH}`, () => {
      exec(`cp -r ${EXAMPLES_OUTPUT_FOLDER} ${EXAMPLES_PATH}`, resolve);
    });
  });
}

function serve(repo) {
  console.log('Serving the repo');
  return new Promise(resolve => {
    httpServer.createServer().listen(DOCS_BUILD_PORT, 'localhost', () => {
      console.log(chalk.green(
        `Docs are being served at ${chalk.blue(`http://localhost:${DOCS_BUILD_PORT}/`)}
  Confirm, commit and push these changes (press a key to continue)`
      ));

      process.stdin.setRawMode(true);
      process.stdin.on('data', (buffer) => {
        process.stdin.setRawMode(false);
        resolve();
      });
    });
  });
}

function reset() {
  return new Promise(resolve => {
    exec('git reset --hard', resolve);
  });
}

openRepo().then(repo => {
  closeIfStatus(repo)
    .then(buildDocs)
    .then(buildExample)
    .then(() => switchBranch(repo, GH_PAGES_BRANCH))
    .then(clearGitFiles)
    .then(copyBuiltFiles)
    .then(() => serve(repo))
    .then(reset)
    .then(() => switchBranch(repo, MASTER_BRANCH))
    .then(() => process.exit(0))
    .catch(logError);
});
