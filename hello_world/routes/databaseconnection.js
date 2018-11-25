
/*
 * GET users listing.
 */

exports.index = function(req, res){
  req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookdescriptions ORDER BY RAND() LIMIT 3',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
                connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                    if(err)
                        console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                    res.render('index',{page_title:"Livros - Node.js",data:rows, categoria: result});
            });
                
           
         });
         
         //console.log(query.sql);
    });
  
};
exports.author = function(req, res){
    var authorid = req.params.authorid;
    authorid = authorid.replace(":", "");
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where AuthorID = ? GROUP BY ISBN', [authorid],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                if(err)
                    console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                connection.query('SELECT * FROM bookauthors where AuthorID = ?', [authorid], function(err,param){//execução da que
                    if(err)
                        console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                    res.render('search_browser',{page_title:"Livros - Node.js",data:rows, categoria: result, parametro: param});
                });
            });


        });

        //console.log(query.sql);
    });

};
exports.categories = function(req, res){
    var id = req.params.id;
    id = id.replace(":", "");
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where CategoryID = ? GROUP BY ISBN', [id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                if(err)
                    console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                connection.query('SELECT CategoryName FROM bookcategories where CategoryID = ?', [id], function(err,param){//execução da que
                    if(err)
                        console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                        res.render('search_browser',{page_title:"Livros - Node.js",data:rows, categoria: result, parametro: param});
                });
            });


        });

        //console.log(query.sql);
    });

};
exports.book = function(req, res){

    var isbn = req.params.isbn;
    isbn = isbn.replace(":", "");
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where ISBN = ? GROUP BY ISBN', [isbn], function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('product_page', {page_title: "Livro - Node.js", data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};
exports.shopping_cart = function(req, res){

    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('shopping_cart', {page_title: "Shopping Cart", data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};
exports.checkout1 = function(req, res){
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookcategories',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('checkout1',{page_title:"Checkout - Node.js",categoria:rows});


        });

        //console.log(query.sql);
    });

};
exports.checkout2 = function(req, res){
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookcategories',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('checkout2',{page_title:"Checkout - Node.js",categoria:rows});


        });

        //console.log(query.sql);
    });

};
exports.checkout3 = function(req, res){
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('checkout3', {page_title: "Checkout", data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};
exports.order_history = function(req, res){
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('order_history', {page_title: "Order History", data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};