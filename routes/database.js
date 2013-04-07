var mysql = require('mysql')
    , connection = mysql.createConnection({
        host:'localhost'
        , user: 'root'
        , password: ''
        , database: 'falcon50'
    })

connection.connect();

module.exports = connection;
