var connection = require('./database')
    , fs = require('fs')
    , jade = require('jade')
    , qs = require('qs')
    , sanitize = require('validator').sanitize

module.exports = function(req, res) {
    switch (req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/checkins.jade'), {filename: './views/layout.jade'});
            connection.query('select * from checkins', function(err, rows) {
                if (err) throw err;
                res.end(view({checkins: rows}));
            });
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);
                parsed.runner_id = sanitize(parsed.runner_id).toInt();
                parsed.checkpoint_id = sanitize(parsed.checkpoint_id).toInt();
                var queryString = 'insert into checkins (runner_bib, checkpoint_id, checkin_time) values('
                                     +parsed.runner_id + ',' + parsed.checkpoint_id +', curtime())';
                connection.query(queryString, function(err, rows) {
                    res.writeHead(302, {'Location': '/checkpoints/' + parsed.checkpoint_id});
                    res.end();
                });
            });
            break;
    }
}
