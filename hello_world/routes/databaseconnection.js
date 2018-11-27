
/*
 * GET users listing.
 */

exports.about = function(req, res){
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM bookcategories', function (err, result) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.render('about', {categoria: result});
        });
    });

};
exports.search = function(req, res) {
    var keyword = req.params.keyword;
    keyword = keyword.replace(":", "");
    req.getConnection(function (err, connection) {

        connection.query("SELECT distinct nameF, nameL, CategoryName, bookdescriptions.* from bookauthors NATURAL join bookauthorsbooks NATURAL join bookcategoriesbooks NATURAL join bookcategories NATURAL join bookdescriptions where nameF like '%"+ keyword + "%' or nameL like '%"+ keyword + "%' or CategoryName like '%"+ keyword + "%' or title like '%"+ keyword + "%' or description like '%"+ keyword + "%' or publisher like '%%"+ keyword + "%' group by ISBN order by title asc ", function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que

                if (err)
                    console.log("Error Selecting : %s ", err);
                connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors   ',function(err,authorresult) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    res.render('search', {categoria: result, data: rows, keyword: keyword, authors: authorresult});
                });
            });

        });
    });
}
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
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks where AuthorID = ? order by title asc', [authorid],function(err,rows)
        {

            if (err)
                console.log("Error Selecting : %s ", err);
            connection.query('SELECT DISTINCT nameF, nameL, AuthorID, ISBN FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors',function(err,authorresult) {

                if (err)
                    console.log("Error Selecting : %s ", err);
                connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                    if (err)
                        console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                    connection.query('SELECT * FROM bookauthors where AuthorID = ?', [authorid], function (err, param) {//execução da que
                        if (err)
                            console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                        res.render('search_browser', {data: rows, categoria: result, parametro: param, authors: authorresult});
                    });
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
        connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions where CategoryID = ? order by title asc', [id],function(err,rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
            connection.query('SELECT * FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors where CategoryID = ?   ', [id],function(err,authorresult) {

                if (err)
                    console.log("Error Selecting : %s ", err);
                connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                    if (err)
                        console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                    connection.query('SELECT CategoryName FROM bookcategories where CategoryID = ?', [id], function (err, param) {//execução da que
                        if (err)
                            console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada
                        res.render('search_browser', {data: rows, categoria: result, parametro: param, authors: authorresult});
                    });
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
exports.checkout2insert = function(req, res) {
    var countx=-1;
    var county=-1;
    var cookies = req.params.cookies;
    var input = JSON.parse(JSON.stringify(req.body));

    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    cookies = ca + "";
    var cookiestreated = new Array();;
    for(var i = 0; i <ca.length; i++) {
        if (cookies.search("isbn") != -1){
            iini = cookies.search("isbn")+7;
            ifim = cookies.search("\",\"qtd\"");
            ivalue = cookies.slice(iini, ifim);

            qini = cookies.search("\"qtd\"") + 6;
            qfim = cookies.search("}");
            qvalue = cookies.slice(qini, qfim);

            cookiestreated.push({isbn: ivalue, qtd: qvalue});
            cookies = cookies.slice(qfim+1, cookies.length);
        }


    }

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
        var id = input.custID;
        var dataatual = new Date();
        var dd = dataatual.getDate()  + "";
        var mm = dataatual.getMonth()  + "";
        var yyyy = dataatual.getFullYear()  + "";
        yyyy =  yyyy.slice(-2);
        var min = dataatual.getMinutes()  + "";
        var hh = dataatual.getHours()  + "";
        dataatual = dd + mm + yyyy + hh + min;


        connection.query("INSERT INTO bookcustomers set ? ",data, function(err, rows)
        {
            if (err)
                console.log("Error inserting : %s ",err );

            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);

                connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function (err, querieresult) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    for (i=0; i < cookiestreated.length;i++){
                        var datainsert1 = {
                            custID : id,
                            orderdate : dataatual
                        };
                        connection.query('INSERT INTO bookorders set ?', [datainsert1], function (err, rinsert) {//execução da que
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            countx=countx+1;
                            connection.query("SELECT price from bookdescriptions where ISBN = ?", cookiestreated[countx].isbn , function (err, preco) {//execução da que
                                county=county+1;
                                if (err)
                                    console.log("Error Selecting : %s ", err);
                                var datainsert2 = {
                                    orderID: rinsert.insertId,
                                    ISBN: cookiestreated[county].isbn,
                                    qty: cookiestreated[county].qtd,
                                    price: preco[0].price
                                };
                                connection.query("INSERT INTO bookorderitems set ?", [datainsert2], function (err, rinsert2) {//execução da que
                                    if (err)
                                        console.log("Error Selecting : %s ", err);
                                });
                            });
                        });
                    }
                    connection.query("SELECT * from bookcustomers NATURAL JOIN bookorders NATURAL JOIN bookorderitems where custID = ? ", id , function (err, customers) {//execução da que
                        if (err)
                            console.log("Error Selecting : %s ", err);

                        connection.query("SELECT orderID from bookorders ORDER BY orderID desc LIMIT ?", cookiestreated.length , function (err, order) {//execução da que
                            if (err)
                                console.log("Error Selecting : %s ", err);

                            var respostaemail = "";
                            var orderemail = "";
                            var emailtotal = 0;
                            var precoemail = 0;
                            for (w=0;w< order.length;w++){
                                orderemail = orderemail + order[w].orderID;
                            }
                            for(w=0;w<cookiestreated.length;w++){
                                respostaemail = respostaemail + "Title: ";
                                for (z=0;z<querieresult.length;z++){
                                    if (cookiestreated[w].isbn == querieresult[z].ISBN){
                                        respostaemail = respostaemail + querieresult[z].title;
                                        precoemail = querieresult[z].price;
                                    }
                                }
                                respostaemail = respostaemail + " QTD: ";
                                respostaemail = respostaemail + cookiestreated[w].qtd;
                                emailtotal = emailtotal + (cookiestreated[w].qtd * precoemail);
                                respostaemail = respostaemail + '\n';
                            }
                            if (orderemail != null) {
                                var mailOptions = {
                                    from: 'livraria.com222@gmail.com',
                                    to: input.email,
                                    subject: 'Order Confirmation from BBooks',
                                    text: 'Order Confirmation from BBooks\n' +
                                        '\n' +
                                        'Order number: ' + orderemail + '  \n' +
                                        '\n' +
                                        'Items shipped:\n' +
                                        '\n' +
                                        respostaemail +
                                        '\n' +
                                        'Shipped to: \n' +
                                        customers[0].street + '\n' +
                                        customers[0].city + '\n' +
                                        customers[0].state + '\n' +
                                        customers[0].zip + '\n' +
                                        '\n' +
                                        'Total Cost: $' + emailtotal + '\n' +
                                        '\n' +
                                        'Your order should arrive via UPS Ground within 3-5 business days.\n' +
                                        'Thank you for shopping with BBooks.'
                                };

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                            }
                            res.render('checkout3', {categoria: result, data: querieresult, customer: customers, idorder: order});
                        });
                    });
                });
            });

        });
    });
}
exports.checkout2update = function(req, res) {
    var countx=-1;
    var county=-1;
    var cookies = req.params.cookies;
    var input = JSON.parse(JSON.stringify(req.body));

    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    cookies = ca + "";
    var cookiestreated = new Array();;
    for(var i = 0; i <ca.length; i++) {
        if (cookies.search("isbn") != -1){
            iini = cookies.search("isbn")+7;
            ifim = cookies.search("\",\"qtd\"");
            ivalue = cookies.slice(iini, ifim);

            qini = cookies.search("\"qtd\"") + 6;
            qfim = cookies.search("}");
            qvalue = cookies.slice(qini, qfim);

            cookiestreated.push({isbn: ivalue, qtd: qvalue});
            cookies = cookies.slice(qfim+1, cookies.length);
        }


    }

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
        var id = input.custID;
        var dataatual = new Date();
        var dd = dataatual.getDate()  + "";
        var mm = dataatual.getMonth()  + "";
        var yyyy = dataatual.getFullYear()  + "";
        yyyy =  yyyy.slice(-2);
        var min = dataatual.getMinutes()  + "";
        var hh = dataatual.getHours()  + "";
        dataatual = dd + mm + yyyy + hh + min;


        connection.query("update bookcustomers set ? where custID = "+ id,data, function(err, rows)
        {
            if (err)
                console.log("Error inserting : %s ",err );

            connection.query('SELECT * FROM bookcategories', function (err, result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);

                connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function (err, querieresult) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    for (i=0; i < cookiestreated.length;i++){
                        var datainsert1 = {
                            custID : id,
                            orderdate : dataatual
                        };
                        connection.query('INSERT INTO bookorders set ?', [datainsert1], function (err, rinsert) {//execução da que
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            countx=countx+1;
                            connection.query("SELECT price from bookdescriptions where ISBN = ?", cookiestreated[countx].isbn , function (err, preco) {//execução da que
                                county=county+1;
                                if (err)
                                    console.log("Error Selecting : %s ", err);
                                var datainsert2 = {
                                    orderID: rinsert.insertId,
                                    ISBN: cookiestreated[county].isbn,
                                    qty: cookiestreated[county].qtd,
                                    price: preco[0].price
                                };
                                connection.query("INSERT INTO bookorderitems set ?", [datainsert2], function (err, rinsert2) {//execução da que
                                    if (err)
                                        console.log("Error Selecting : %s ", err);
                                });
                            });
                        });
                    }
                    connection.query("SELECT * from bookcustomers NATURAL JOIN bookorders NATURAL JOIN bookorderitems where custID = ? ", id , function (err, customers) {//execução da que
                        if (err)
                            console.log("Error Selecting : %s ", err);

                        connection.query("SELECT orderID from bookorders ORDER BY orderID desc LIMIT ?", cookiestreated.length , function (err, order) {//execução da que
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            var respostaemail = "";
                            var orderemail = "";
                            var emailtotal = 0;
                            var precoemail = 0;
                            for (w=0;w< order.length;w++){
                                orderemail = orderemail + order[w].orderID;
                            }
                            for(w=0;w<cookiestreated.length;w++){
                                respostaemail = respostaemail + "Title: ";
                                for (z=0;z<querieresult.length;z++){
                                    if (cookiestreated[w].isbn == querieresult[z].ISBN){
                                        respostaemail = respostaemail + querieresult[z].title;
                                        precoemail = querieresult[z].price;
                                    }
                                }
                                respostaemail = respostaemail + " QTD: ";
                                respostaemail = respostaemail + cookiestreated[w].qtd;
                                emailtotal = emailtotal + (cookiestreated[w].qtd * precoemail);
                                respostaemail = respostaemail + '\n';
                            }
                            if (orderemail != null){
                                var mailOptions = {
                                    from: 'livraria.com222@gmail.com',
                                    to: input.email,
                                    subject: 'Order Confirmation from BBooks',
                                    text: 'Order Confirmation from BBooks\n' +
                                        '\n' +
                                        'Order number: '+ orderemail + '  \n' +
                                        '\n' +
                                        'Items shipped:\n' +
                                        '\n' +
                                        respostaemail +
                                        '\n' +
                                        'Shipped to: \n' +
                                        customers[0].street + '\n' +
                                        customers[0].city + '\n' +
                                        customers[0].state + '\n' +
                                        customers[0].zip + '\n' +
                                        '\n' +
                                        'Total Cost: $'+ emailtotal + '\n' +
                                        '\n' +
                                        'Your order should arrive via UPS Ground within 3-5 business days.\n' +
                                        'Thank you for shopping with BBooks.'
                                };

                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                            }

                            res.render('checkout3', {categoria: result, data: querieresult, customer: customers, idorder: order});
                        });
                    });
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
                connection.query('SELECT * FROM customers  ', function(err, customers) {//execução da que
                    if (err)
                        console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                    res.render('checkout3', {data: rows, categoria: result});
                });
            });
        });

        //console.log(query.sql);
    });

};
exports.order_history = function(req, res){
    var id = req.params.id;
    id = id.replace(":", "");
    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors GROUP BY ISBN', function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            connection.query('SELECT * FROM bookcategories', function(err,result) {//execução da que
                if (err)
                    console.log("Error Selecting : %s ", err);//Mensagem de erro caso a query não possa ser executada

                connection.query('SELECT DISTINCT nameF, nameL, AuthorID, ISBN FROM bookcategoriesbooks NATURAL JOIN bookdescriptions NATURAL JOIN bookauthorsbooks NATURAL JOIN bookauthors',function(err,authorresult) {

                    if (err)
                        console.log("Error Selecting : %s ", err);
                    connection.query('SELECT * from bookcustomers NATURAL JOIN bookorders NATURAL JOIN bookorderitems where custID = ?', [id] , function (err, customers) {//execução da que
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        res.render('order_history', {data: rows, categoria: result, customer: customers, authors: authorresult});
                    });
                });
            });

        });

        //console.log(query.sql);
    });

};