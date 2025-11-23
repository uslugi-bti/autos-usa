var CAPTCHA_READY = 0;
var recaptchaLoaded = false;

function formatPrice(price, separator){
    if (!price){
        return price;
    }

    var separator = separator || ".";
    var priceTxt = "";
    // var price = String(price);
    // if ( price.indexOf( separator ) !== -1 ){
    //     var postfix = price.split( separator )[1];
    //     postfix = "" + postfix + "00";
    //     priceTxt = "" + price.split( separator )[0] + separator + postfix.substr(0,2);
    // }else{
    //     priceTxt = "" + price + separator + "00";
    // }

    var c = 0;
    for (var i = String(price).length-1; i >= 0; i--){
        c++;
        priceTxt = '' + String(price)[i] + priceTxt;
        if ( (c == 3) && (i > 0)){
            priceTxt = ' ' + priceTxt;
        }

    }

    return priceTxt
}

$(document).ready(function(){
    $(window).resize(function(){
        adapate();
    });

    $('.faq_question').click(function() {
        $(this).children('.answ').slideToggle();
        $(this).toggleClass('open');
    });
    $('.topmenu .burger').click(function(){
       if ($('.menu-window').css('left') != 0){
           openMenu();
           //$('.menu-window').fadeIn();
       }else{
           closeMenu();
           //$('.menu-window').fadeOut();
       }
    });

    $('.closemenu-button').click(function(){
        $('.menu-window').fadeOut();
    });

    $('.phone-input').mask('+38 (000) 000-00-00');

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-red',
        radioClass: 'iradio_square-red',
        increaseArea: '20%'
    });

    $('.menu-contacts a').click(function(ev){

        $('.menu-window').fadeOut();
        smoothscrollTo('.contacts-frame');
        return false;
    });

    //if (location.search.indexOf('dofilter')){
    //    smoothscrollTo('.filter-window');
    //}

    //$('.smanimation').smoove({offset:'1%'});
    //$('.mp-top').jqueryScrollAnimate({direction:true,  distance: 2000, animated:'.ani' });
    //$('.whycomf').jqueryScrollAnimate({direction:true,  distance: 100, animated:'.ani' });

    adapate();


    $('#user-edit-email').click(function () {
        $('#input-email').removeProp('disabled');
        $('#user-edit-email').hide();
        $('#user-save-email').show();
        return false;
    });

    $('#user-save-email').click(function () {

        $.post('/components/users/ajax/saveemail.php',
            {user_id: $('#input-email').data('userid'), email: $('#input-email').val()},
            function (data) {
                if (data.success) {
                    $('#input-email').prop('disabled', true);
                    $('#user-save-email').hide();
                    $('#user-edit-email').show();
                } else {
                    alert('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РґР°РЅРЅС‹С…');
                }
            },
            'json'
        );
        return false;

    });

    $('#user-edit-phone').click(function () {
        $('#input-phone').removeProp('disabled');
        $('#user-edit-phone').hide();
        $('#user-save-phone').show();
        return false;
    });

    $('#user-save-phone').click(function () {

        $.post('/components/users/ajax/savephone.php',
            {user_id: $('#input-phone').data('userid'), phone: $('#input-phone').val()},
            function (data) {
                if (data.success) {
                    $('#input-phone').prop('disabled', true);
                    $('#user-save-phone').hide();
                    $('#user-edit-phone').show();
                } else {
                    alert('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РґР°РЅРЅС‹С…');
                }
            },
            'json'
        );
        return false;
    });

    $('#user-edit-nickname').click(function () {
        $('#input-nickname').removeProp('disabled');
        $('#user-edit-nickname').hide();
        $('#user-save-nickname').show();
        return false;
    });

    $('#user-save-nickname').click(function () {

        $.post('/components/users/ajax/savenickname.php',
            {user_id: $('#input-nickname').data('userid'), nickname: $('#input-nickname').val()},
            function (data) {
                if (data.success) {
                    $('#input-nickname').prop('disabled', true);
                    $('#user-save-nickname').hide();
                    $('#user-edit-nickname').show();
                    updateRightName(data.colorindex);
                } else {
                    alert('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РґР°РЅРЅС‹С…');
                }
            },
            'json'
        );
        return false;
    });

    $('#user-edit-surname').click(function () {
        $('#input-surname').removeProp('disabled');
        $('#user-edit-surname').hide();
        $('#user-save-surname').show();
        return false;
    });

    $('#user-save-surname').click(function () {

        $.post('/components/users/ajax/savesurname.php',
            {user_id: $('#input-surname').data('userid'), surname: $('#input-surname').val()},
            function (data) {
                if (data.success) {
                    $('#input-surname').prop('disabled', true);
                    $('#user-save-surname').hide();
                    $('#user-edit-surname').show();
                    updateRightName(data.colorindex);
                } else {
                    alert('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РґР°РЅРЅС‹С…');
                }
            },
            'json'
        );
        return false;
});

    $('.cabinet_head .tab').click(function() {
        if($(this).hasClass('active_tab')) {
            $(this).removeClass('active_tab');
            $(this).siblings().addClass('active_tab');
        }else {
            $(this).siblings().removeClass('active_tab');
            $(this).addClass('active_tab');
        }

        var a = $('.personal_data');
        var b = $('.subscribes');

        if ($(a).hasClass('active_content')) {
            $(a).removeClass('active_content');
            $(b).addClass('active_content');
        }else {
            $(b).removeClass('active_content');
            $(a).addClass('active_content');
}
        return false;
    });

    //load google maps api
    setTimeout(function () {
        var script = document.createElement('script');
        script.onload = function() {
        };
        script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCbRII2uCUpXt7-qK_cigxo3iDfaAGr2io";
        document.getElementsByTagName('head')[0].appendChild(script);

    }, 3000);


    //     (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    //     key: "key=AIzaSyCbRII2uCUpXt7-qK_cigxo3iDfaAGr2io",
    //     v: "3.exp"
    //
    //     // Add other bootstrap parameters as needed, using camel case.
    //     // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
    // });

    $('.header-content .menu li').hover(function () {
        if ($(this).find('ul').length) {
            $(this).addClass('active')
        } else {
            $('.header-content .menu li.active').removeClass('active')
        }
    })

});

function toggleSeoBlock() {
    let sb = $('.seo-block');
    if (sb.hasClass('collapsed')) {
        let currentHeight = sb.outerHeight();
        sb.css('height', 'auto');
        let maxHeight = sb.outerHeight();
        sb.css('height', currentHeight);
        sb.animate({'height': maxHeight}, 400, 'linear', function () {
           sb.removeClass('collapsed');
        });
    } else {
        sb.animate({'height': 80}, 400, 'linear', function () {
            sb.addClass('collapsed');
        });
    }

}






var marker;
var map;
var geocoder;

var officesOd = [
    ['AutoProfi', 46.421624, 30.717468 , 4],
];
var officesKv = [
    ['AutoProfi', 50.493098, 30.380298 , 4],
];

function setMarkers(map, kiev) {

    var markerimage = {
        url: '/templates/_default_/images/map-pointer.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(34, 34),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(17, 17)
    };

    var shape = {
        coords: [1, 1, 1, 40, 40, 40, 40, 1],
        type: 'poly'
    };

    if (kiev){
        var offices = officesKv;
    }else{
        var offices = officesOd;
    }

    for (var i = 0; i < offices.length; i++) {
        var office = offices[i];
        var marker = new google.maps.Marker({
            position: {lat: office[1], lng: office[2]},
            map: map,
            shape: shape,
            icon: markerimage,
            title: office[0]
        });
    }
}

$(function () {
    $('.footer-contacts #map').click(function () {
        if (! $(this).hasClass('loaded')) {
            $(this).addClass('loaded');
            initializeMap();
        }
    });
});


function collapseMapInfo(){
    $('#overlay-block-map').addClass('collapsed');
    //map.setOptions({scrollwheel:true})
}

/* auction */
$(function () {
    $('.spoiler').click(function () {
       var spoilerContent = $(this).siblings('.spoiler-content');
       if ( $(spoilerContent).length ){
         if ($(spoilerContent).css('display') == 'block'){
             $(spoilerContent).slideUp();
             $(this).removeClass('active');
         }else{
             $(spoilerContent).slideDown();
             $(this).addClass('active');
         }
       }
   });

});

function updateRightName(color) {

    var name = $('#input-nickname').val();
    var surname = $('#input-surname').val();

    $('.right_side .name').html(name + '<br/>' + surname);
    $('.right_side .image').html(name[0]);

    if (color){
        $('.right_side .image').css('background-color', color);
    }
}

function adaptateCar() {
    var ww = window.innerWidth;
    if (ww < 640) {
        $('#parameters').insertAfter('.addpictures-wrapper');
    }

}

function openMenu(){
    $('.menu-window').addClass('open');
}

function closeMenu(){
    $('.menu-window').removeClass('open');
}

function checkCaptcha (el)
{
    if (!CAPTCHA_READY) {
        alert("РЈРєР°Р¶РёС‚Рµ РєР°РїС‚С‡Сѓ, РїРѕР¶Р°Р»СѓР№СЃС‚Р°");
        return false;
    }
    return true;
}

function captcha_ready() {
    CAPTCHA_READY = 1;
    console.log('ready');
}

var splides = [];

$(function () {
    $('.car-thumb').hover(function () {
            var el = $(this);
            setTimeout(function () {
                $($(el).find('.picture a.static')).hide();
            }, 800);

            let item_id = $($(this).find('.picture')).data('itemid');

            $.get('/components/catalog/ajax/splides.php?item_id=' + item_id + '&lang=' + CURRENT_LANG, function (data) {
                $('.item-' + item_id+ ' .splide__list').append(data);

                var splide = new Splide('.item-' + item_id+ ' .splide', {
                    arrows: false,
                    autoplay: true,
                    speed: 1,
                    interval: 700,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    pagination: false,
                    easing: 'linear',
                    type: 'fade',
                    lazyLoad: 'sequential'
                }).mount();

                $('.item-' + item_id+ ' .splide').show();

                splides.push(splide);
            })


        },
        function () {
            $($(this).find('.picture a.static')).fadeIn();
            let item_id = $($(this).find('.picture')).data('itemid');

            $('.item-' + item_id+ ' .splide').hide();

            splides.map(function (splide, e) {
                splide.destroy(true);
            });
            splides = [];
        });

    $('.lang-change').click(function () {
        $('.droplang').toggleClass('active').slideToggle();
        return false
    });

    $(document).click(function (ev) {
        var droplang = $('.droplang');
        if (droplang.hasClass('active')) {
            if (($(ev.target).closest(".droplang").length) || ($(ev.target).closest(".lang-change").length)) return;
            droplang.removeClass('active').slideUp()
        }
    });
});

function showNextStepGetCost(ev) {
    var form = $(ev.target).closest('form');
    $($(form).find('.slide-1')).hide();
    $($(form).find('.slide-2')).show();
}



function loadRecaptcha() {

    if (recaptchaLoaded) {
        return;
    }

    recaptchaLoaded = true;

    var script = document.createElement('script');
    script.onload = function() {
    };
    script.src = "https://www.google.com/recaptcha/api.js";
    document.getElementsByTagName('head')[0].appendChild(script);


}

$(function () {
    var hasActiveForms = false;
    // $('form').each(function (i, el) {
    //     if ($(this).is(':visible')) {
    //         //special-offer on home screen dont use captcha
    //         if ($(this).prop('id') != 'special-offer') {
    //             hasActiveForms = true;
    //         }
    //     }
    // });

    if (hasActiveForms) {
        loadRecaptcha();
    }

    $('input').focus(function () {
        loadRecaptcha();
    });

});

function updateCarModelsCommission(source, targetName) {

    var brand = $(source).val();
    var form = $(source).closest('form');

    var targetSelect = $($(form).find('select[name="' + targetName  + '"]'));
    var val = targetSelect.val();

    $(targetSelect.find('option')).remove();
    $.post('/components/catalog/ajax/models.php',
        {mark: brand},
        function (data) {
            if (data.models.length) {
                data.models.map(function (el) {
                    $(targetSelect).append('<option class="opt">' + el + '</option>');
                });
            }
        },
        'json'
    );

}

function showInfo(title, description) {
    $('#popup_info .title').html(title);
    $('#popup_info .description').html(description);
    openbox('#popup_info');
}