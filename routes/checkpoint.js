var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/checkpoint.jade'), {filename: './views/layout.jade'});
            var queryString = "select * from checkpoints join checkins on (checkpoints.id = checkins.checkpoint_id) where checkpoints.id = " + params.checkpoint + " order by checkins.id DESC";
            connection.query(queryString, function(err, rows, fields) {
                if (err) console.log(err);
                res.end(view({checkins: rows, checkpoint_id: params.checkpoint}));
            });
            break;
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);

                if (parsed._method == 'delete')
                {
                    var queryString = "delete from checkpoints where id = " + params.checkpoint;
                    connection.query(queryString, function(err, rows, fields) {
                        res.writeHead(302, {'Location': '/checkpoints'});
                        res.end();
                    });
                }
            })
            break;
    }
}
