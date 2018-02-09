const http = require('http');
const path = require('path');
const router = require('../router/main');

function start(config){
    http.createServer((request, response) => {
        const root = config.root ? config.root : (path.resolve(__dirname,'..') + '/static-resource');
        const filePath = path.join(root, path.normalize(request.url));
        router.route(filePath, request, response, config);
    })
    .listen(config.port,'localhost',err => {
        if (err) {
            console.error(err);
            console.info('Failed to start server');
        } else {
            console.info(`Server started on port ${config.port}`);
        }
    })
    .on('error', (e) => {
        console.error(e)
        if (e.code === 'EADDRINUSE') {
            console.log('Address in use, retrying...');
            setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
            }, 1000);
        }
    });
}

module.exports = {
    start
};
