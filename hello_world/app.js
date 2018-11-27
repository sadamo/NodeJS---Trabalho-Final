
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var validator = require("email-validator");
//load customers route
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

app.use(transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'livraria.com222@gmail.com',
        pass: '123mudar!@#'
    }
})
);

app.get('/', databaseconnection.index);
app.get('/book/:isbn', databaseconnection.book);
app.get('/Search/:keyword', databaseconnection.search);
app.get('/SearchBrowser/author/:authorid', databaseconnection.author);
app.get('/SearchBrowser/categoria/:id', databaseconnection.categories);
app.get('/shopping_cart', databaseconnection.shopping_cart);
app.get('/checkout1', databaseconnection.checkout1);
app.post('/checkout2', databaseconnection.checkout1save);
app.post('/checkout3/insert/:cookies', databaseconnection.checkout2insert);
app.post('/checkout3/update/:cookies', databaseconnection.checkout2update);
app.get('/checkout3', databaseconnection.checkout3);
app.get('/order_history/:id', databaseconnection.order_history);
app.get('/about', databaseconnection.about);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

