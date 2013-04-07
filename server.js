var http = require('http')
var router = require('./router')

var server = http.createServer(function(req, res)
        {
            var route = router.match(req.url)
            if (route)
            {
                route.fn(req, res, route.params);
            } else 
            {
                res.end("undefined")
            }
        })

server.listen(8000);

console.log("listening on 8000");
