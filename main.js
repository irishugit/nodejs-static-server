/*
* @Author: iris hu
* @Date:   2018-02-08 21:52:54
* @Last Modified by:   sigou
* @Last Modified time: 2018-02-08 22:56:44
*/
var http = require('http');
const port = 8080;

http.createServer(function (request, response){
	console.log(request.url,request.host,request.port);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(request.url);
  response.end();
})
.listen(port,'localhost',err => {
	if (err) {
      console.error(err);
      console.info('Failed to start server');
  } else {
      console.info(`Server started on port ${port}`);
  }
})
.on('error', (e) => {
	console.log(e)
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});