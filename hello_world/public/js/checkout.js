function callcookies(){
    var x = ":"
    var x = x + document.cookie;
    $("#update").attr("action", ($("#update").attr("action")+x));
    $("#insert").attr("action", ($("#insert").attr("action")+x));
}
function loadItens(){
    if (getCookie("qtdtotal") == 0 ){
        $("#quantidade").html(setCookie("qtdtotal", 0));
        $("table.table-dnone").hide();
    }
    else{
        $("table.table-dnone").show();
    }
    $("#quantidade").html(getCookie("qtdtotal"));
}
function loadQTD(){
    var qttotal =0;
    $(".qtsom").each(function(){
        qttotal = qttotal + parseInt($(this).html());
    });
    $("#qttotal").html(qttotal);
}

function checkemptytable(){
    if (getCookie("qtdtotal") == 0 ){
        $(".table-dnone").hide();
        $(".msg-dnone").show();

    }
    else{
        $(".table-dnone").show();
        $(".msg-dnone").hide();
    }

    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    var email = $("#email").val();

    if (validateEmail(email)) {
    } else {
    }
    return false;
}
