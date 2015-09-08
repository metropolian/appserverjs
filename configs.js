/* Config File Manager */

var config_fname = 'server.conf';
var config_fs = require('fs');

module.exports = {
    
    get_fs: function () {
        return require('fs');        
    },
    
    load: function () {
        return this.load_data_file(config_fs, config_fname);        
    },
    
    save: function () {
        this.save_data_file(config_fs, config_fname, configs);        
    },
    
    load_data_file: function (fs, fname) {
        if (!config_fs.existsSync(fname))
            return new Object();
        return JSON.parse(config_fs.readFileSync(fname, 'utf8'));        
    },

    save_data_file: function (fs, fname, data) {
        return config_fs.writeFileSync(fname, this.get_string(data), {
            flag: 'w'
        });
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
        });
        cache = null
        return res;
    },

    get_version: function () {
        return 1.0;
    }

};
