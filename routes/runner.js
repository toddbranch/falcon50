var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/runner.jade'), {filename: './views/layout.jade'});
            var queryString = "select * from runners where bib_number = " + params.runner;
            connection.query(queryString, function(err, rows, fields) {
                if (rows && rows[0])
                {
                    res.end(view({runner: rows[0]}));
                } else {
                    res.end("No runner with that bib number found.");
                }
            });
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);

                if (parsed._method == 'delete')
                {
                    var queryString = "delete from runners where bib_number = " + params.runner;
                    connection.query(queryString, function(err, rows, fields) {
                        res.writeHead(302, {'Location': '/runners'});
                        res.end();
                    });
                } else if (parsed._method == 'put')
                {
                    console.log('here!', parsed.name, parsed.bib_number);
                    var queryString = "update runners set name = '" + parsed.name + "', bib_number = " + parsed.bib_number + " where bib_number = " + params.runner;
                    console.log(queryString);
                    connection.query(queryString, function(err, rows, fields) {
                        res.writeHead(302, {'Location': '/runners'});
                        res.end();
                    });
                }
            })
            break;
    }
}
