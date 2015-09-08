'use strict';
var logs = require('./logs.js');
var fconfigs = require('./configs.js');
var loader = require('./loader.js');

var express = require('express');
var server = express();
var sh = require('child_process').execSync;

var http = require('http');
var http_req = require('request');

var fs = require('fs');

    
var configs = fconfigs.load();
if (!configs.port)
    configs.port = 8000;
if (!configs.servers)
    configs.servers = new Array();

//save_configs();

var servers = configs.servers.slice();


// template_apply - vars array to replace %key% in src and return
function template_apply(src, vars) {
    if (!src) return null;
    if (!vars) return null;
    var res = src.toString().replace(/%([\w^%]+)%/ig, function (match, capture) { 
        return (capture in vars) ? vars[capture] : match; });
    return res;
}


server.use(express.static('documents'));


var main = loader('./main.js');

server.get('/', function (req, res) {
        
    main.exports(req, res);
    
});

var server_port = process.env.PORT || configs.port;

logs.write('init', 'Starting server...');
server.listen(server_port, function () {
    logs.write('info', 'Running Server at port ' + server_port);
});

