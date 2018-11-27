
function search(){
    if ($("#search").val() != ""){
        var local = "/Search/:" + $("#search").val();
        window.location.href= local;
    }
}