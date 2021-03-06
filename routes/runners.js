var connection = require('./database')
    , fs = require('fs')
    , jade = require('jade')
    , qs = require('qs')
    , sanitize = require('validator').sanitize
    , check = require('validator').check

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
            var body = "";
            req.on('data', function(chunk) {
                body+=chunk;
            });

            req.on('end', function() {
                var string = body.toString();
                var parsed = qs.parse(string);

                var queryString = 'insert into runners (bib, name_first, name_last, race) values('+sanitize(parsed.bib_number).toInt()+', "'+sanitize(parsed.name_first).xss()+'", "'+sanitize(parsed.name_last).xss()+'", "'+sanitize(parsed.race).xss()+'")';

                console.log(queryString);
                connection.query(queryString, function(err, rows) {
                    if (err) throw err;
                    res.writeHead(302, {'Location': '/runners/'+sanitize(parsed.bib_number).toInt()});
                    res.end();
                });
            });
            break;
    }
}
