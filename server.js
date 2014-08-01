var http = require('http')
    , router = require('./router')
    , file = new(require('node-static').Server)();

var server = http.createServer(function(req, res)
        {
            var route = router.match(req.url)
            if (route)
            {
                route.fn(req, res, route.params);
            } else 
            {
                file.serve(req, res);
            }
        })

server.listen(8000);

console.log("listening on 8000");
