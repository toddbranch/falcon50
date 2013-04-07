var jade = require('jade')
    , fs = require('fs')

module.exports = function(req, res) {
    var view = jade.compile(fs.readFileSync('./views/home.jade'), {filename: './views/layout.jade'})();
    res.end(view);
}
