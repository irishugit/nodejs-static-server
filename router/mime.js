const path = require('path');
const mime = {
    'txt': 'text/plain',
    'css': 'text/css',
    'html': 'text/html',
    'js': 'text/javascript',
    'gif': 'image/gif',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'mpeg': 'audio/mpeg',
    'wav': 'audio/wav',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'pdf': 'application/pdf'
}

function setContentType(filePath){
    let ext = path.extname(filePath);
    ext = ext.split('.').pop();
    return mime[ext] || mime['txt'];
}

module.exports = {
    setContentType
}