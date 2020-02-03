const dns = require('dns');

async function run(iterations) {
  const dnsLookupResults = {
    startTime: null,
    iterationEndTimes: {},
  };
  
  console.log(`\n
  -----------| DNS LOOKUP |-----------
  `);
  
  dnsLookupResults.startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    dns.lookup('nodejs.org', {}, (err, address, family) => {
      if (err) {
        throw err;
      } 
      
      console.log(`  Iteration ${i + 1}`);
      console.log(`  Address: ${address}, Family: ${family}`);
      dnsLookupResults.iterationEndTimes[i + 1] = Date.now();
    });
  }

  const dnsResolveResults = {
    startTime: null,
    iterationEndTimes: {},
  };
  
  setTimeout(() => {
  console.log(`\n
  -----------| DNS RESOLVE |-----------
  `);
  
  dnsResolveResults.startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    dns.resolve4('nodejs.org', (err, records) => {
      if (err) {
        throw err;
      } 
      
      console.log(`  Iteration ${i + 1}`);
      console.log(`  Records: ${records.join(', ')}`);
      dnsResolveResults.iterationEndTimes[i + 1] = Date.now();
    });
  }
  }, 3000);
  
  setTimeout(() => {
  console.log(`\n
  -----------| RESULT |-----------
  `);
  
  console.log(`  CASE 1: DNS Lookup`);
  console.log(`  Execution started at ${dnsLookupResults.startTime}`);
  printIterationTimestamps(dnsLookupResults.iterationEndTimes);
  
  console.log(`\n  CASE 2: DNS Resolve`);
  console.log(`  Execution started at ${dnsResolveResults.startTime}`);
  printIterationTimestamps(dnsResolveResults.iterationEndTimes);
  console.log('\n');
  }, 10000);
}

function printIterationTimestamps(result) {
  Object.keys(result).forEach((key) => {
    console.log(`  Iteration ${key} finished at ${result[key]}`);
  });
}

if (process.argv && process.argv.length !== 3) {
  throw new Error('Invalid args provided (Expected number of iterations)');
} else {
  run(parseInt(process.argv[2], 10));
}