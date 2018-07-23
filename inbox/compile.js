const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//Can feed file path to solc and use contracts['filename:contractname'];
module.exports = solc.compile(source, 1).contracts[':Inbox'];
