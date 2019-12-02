/* ===================================================================
 * TypeRite - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* Pretty Print
    * -------------------------------------------------- */
    var ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };


   /* search
    * ------------------------------------------------------ */
    var ssSearch = function() {

        var searchWrap = $('.header__search'),
            searchField = searchWrap.find('.search-field'),
            closeSearch = searchWrap.find('.header__search-close'),
            searchTrigger = $('.header__search-trigger'),
            siteBody = $('body');


        searchTrigger.on('click', function(e) {

            e.preventDefault();
            e.stopPropagation();

            var $this = $(this);

            siteBody.addClass('search-is-visible');
            setTimeout(function(){
                searchWrap.find('.search-field').focus();
            }, 100);

        });

        closeSearch.on('click', function(e) {

            var $this = $(this);

            e.stopPropagation();

            if(siteBody.hasClass('search-is-visible')){
                siteBody.removeClass('search-is-visible');
                setTimeout(function(){
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchField.on('click', function(e){
            e.stopPropagation();
        });

        searchField.attr({ autocomplete: 'off'});

    };


   /* menu
    * ------------------------------------------------------ */
    var ssMenu = function() {

        var menuToggle = $('.header__menu-toggle'),
            siteBody = $('body');

        menuToggle.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.toggleClass('is-clicked');
            siteBody.toggleClass('nav-wrap-is-visible');
        });

        $('.header__nav .has-children').children('a').on('click', function (e) {

            e.preventDefault();

            $(this).toggleClass('sub-menu-is-open')
                .next('ul')
                .slideToggle(200)
                .end()
                .parent('.has-children')
                .siblings('.has-children')
                .children('a')
                .removeClass('sub-menu-is-open')
                .next('ul')
                .slideUp(200);

        });
    };


   /* masonry
    * ---------------------------------------------------- */
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.masonry({
            itemSelector: '.masonry__brick',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: true
        });

        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress( function() {
            containerBricks.masonry('layout');
        });

    };

   /* animate bricks
    * ------------------------------------------------------ */
    var ssBricksAnimate = function() {

        var animateEl = $('.animate-this');

        $WIN.on('load', function() {

            setTimeout(function() {
                animateEl.each(function(ctr) {
                    var el = $(this);

                    setTimeout(function() {
                        el.addClass('animated');
                    }, ctr * 200);
                });
            }, 300);

        });

        $WIN.on('resize', function() {
            // remove animation classes
            animateEl.removeClass('animate-this animated');
        });

    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {

        var $gallery = $('.slider__slides').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            fade: true,
            cssEase: 'linear'
        });

        $('.slider__slide').on('click', function() {
            $gallery.slick('slickGoTo', parseInt($gallery.slick('slickCurrentSlide'))+1);
        });

    };


   /* smooth scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);

                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* alert boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var ssBackToTop = function() {

        var pxShow      = 500,
            goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssPrettyPrint();
        ssSearch();
        ssMenu();
        ssMasonryFolio();
        ssBricksAnimate();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssBackToTop();

    })();

    $("#home").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/index";
    })
    $("#your_friends").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/your_friends";
    })
    $("#add_friends").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/add_friends";
    })
    $("#blogPost").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/share_space";
    })
    $("#myCollection").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/my_collections";
    })
    $("#writeBlog").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/write_blog/0";
    })
    $("#logout").on('click',function () {
        location.href=window.location.protocol+"//"+window.location.host+"/logout";
    })

    $(".header__search-form .header__search-submit").on('click',function () {
       var essay =  $('.header__search-field').val();
       location.href=window.location.protocol+"//"+window.location.host+"/search/"+essay;
       return false;
    })



    $('.addFriend').on('click',function(){
        var userID = $(this).attr('id');
        var username = $(this).attr('name');
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/add_friends",
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'userID':userID},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("add friend successfully",username+" is already your friend", "success");
                    location.href=window.location.protocol+"//"+window.location.host+"/add_friends";
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });

    //remove your friend
    $('.removeFriend').on('click',function(){
        var userID = $(this).attr('id');
        var username = $(this).attr('name');
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/your_friends",
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'userID':userID},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("delete friend successfully",username+" is not already your friend any more", "success");
                    location.href=window.location.protocol+"//"+window.location.host+"/your_friends";
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;
    });

    $('#shareToFriend').on('click',function () {
        var itemID = $(this).attr('name');
        $.ajax({
            cache:false,
            type: "POST",
            url:window.location.protocol+"//"+window.location.host+"/single_page/"+itemID,
            headers: {
                "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val()
            },
            data:{'itemID':itemID},
            async:false,
            success:function(result){
                if (result.res == 1){
                    swal("share to friends successfully","", "success");
                }else {
                    swal("your blog has been shared","", "warnning  ");
                }
            },
            error: function(){
                swal("Network failed", "Please try it later!", "error");
            },
        });
        return false;

    })

})(jQuery);