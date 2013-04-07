var jade = require('jade')
    , fs = require('fs')

module.exports = function(req, res) {
    var view = jade.compile(fs.readFileSync('./views/new_runner.jade'), {filename: './views/layout.jade'})();
    res.end(view);
}
