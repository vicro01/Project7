const http = require('http'); // Import of the http package (https requires an SSL certificate to be obtained with a domain name)
const app = require('./app');

//var mongoMask = require('mongo-mask')   Dynamic Data Masking on MongoDB

//The normalizePort function returns a valid port (number or string)
//This configures the connection port according to the environment
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//"createserver" function to create a server (takes "app" as argument)
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {  // The event listener registers the named port the server is running on in the console
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);