var jade = require('jade')
    , fs = require('fs')
    , connection = require('./database')
    , qs = require('qs')

module.exports = function(req, res, params) {
    switch(req.method)
    {
        case 'POST':
            req.on('data', function(chunk) {
                var string = chunk.toString();
                var parsed = qs.parse(string);
                if (parsed._method == 'delete')
                {
                    if (params.checkin)
                    {
                        var querystring = "delete from checkins where id = " + params.checkin;
                        connection.query(querystring, function(err, rows, fields) {
                            returnToReferer(req, res);
                        });
                    }
                } else {
                    returnToReferer(req, res);
                }
            })
            break;
    }
}

function returnToReferer(req, res) {
    res.writeHead(302, {'location': req.headers.referer});
    res.end();
}
