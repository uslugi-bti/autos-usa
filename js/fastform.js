function smoothscrollTo(target){
    target = $(target);
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
    }
}

$(document).ready(function(){
    $(window).resize(function(){
        adapate();
    });
	
	
	$('#bgmodal').click(function(){
		$('#popup').fadeOut();
		$('#bgmodal').fadeOut();
	});	
	
	$('#popup').click(function(ev){
		$('#popup').fadeOut();
	});
	
	$('#popup .popup_form').click(function(ev){
		ev.stopPropagation();
	});
	
	
	$('#bgmodal_visible').click(function(){
		$('#popup_visible').fadeOut();
		$('#bgmodal_visible').fadeOut();
	});

    adapate();
});


function adapate(){
    ww = window.innerWidth;
    if (ww < 640) {
        if ($('.filters').length) {
            $('.filters').appendTo('.col-filters')
        }
    }

}

function openbox(popup_form, message, title) {
    var id = 'popup';
    var popup_form = popup_form || '.popup_form_normal';
    var div = document.getElementById(id);

    $('#'+id + ' > div').hide();

    var popup_div = $(popup_form);
    $(popup_div).show();


    if (message){
        $(popup_form + ' .call-message').val(message);
    }else{
        $(popup_form + ' .call-message').val('');
    }

    //if (popup_form == '#popup_form_info'){
        if (title){
            $(popup_form+' .title').html(title);
        }else{
            //$(popup_form+' .title').html('РРЅС„РѕСЂРјР°С†РёСЏ');
        }
    //}

    if(div.style.display == 'block') {
        $(div).fadeOut();
        $(div).removeClass('absolute');
        $('body').css('min-height', 'auto');
    }
    else {
        $(div).fadeIn();
        fixModalPosition(popup_form, div);
    }
}

function fixModalPosition(form, layer) {
    var wh = $(window).height();
    var ww = $(window).width();
    var mh = $(form).outerHeight();
    var marginTop = 0;
    if (ww < 640 ){
        marginTop = 20;
        $('body').css('min-height', mh+40);
    }else{
        marginTop = ( wh - mh)/2;
    }
    $(layer).css('position','absolute');
    $(form).css('position', 'absolute');
    $(layer).css('height', $(document).innerHeight());
    $(form).css('top','auto')
        .css('margin-top', $(document).scrollTop() + marginTop);
}
function switchFormAuth (obj_o, obj_c) {
    var form_open = $('#' + obj_o);
    var form_close = $('#' + obj_c);

    $(form_open).show();
    $(form_close).hide();
    fixModalPosition(form_open, '#popup');

}

function showMessage(title, text) {
    openbox('.popup_message', text, title);
}

$(function(){
    $('#popup').click(function(el){
        if ($(el.target).attr('id') == 'popup'){
            $('#popup').fadeOut();
            $('#popup').removeClass('absolute');
            $('body').css('min-height', 'auto');
        }
    });
//    $('.phone-input').mask('(000) 000-00-00');
});