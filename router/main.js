/*
* @Author: sigou
* @Date:   2018-02-08 21:57:23
* @Last Modified by:   sigou
* @Last Modified time: 2018-02-08 21:57:50
*/
const fs = require('fs');
const url = require('url');
const mime = require('./mime');

function route(filePath, request, response){
    // using stat method find file. if didn't find, server response error else read file and response it.
    fs.stat(filePath, (err, stat) => {
        console.log(`directing to: ${filePath}`);

        if(!err) {
            if(stat.isDirectory()){
                getFloder(filePath, request, response);
            } else {
                readFile(filePath, request, response);
            }
        } else {
            fileNotFind(request, response);
        }
    })
}

function getFloder(filePath, request, response){
    // 检查是否有斜杠，没有重定向，有显示文件夹下的index.html或者目录
    if(hasTrailingSlash(filePath)){
        floderSwitch(filePath, request, response);
    } else {
        redirecting(request, response)
    }

    // 地址末尾是否有斜杠
    function hasTrailingSlash(path){
        return path[path.length - 1] === '\\' ? true : false;
    }

    // 重定向到添加斜杠的地址
    function redirecting(req, res){
        console.log(`path redirecting to ${req.url}/`);

        res.writeHead(301, {
            'Content-Type': 'text/html',
            'Location': `${req.url}/`
        });
        res.end(`Redirecting to <a href='${req.url}'>${req.url}</a>`);
    }

    function floderSwitch(path, req, res){
        const indexPath = path + 'index.html';
        // index.html是否存在，存在读取，不存在就显示目录
        if(fs.existsSync(indexPath)){
            readFile(indexPath, req, res);
        } else {
            showFloderDirection(path, req, res);
        }
    }

    // 显示文件夹下的目录
    function showFloderDirection(path, req, res){
        console.log(`index not exists, show ${path} direction now.\n`)
        fs.readdir(path, (err, files) => {
            if (err) {
                console.error(`read dir error: ${err}`);
                res.writeHead(500);
                return res.end(err);
            }
            
            const floderName = url.parse(req.url).pathname;
            let content = `<h1>Index of ${floderName}</h1>`;

            for(let file of files){
                const link = floderName + file;
                content += `<p><a href='${link}'>${file}</a></p>`;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content);
        });
    }
}

// read file
function readFile(filePath, request, response){
    console.log(`read file ${filePath}`);
    // using stream method reads file
    const readStream = fs.createReadStream(filePath);
    // set mimetype
    response.writeHead(200, {'Content-Type': mime.setContentType(filePath)});
    readStream.pipe(response);
    readStream.on('error', err => console.error(`read file error: ${err}`))
}

// return not found
function fileNotFind(request, response){
    const path = './static-resource/notfound.html';

    const readStream = fs.createReadStream(path);
    response.writeHead(404, {
        'Content-Type': mime.setContentType(path)
    });
    readStream.pipe(response);
    readStream.on('error', err => console.error(`file not found ${err}`))
}

module.exports = {
    route
};