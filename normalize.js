const fs = require('fs');
const path = require('path');

const filePath = path.join('app', 'translations.js');
let content = fs.readFileSync(filePath, 'utf8');
let norm = content.normalize('NFC');
fs.writeFileSync(filePath, norm);
console.log('Normalized app/translations.js successfully!');
