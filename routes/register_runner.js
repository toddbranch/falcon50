var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'POST':
                var queryString = "update runners set registered = if(registered=1,0,1) where bib = " + params.runner;
                connection.query(queryString, function(err, rows, fields) {
                    res.writeHead(302, {'Location': '/runners'});
                    res.end();
                });
            break;
    }
}

