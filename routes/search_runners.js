var connection = require('./database')
    , fs = require('fs')
    , jade = require('jade')
    , qs = require('qs')
    , sanitize = require('validator').sanitize;

function join (criteria, term)
{
    if (criteria == "")
        criteria += term;
    else
        criteria += " and " + term;
    return criteria;
}
module.exports = function(req, res, params) {
    switch (req.method)
    {
        case 'GET':
            var terms = qs.parse(params.querystring.substring(1));
            var criteria = "";
            if (terms.bib_number != "")
                criteria = join(criteria, "bib="+sanitize(terms.bib_number).toInt());
            if (terms.name_first != "")
                criteria = join(criteria, 'name_first="'+sanitize(terms.name_first).xss()+'"');
            if (terms.name_last != "")
                criteria = join(criteria, 'name_last="'+sanitize(terms.name_last).xss()+'"');
            if (terms.race != "")
                criteria = join(criteria, 'race="'+sanitize(terms.race).xss()+'"');
            if (criteria != "")
                criteria = "where " + criteria;
            console.log(criteria);
            var view = jade.compile(fs.readFileSync('./views/search_runners.jade'), {filename: './views/layout.jade'});
            connection.query('select * from runners ' + criteria, function(err, rows) {
                if (err) throw err;
                res.end(view({runners: rows}));
            });
            break;
    }
}
