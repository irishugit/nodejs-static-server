
function setFreshHeaders(stat, res, cache){
    if (cache.expires) {
        const expireTime = (new Date(Date.now() + cache.maxAge * 1000)).toUTCString();
        res.setHeader('Expires', expireTime);
    }
    if (cache.cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${cache.maxAge}`);
    }
    if (cache.lastModified) {
        const lastModified = stat.mtime.toUTCString();
        res.setHeader('Last-Modified', lastModified);
    }
    if (cache.etag) {
        res.setHeader('ETag', generateETag(stat));
    }

    function generateETag(sta) {
        const mtime = sta.mtime.getTime().toString(16);
        const size = sta.size.toString(16);
        return `W/"${size}-${mtime}"`;
    }
}

function isFresh(reqHeaders, resHeaders) {
    const  noneMatch = reqHeaders['if-none-match'];
    const  lastModified = reqHeaders['if-modified-since'];
    if (!(noneMatch || lastModified)) return false;
    if(noneMatch && (noneMatch !== resHeaders['etag'])) return false;
    if(lastModified && lastModified !== resHeaders['last-modified']) return false;
    return true;
}

module.exports = {
    setFreshHeaders,
    isFresh
};
