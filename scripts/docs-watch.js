const gitbook = require('gitbook');
const {DOCS_PORT, DOCS_LR_PORT, DOCS_FOLDER, DOCS_OUTPUT_FOLDER, DOCS_CONFIG_FILE} = require('./helpers/Constants');

const options = {
  'config': 'documentation/book.json'
};

gitbook.commands[1].exec(
  [DOCS_FOLDER, DOCS_OUTPUT_FOLDER],
  {watch: true, live: true, port: DOCS_PORT, lrport: DOCS_LR_PORT, format: 'website'}
);
