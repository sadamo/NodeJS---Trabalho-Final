
function loadTable(){
    var subtotal = 0;
    var qtdtotal =0;
    ($("tbody").children("tr").each(function () {
        var ISBN = $(this).attr("id");
        if(ISBN != undefined){
            if (getCookie("item[" + ISBN + "]").isbn==ISBN) {
                $("#" + ISBN).show();
                $("#" + ISBN + "-qtd").html(getCookie("item[" + ISBN + "]").qtd);
                var valortotal = (getCookie("item[" + ISBN + "]").qtd) * $("#" + ISBN + "-price").html();
                var numero = valortotal+"";
                var decimal = numero.indexOf(".")
                if (decimal !== -1) {
                    var resultado = valortotal.toFixed(2)
                }
                $("#" + ISBN + "-total").html(resultado);
                subtotal = subtotal + parseFloat(resultado);
                qtdtotal = qtdtotal + parseInt($("#" + ISBN + "-qtd").html());

            }
        }
    }));
    $("#sub-total-value").html(subtotal.toFixed(2));
    if (qtdtotal==1){
        $("#shipping-value").html(10);
    }
    else{
        $("#shipping-value").html(((qtdtotal-1)*5)+10);
    }
    $("#total-value").html((subtotal+parseInt($("#shipping-value").html())).toFixed(2));
}

function add_shopping_cart(ISBN){
    if (getCookie("item[" + ISBN + "]").isbn==ISBN){
        var arr = {isbn: ISBN, qtd: getCookie("item[" + ISBN + "]").qtd + 1}
        var json_arr = JSON.stringify(arr);
        setCookie("item[" + ISBN + "]", json_arr, 1);
    }
    else{
        var arr = {isbn: ISBN, qtd: 1};
        var json_arr = JSON.stringify(arr);
        setCookie("item[" + ISBN + "]", json_arr, 1);
    }


    window.location.href = '/shopping_cart';
}

function add_cart(ISBN){
    if (getCookie("item[" + ISBN + "]").isbn==ISBN){
        var arr = {isbn: ISBN, qtd: getCookie("item[" + ISBN + "]").qtd + 1}
        var json_arr = JSON.stringify(arr);
        setCookie("item[" + ISBN + "]", json_arr, 1);
        loadTable();
    }
}

function rm_cart(ISBN){
    if (getCookie("item[" + ISBN + "]").qtd>1){
        var arr = {isbn: ISBN, qtd: getCookie("item[" + ISBN + "]").qtd - 1}
        var json_arr = JSON.stringify(arr);
        setCookie("item[" + ISBN + "]", json_arr, 1);
        loadTable();
    }
    else{
        var arr = {};
        var json_arr = JSON.stringify(arr);
        setCookie("item[" + ISBN + "]", json_arr, 1);
        loadTable();
        $("#" + ISBN).hide();
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var json_str = c.substring(name.length, c.length);
            var arr = JSON.parse(json_str);
            return arr;
        }
    }
    return "";
}