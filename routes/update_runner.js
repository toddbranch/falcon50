var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/update_runner.jade'), {filename: './views/layout.jade'});
            var queryString = "select * from runners where bib= " + params.runner;
            connection.query(queryString, function(err, rows, fields) {
                if (rows && rows[0])
                {
                    res.end(view({runner: rows[0]}));
                } else {
                    res.end("No runner with that bib number found.");
                }
            });
            break;
    }
}
