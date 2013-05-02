var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'GET':
            var view = jade.compile(fs.readFileSync('./views/onTheWay.jade'), {filename: './views/layout.jade'});
            var prevCheckpoint = params.checkpoint-1;
            var queryString = "select runner_bib, checkin_time, checkpoint_id from checkins join (select max(checkin_time) as max_check from runners join checkins on bib = runner_bib group by bib) as t on checkin_time = max_check where checkpoint_id="+prevCheckpoint;
            connection.query(queryString, function(err, rows, fields) {
                res.end(view({runners: rows, checkpoint_id: params.checkpoint}));
            });
            
            break;
    }
}
