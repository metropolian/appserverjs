var fslog = require('fs');
var fslog_fname = './logs.log';


module.exports = {
    
    log: function (type, value) {
        var d = new Date();
        var tx = type.toString() + ' ' + ((typeof value === 'object') ? this.get_string(value) : value.toString());
        var tfmt =  [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':') + ' ';        
        console.log( tfmt + tx );        
        if (fslog)
            fslog.appendFile(fslog_fname, tfmt + tx + "\r\n", function (err) {
                if (err)
                console.log('Error: writing log file - ' + fslog_fname + ' ' + err);
            });
    },
  
    write: function () {        
        if (arguments.length > 0) {
            
            if (arguments.length == 1) {
                this.log('info', arguments[0]);
            }
            else {
                var res = new Array();
                for(var i = 1; i < arguments.length; i++)
                    res.push(this.get_string(arguments[i]));
                this.log(arguments[0], res.join(' '));
            }
        }        
    },
    
    get_string: function (value) {
        var cache = [];
        var res = JSON.stringify(value, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }, 4);
        cache = null
        return res;
    },

    get_version: function () {
        return 1.0;
    }
};