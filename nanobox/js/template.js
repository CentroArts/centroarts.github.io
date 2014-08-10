//region fit divs to screen

var fitIDtoScreen = function (target, minSize) {
    try {
        var setSize = $(window).height() > minSize ? $(window).height() : minSize;
        $(target).css({ 'height': (setSize) + 'px' });
    }
    catch (e) { console.log(e.name); }
};

var fitAll = function () {
    fitIDtoScreen("#slider", 300);
    // limit min height size to content height
    fitIDtoScreen("#about", $(".about-content").outerHeight());
    fitIDtoScreen("#contact", $(".contact-content").outerHeight());
};

fitAll();

$(window).resize(function () {
    fitAll();
    $(".about-content").show(); // turn off effect if page resized
    $(".contact-content").show(); // turn off effect if page resized
});

//endregion

//region header autohide

$(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
        $('.navbar').removeClass('transparentx');
    } else {
        $('.navbar').addClass('transparentx');
    }
});

//endregion

//region bootstrap smooth scroll

$("#topscrollspy ul li a[href^='#']").on('click', function (e) {
    // prevent default anchor click behavior
    e.preventDefault();

    // animate
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 800);
});

//endregion

//region bootstarp carousel init

$('.carousel-fade').carousel({
  interval: 6000
});

//endregion

//region scroll animation

$(".about-content").fadeOut();

$('#about').waypoint(function () {
    $(".about-content").fadeIn(700);
},
    {
        offset: '40%',
        triggerOnce: true
    }
);

$(".contact-content").fadeOut();

$('#contact').waypoint(function () {
    $(".contact-content").fadeIn(700);
},
    {
        offset: '40%',
        triggerOnce: true
    }
);

//endregion

//region SwipeBox init

$('.swipebox').swipebox({
    useCSS: true, // false will force the use of jQuery for animations
    useSVG: false, // false to force the use of png for buttons
    hideBarsOnMobile: false, // false will show the caption and navbar on mobile devices
    hideBarsDelay: 0, // delay before hiding bars
    videoMaxWidth: 1140, // videos max width
    beforeOpen: function () { }, // called before opening
    afterClose: function () { } // called after closing
});

//endregion

//region validate form

$("#contact-form").validate();

//endregion

//region submit form ajax

$("#contact-form").submit(function (event) {

    // Stop form from submitting normally
    event.preventDefault();

    // check form valid
    var validator = $("#contact-form").validate();
    var valid = validator.form();

    if (valid) {

        // disable button while php working
        $(".submit-btn").attr("disabled", "disabled");

        // Get some values from elements on the page:
        var $form = $(this),
            url = $form.attr("action"),
            name = $form.find("input[name='name']").val(),
            email = $form.find("input[name='email']").val(),
            phone = $form.find("input[name='phone']").val(),
            message = $form.find("textarea[name='message']").val()
        ;

        // Send the data using post
        var posting = $.post(url, { name: name, email: email, phone: phone, message: message });

        // Put the results in a div
        posting.done(function (data) {

            var obj = $.parseJSON(data);

            $("#alert").show();

            if (obj && obj.status == "ok") {
                $("#form-alert").removeClass('alert-success alert-danger').addClass('alert-success');
                $("#form-alert").empty().append(obj.data);
            }
            else {
                $("#form-alert").removeClass('alert-success alert-danger').addClass('alert-danger');
                $("#form-alert").empty().append(obj.data);
            }

        }).fail(function () {
            // enabled button if 404 etc
            $(".submit-btn").removeAttr("disabled");
            $("#alert").show();
            $("#form-alert").removeClass('alert-success alert-danger').addClass('alert-danger');
            $("#form-alert").empty().append("Can't send message, try to use email.");
        })
    }
});

//endregion