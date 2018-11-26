
/*
 * GET users listing.
 */

exports.about = function(req, res){
    res.render('about');

};
exports.index = function(req, res){
    req.getConnection(function(err,connection){
        connection.query('SELECT * FROM bookdescriptions ORDER BY RAND() LIMIT 3',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result){//execução da que
                if(err)
                    console.log("Error Selecting : %s ",err );//Mensagem de erro caso a query não possa ser executada
                res.render('index',{data:rows, categoria: result});
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
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                connection.query('SELECT * FROM bookauthors where AuthorID = ?', [authorid], function (err, param) {//execução da que
                    if (err)
                        console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                    res.render('search_browser', {data: rows, categoria: result, parametro: param});
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
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where CategoryID = ? GROUP BY ISBN', [id],function(err,rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                connection.query('SELECT CategoryName FROM bookcategories where CategoryID = ?', [id], function (err, param) {//execução da que
                    if (err)
                        console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                    res.render('search_browser', {data: rows, categoria: result, parametro: param});
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

                res.render('product_page', {data: rows, categoria: result});
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

                res.render('shopping_cart', {data: rows, categoria: result});
            });
        });

        //console.log(query.sql);
    });

};
exports.checkout1 = function(req, res) {

    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
            if (err)
                console.log("Error Selecting : %s ", err);
            res.render('checkout1', {categoria: result});
        });

    });
}
exports.checkout1save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            email   : input.email

        };

        connection.query("SELECT * FROM bookcustomers where email = ? ",data.email, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);
                res.render('checkout2', {categoria: result, data: rows, email: data.email});
            });

        });
    });
}

exports.checkout2save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            email    : input.email,
            fname    : input.fname,
            lname    : input.lname,
            street   : input.street,
            city     : input.city,
            state    : input.state,
            zip      : input.zip,

        };

        connection.query("INSERT INTO bookcustomers set ? ",data, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);

                connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,querieresult) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    res.render('checkout3', {categoria: result, data: querieresult});
                });
            });

        });
    });
}
exports.checkout3 = function(req, res){
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                res.render('checkout3', {data: rows, categoria: result});
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

                res.render('order_history', {data: rows, categoria: result});
            });

        });

        //console.log(query.sql);
    });

};