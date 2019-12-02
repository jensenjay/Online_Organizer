
$(document).ready(function(){

    //delete the essay
     $('.deleteItem').bind('click',function(){
        var itemID = $(this).attr("id")
        //post login
        $.ajax({
            cache:false,
            type: "DELETE",
            url:window.location.protocol+"//"+window.location.host+"/index",
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'itemID': itemID},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("Delete Successfully","Your blog is deleted","success");
                    location.href=window.location.protocol+"//"+window.location.host+"/index";
                }else if (result.res == 0){
                    swal("Submit failed",result.error_msg,"error");
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });

     //get into the essay to watch the whole page
     $('a .essayInput').bind('click',function(){
        var itemID = $(this).attr("id").split(",")[1]
        //post login
        $.ajax({
            cache:false,
            type: "GET",
            url:window.location.protocol+"//"+window.location.host+"/single_page",
            data:{'itemID': itemID},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("Delete Successfully","Your blog is deleted","success");
                    location.href=window.location.protocol+"//"+window.location.host+"/index";
                }else if (result.res == 0){
                    swal("Submit failed",result.error_msg,"error");
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });
})


