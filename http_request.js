const http = require('http');

function run(iterations) {
  const results = {};
  
  for (let i = 0; i < iterations; i++) {
    results[i + 1] = { start: Date.now() };

    http.request({ host: '104.20.22.46', path: '/static/images/logo.svg' }, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        results[i + 1].end = Date.now();
      });
    }).end();
  }
  
  setTimeout(() => {
  console.log(`\n
  -----------| RESULT |-----------
  `);

  printIterationTimestamps(results);
  console.log('\n');
  }, 5000);
}

function printIterationTimestamps(result) {
  let ref = null;
  Object.keys(result).forEach((key) => {
    if (key === '1') {
      ref = result[key].start;
    }
    
    const start = key === '1' ? 0 : result[key].start - ref;
    const end = result[key].end - ref;

    console.log(`  Iteration ${key} started at ${start} and ended at ${end}`);
  });
}

if (process.argv && process.argv.length !== 3) {
  throw new Error('Invalid args provided (Expected number of iterations)');
} else {
  run(parseInt(process.argv[2], 10));
}