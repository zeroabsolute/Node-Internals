const http = require('http');

const options = (counter) => ({
  hostname: '127.0.0.1',
  port: 8000,
  path: `/?request_counter=${counter}`,
});

let counter = 0;

const interval = setInterval(() => {
  http.get(options(counter), (res) => {
    let data = '';

    res.on('data', (d) => {
      data += d;
    });

    res.on('end', () => {
      console.log('Data received');
      console.log(`${data}\n`);

      if (counter === 5) {
        clearInterval(interval);
      }
    });
  });
  
  counter++;
}, 2000);