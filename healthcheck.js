const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/health',
  method: 'GET',
  timeout: 2000,
};

const request = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const healthData = JSON.parse(data);
        console.log('Health check passed:', healthData.status);
        process.exit(0);
      } catch (e) {
        console.log('Health check response parsing error');
        process.exit(1);
      }
    } else {
      console.log(`Health check failed with status: ${res.statusCode}`);
      process.exit(1);
    }
  });
});

request.on('error', (err) => {
  console.log('Health check request error:', err.message);
  process.exit(1);
});

request.on('timeout', () => {
  console.log('Health check timeout');
  request.destroy();
  process.exit(1);
});

request.setTimeout(2000);
request.end();