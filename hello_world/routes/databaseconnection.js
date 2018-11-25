
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
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where AuthorID = ?', [authorid],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                if(err)
                    console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                res.render('listar_livros',{page_title:"Livros - Node.js",data:rows, categoria: result});
            });


        });

        //console.log(query.sql);
    });

};
exports.categories = function(req, res){
    var id = req.params.id;
    id = id.replace(":", "");
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where CategoryID = ?', [id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                if(err)
                    console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                res.render('listar_livros',{page_title:"Livros - Node.js",data:rows, categoria: result});
            });


        });

        //console.log(query.sql);
    });

};
exports.book = function(req, res){

    var isbn = req.params.isbn;
    isbn = isbn.replace(":", "");
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where ISBN = ?', [isbn], function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('livro', {page_title: "Livro - Node.js", data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};
exports.shopping_cart = function(req, res){

    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where ISBN = 0131428985', function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('shopping_cart',{page_title:"Shopping Cart",data:rows});


        });

        //console.log(query.sql);
    });

};