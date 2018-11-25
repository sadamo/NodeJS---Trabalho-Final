
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers');
var databaseconnection = require('./routes/databaseconnection');
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'sandvigbookstore',
        multipleStatements:true
    },'pool') //or single

);

app.get('/', databaseconnection.index);
app.get('/book/:isbn', databaseconnection.book);
app.get('/author/:authorid', databaseconnection.author);
app.get('/categoria/:id', databaseconnection.categories);
app.get('/shopping_cart', databaseconnection.shopping_cart);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

