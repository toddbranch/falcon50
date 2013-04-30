var connection = require('./database')
    , fs = require('fs')
    , jade = require('jade')
    , qs = require('qs');

module.exports = function(req, res) {
    switch (req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/checkpoints.jade'), {filename: './views/layout.jade'});
            connection.query('select * from checkpoints', function(err, rows) {
                if (err) throw err;
                res.end(view({checkpoints: rows}));
            });
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);
                var queryString = 'insert into checkpoints values('+parsed.id+')';

                connection.query(queryString, function(err, rows) {
                    if (err) throw err;
                    res.writeHead(302, {'Location': '/checkpoints'});
                    res.end();
                });
            });
            break;
    }
}
