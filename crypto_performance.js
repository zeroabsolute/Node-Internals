const crypto = require('crypto');

function run(iterations) {
  const syncCaseResults = {};
  
  console.log(`\n
  -----------| SYNC VERSION |-----------
  `);
  
  for (let i = 0; i < iterations; i++) {
    console.log(`  Iteration ${i + 1}`);
    syncCaseResults[i + 1] = { start: Date.now() };
    const key = crypto.pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
    syncCaseResults[i + 1].end = Date.now();
    console.log(`  Key: ${key.toString('hex')}`);
  }
  
  const asyncCaseResults = {};
  
  console.log(`\n
  -----------| ASYNC VERSION |-----------
  `);
  
  for (let i = 0; i < iterations; i++) {
    asyncCaseResults[i + 1] = { start: Date.now() };

    crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        throw err;
      } 
      
      console.log(`  Iteration ${i + 1}`);
      console.log(`  Key: ${derivedKey.toString('hex')}`);
      asyncCaseResults[i + 1].end = Date.now();
    });
  }
  
  setTimeout(() => {
  console.log(`\n
  -----------| RESULT |-----------
  `);
  
  console.log(`  CASE 1: Sync version`);
  printIterationTimestamps(syncCaseResults);
  
  console.log(`\n  CASE 2: Async version`);
  printIterationTimestamps(asyncCaseResults);
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