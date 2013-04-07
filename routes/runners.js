var connection = require('./database')
    , fs = require('fs')
    , jade = require('jade')
    , qs = require('qs');

module.exports = function(req, res) {
    switch (req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/runners.jade'), {filename: './views/layout.jade'});
            connection.query('select * from runners', function(err, rows) {
                if (err) throw err;
                res.end(view({runners: rows}));
            });
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);
                var queryString = 'insert into runners values('+parsed.bib_number+', "'+parsed.name+'")';

                connection.query(queryString, function(err, rows) {
                    if (err) throw err;
                    res.writeHead(302, {'Location': '/runners'});
                    res.end();
                });
            });
            break;
    }
}
