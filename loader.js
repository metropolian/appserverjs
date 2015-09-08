var fs = require('fs');
module.exports = function(fname) {
    
    if (!fs.existsSync(fname))
        return false;
    var fullname = require.resolve(fname);
    var res = new Object();
    
    console.log(fullname);
    fs.watchFile(fullname, function() {
        
        delete require.cache[fullname];
        res.exports = require(fullname);
        
    });
    
    res.exports = require(fullname);
    return res;
}