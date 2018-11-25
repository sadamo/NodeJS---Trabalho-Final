
function loadOrder(){
    var subtotal = 0;
    var qtdtotal =0;
    ($(".div-book").each(function () {
        var ISBN = $(this).attr("id");
        if(ISBN != undefined){
            if (getCookie("item[" + ISBN + "]").isbn==ISBN) {
                $(".div-book-" + ISBN).show();
                $("#" + ISBN + "-qtd").html(getCookie("item[" + ISBN + "]").qtd);

                qtdtotal = qtdtotal + parseInt($("#" + ISBN + "-qtd").html());

            }
        }
    }));
}