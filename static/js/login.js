
$(document).ready(function(){
    $('#signUp').bind('click', function () {
        $('#dowebok').eq(0).addClass('right-panel-active')

    })
    $('#signIn').bind('click', function () {
        $('#dowebok').eq(0).removeClass('right-panel-active')

    })

//    	login function
    $('#loginBtn').bind('click',function(){
        var username = $('#login_div #username').val()
        var pwd = $('#login_div #password').val()
        //post login
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/login",
            headers: {
                "X-CSRFToken": $('#login_div input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'username':username, 'pwd': pwd},
            async:false,
            success:function(result){
                if (result.res == 1){

                    location.href=window.location.protocol+"//"+window.location.host+"/index";
                }else if (result.res == 0){
                    swal("login failed",result.error_msg,"error");
                    // location.href=window.location.protocol+"//"+window.location.host+"/index";
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });

//    	register function
    $('#regBtn').on('click',function(){
        var user_name = $('#register_form #register_username').val()
        var pwd = $('#register_form #register_pwd').val()
        var rpwd = $('#register_form #register_rpwd').val()
        //post register
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/register",
            headers: {
                "X-CSRFToken": $('#register_form input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'user_name':user_name, 'pwd':pwd, 'rpwd':rpwd},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("Register successfully","Register successfully", "success");
                    location.href=window.location.protocol+"//"+window.location.host+"/index";
                }else if (result.res == 0){
                    swal("Register fail", result.error_msg, "error");
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });
})


