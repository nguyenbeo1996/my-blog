const fs = require('fs');
fs.writeFileSync('test_node.txt', 'Node is working: ' + process.version);
console.log('Test file created!');
