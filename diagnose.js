const { spawn } = require('child_process');
const fs = require('fs');

const logStream = fs.createWriteStream('sync_log.txt');

console.log('Starting next dev diagnostics...');
const child = spawn('npx', ['next', 'dev'], { shell: true });

child.stdout.on('data', (data) => {
  logStream.write(data);
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  logStream.write(`ERROR: ${data}`);
  process.stderr.write(data);
});

setTimeout(() => {
  child.kill();
  console.log('\nDiagnostics complete. File sync_log.txt created.');
  process.exit(0);
}, 8000); // 8 seconds to allow Next.js server allocation ports to print
