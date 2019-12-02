
$(document).ready(function(){
     $('#blog #blogSubmit').bind('click',function(){
        var title = $('#blog #title').val();
        var item = $('#blog #title').attr("name");
        var description = $('#blog #blogContent').html()
        //post login
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/write_blog/"+item,
            headers: {
                "X-CSRFToken": $('#blog input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'title':title, 'description': description},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("Submit Successfully","Please go to the My Blogs to find it","success");
                }else if (result.res == 0){
                    swal("Submit failed",result.error_msg,"error");
                    // location.href=window.location.protocol+"//"+window.location.host+"/index";
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });
})


