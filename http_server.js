const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log(`--> Received GET request \x1b[36m(Request number ${url.parse(req.url, true).query.request_counter})\x1b[32m`);

     setImmediate(() => {
       console.log('\x1b[33m(Immediate callback inside GET handler executed)\x1b[32m');
     });

    fs.readFile('./test.html', (error, data) => {
      if (!error) {
        console.log('--> HTML file was read');
        console.log('\x1b[37m--> Delaying response for 2.5 seconds');
        
        setTimeout(() => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }, 2500);
      }
    });


    res.on('finish', () => {
      console.log(`\n\n\x1b[36m--> Data was sent for request number ${url.parse(req.url, true).query.request_counter}`);
    });

    res.on('close', (socket) => {
      console.log(`\x1b[32mClient disconnected`);
    });
  }
});

server.on('connection', (socket) => {
  console.log(`\n\n\x1b[32mNew client connected -> IP: ${socket.address().address} and Port: ${socket.address().port}`);
});

server.listen(8000);

setImmediate(() => {
  console.log('\n\x1b[33m(Initial immediate callback executed)\x1b[32m');
});

process.nextTick(() => {
  console.log('\n\x1b[35m(Initial next tick callback executed)\x1b[32m');
});