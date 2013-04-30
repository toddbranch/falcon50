var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/runner.jade'), {filename: './views/layout.jade'});
            var queryString = "select * from runners where bib = " + params.runner;
            connection.query(queryString, function(err, rows, fields) {
                var runner = rows[0];
                queryString = "select checkpoint_id, checkin_time from runners join checkins on (runners.bib = checkins.runner_bib) where bib = " + params.runner;
                connection.query(queryString, function(err, rows, fields) {
                    res.end(view({runner: runner, checkins: rows}));
                });
            });
            
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);

                if (parsed._method == 'delete')
                {
                    var queryString = "delete from runners where bib = " + params.runner;
                    connection.query(queryString, function(err, rows, fields) {
                        res.writeHead(302, {'Location': '/runners'});
                        res.end();
                    });
                } else if (parsed._method == 'put')
                {
                    console.log('here!', parsed.name, parsed.bib);
                    var queryString = "update runners set race = '"+parsed.race+"', name_last = '"+parsed.name_last+"', name_first = '" + parsed.name_first + "', bib = " + parsed.bib_number + " where bib = " + params.runner;
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
