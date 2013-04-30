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
            var body = "";
            req.on('data', function(chunk) {
                body+=chunk;
            });

            req.on('end', function() {
                console.log('hello, world');
                var string = body.toString();
                console.log(string);
                var parsed = qs.parse(string);
                console.log(parsed);
                var queryString = 'insert into runners values('+parsed.bib_number+', "'+parsed.name_first+'", "'+parsed.name_last+'", "'+parsed.race+'")';

                connection.query(queryString, function(err, rows) {
                    if (err) throw err;
                    res.writeHead(302, {'Location': '/runners/'+parsed.bib});
                    res.end();
                });
            });
            break;
    }
}
