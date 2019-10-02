const fs = require('fs');

var count = 5;

function addToNextTick() {
  process.nextTick(() => {
    console.log(`Next tick callback executed\t(Count = ${count})`);

    if (count-- > 0) {
      addToNextTick();
    }
  });
}

console.log('\n');

addToNextTick();

setTimeout(() => {
  console.log('\nSet timeout callback executed');
}, 1);

setImmediate(() => {
  console.log('\nSet immediate callback executed');
});

fs.readFile('./test.txt', (error, content) => {
  if (!error) {
    console.log(`\nFile was read.\nContent: ${content}`);
  }
});

Promise.resolve('resolved').then((result) => {
  console.log(`\nPromise was ${result}`);
});

process.on('exit', (exitCode) => {
  console.log(`\nProcess exited with code ${exitCode}\n\n`);
});