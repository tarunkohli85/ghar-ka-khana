jQuery(document).ready(function(e) {
    "use strict";
    var t = e(window).width();
    e("#btt").on("click", function(t) {
        t.stopPropagation();
        e("body, html").animate({
            scrollTop: 0
        }, 400)
    });
    e(".tlt").textillate({
        selector: ".header-texts",
        loop: true,
        minDisplayTime: 6e3,
        initialDelay: 0,
        autoStart: true,
        "in": {
            effect: "flipInX",
            delayScale: 1.8,
            delay: 45,
            sync: false,
            shuffle: false,
            reverse: false
        },
        out: {
            effect: "bounceOut",
            delayScale: 1.8,
            delay: 45,
            sync: false,
            shuffle: false,
            reverse: true
        }
    });
    e.localScroll({
        duration: 1200,
        hash: true,
        offset: {
            top: -80
        }
    });
    e("html").niceScroll({
        cursorcolor: "#000",
        cursoropacitymin: .4,
        cursoropacitymax: 1,
        cursorborder: "1px solid transparent",
        cursorborderradius: "6px",
        zindex: 9999,
        scrollspeed: 200
    });
    if (t > 768) {
        (new WOW).init()
    }
    if (t > 1024) {
        e(".sf-menu").superfish({
            delay: 250,
            animation: {
                opacity: "show"
            },
            speed: 250,
            cssArrows: false
        })
    }
    if (t > 1024) {
        if (e("body, html").scrollTop() > 10) {
            e(".site-navbar").addClass("short")
        }
    }
    e(window).scroll(function() {
        var t = e(window).width();
        if (e(this).scrollTop() > 10) {
            e(".site-navbar").addClass("short")
        } else {
            e(".site-navbar").removeClass("short")
        }
        if (e(this).scrollTop() > 500) {
            e("#btt").fadeIn(500)
        } else {
            e("#btt").fadeOut(500)
        }
    });
    e(window).resize(function() {
        var t = e(window).width();
        if (t < 1025) {
            e(".sf-menu").superfish("destroy");
            if (e(".site-navbar").hasClass("short")) {
                e(".site-navbar").removeClass("short")
            }
        }
        if (t > 1007) {
            e(".sf-menu").superfish({
                delay: 250,
                animation: {
                    opacity: "show"
                },
                speed: 250,
                cssArrows: false
            });
            if (e("body, html").scrollTop() > 10 && !e(".site-navbar").hasClass("short")) {
                e(".site-navbar").addClass("short")
            }
        }
    });
    e(".mobile-nav").on("click", function(t) {
        t.stopPropagation();
        var n = e(window).width();
        if (n < 1025) {
            e(".main-navigation").slideDown(800)
        }
    });
    e(".mobile-close, .sf-menu li a").on("click", function(t) {
        t.stopPropagation();
        var n = e(window).width();
        if (n < 1025) {
            e(".main-navigation").slideUp(800)
        }
    });
    e("#enq-form-outcome").hide();
});
jQuery(window).load(function() {
    jQuery("#hungry-preloader-container").fadeOut("slow")
})

$('.loca').on('click', function () {
    const $this = $(this);
    const val = $this.attr('href');
    // $(`#${val}`).scrollIntoView({
    //     behavior: 'smooth'
    // })
    document.querySelector(val).scrollIntoView({
        behavior: 'smooth'
    });
})

document.getElementById('enq-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const data = new FormData(form);
    const action = form.action;
    const method = form.method;
    const validationRules = {
        res_name: {
            required: true
        },
        res_email: {
            required: true,
            email: true
        },
        res_phone: {
            required: true,
            number: true
        },
        res_msg: {
            required: true
        }
    };
    const validationMessages = {
        res_name: "Please provide your name!",
        res_email: {
            required: "Please provide your email address!",
            email: "Please enter a valid email address!"
        },
        res_phone: {
            required: "Please provide your contact number!",
            number: "Please enter a valid contact number!"
        },
        res_msg: "Please type your message!"
    };
    let isValid = true;
    Object.keys(validationRules).forEach(field => {
        const rules = validationRules[field];
        const messages = validationMessages[field];
        
        if (rules.required && !data.get(field)) {
            isValid = false;
            alert(messages.required);
        } else if (rules.email && !isValidEmail(data.get(field))) {
            isValid = false;
            alert(messages.email);
        } else if (rules.number && isNaN(data.get(field))) {
            isValid = false;
            alert(messages.number);
        }
    });

    if (!isValid) {
        return;
    }

    fetch(action, {
        method: method,
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === true) {
            form.reset();
            $("#enq-form-outcome").html("Thank you for reaching out\nRest assured, we've received your email and are preparing a thoughtful response.");
            $("#enq-form-outcome").slideDown(1000).delay(3000).slideUp(1000);
        } else {
            $("#enq-form-outcome").html("Somthing went wrong\nDidn't get you query Please resend it.");
            $("#enq-form-outcome").slideDown(1000).delay(3000).slideUp(1000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form');
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
