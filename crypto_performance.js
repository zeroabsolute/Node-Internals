const crypto = require('crypto');

function runCrypto(iterations) {
  const syncCaseResults = {
    startTime: null,
    iterationEndTimes: {},
  };
  
  console.log(`\n
  -----------| SYNC VERSION |-----------
  `);
  
  syncCaseResults.startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    console.log(`  Iteration ${i + 1}`);
    const key = crypto.pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
    syncCaseResults.iterationEndTimes[i + 1] = Date.now();
    console.log(`  Key: ${key.toString('hex')}`);
  }
  
  const asyncCaseResults = {
    startTime: null,
    iterationEndTimes: {},
  };
  
  console.log(`\n
  -----------| ASYNC VERSION |-----------
  `);
  
  asyncCaseResults.startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        throw err;
      } 
      
      console.log(`  Iteration ${i + 1}`);
      console.log(`  Key: ${derivedKey.toString('hex')}`);
      asyncCaseResults.iterationEndTimes[i + 1] = Date.now();
    });
  }
  
  setTimeout(() => {
  console.log(`\n
  -----------| RESULT |-----------
  `);
  
  console.log(`  CASE 1: Sync version`);
  console.log(`  Execution started at ${syncCaseResults.startTime}`);
  printIterationTimestamps(syncCaseResults.iterationEndTimes);
  
  console.log(`\n  CASE 2: Async version`);
  console.log(`  Execution started at ${asyncCaseResults.startTime}`);
  printIterationTimestamps(asyncCaseResults.iterationEndTimes);
  console.log('\n');
  }, 5000);
}

function printIterationTimestamps(result) {
  Object.keys(result).forEach((key) => {
    console.log(`  Iteration ${key} finished at ${result[key]}`);
  });
}

if (process.argv && process.argv.length !== 3) {
  throw new Error('Invalid args provided (Expected number of iterations)');
} else {
  runCrypto(parseInt(process.argv[2], 10));
}