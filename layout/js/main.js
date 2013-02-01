var getPlacement = function($el) {
    var offset = $el.offset(),
        top = offset.top,
        left = offset.left,
        height = $(document).outerHeight(),
        width = $(document).outerWidth(),
        vert = 0.5 * height - top,
        vertPlacement = vert > 0 ? 'bottom' : 'top',
        horiz = 0.5 * width - left,
        horizPlacement = horiz > 0 ? 'right' : 'left',
        placement = Math.abs(horiz) > Math.abs(vert) ?  horizPlacement : vertPlacement;
    return placement;
};

var chgDesc = function() {
    var $li = $('.soon > .center > ul > li.bs-descr');
    if ($(document).width() <= 695 && $li.length) {
        $('.soon > .center > ul > li:first-child').append('<div class="desc">' + $li.html() + '</div>');
        $li.remove();
    }
    if ($(document).width() > 695 && !$li.length) {
        var $fLi = $('.soon > .center > ul > li:first-child');
        $fLi.after('<li class="bs-descr">' + $fLi.find('.desc').html() + '</li>');
        $fLi.find('.desc').remove();
    }
}

function calculateLIsInRow(selector) {
    var lisInRow = 0;
    $(selector).each(function() {
        if($(this).prev().length > 0) {
            if($(this).position().top != $(this).prev().position().top) return false;
            lisInRow++;
        }
        else {
            lisInRow++;   
        }
    });
    return lisInRow;
}

function removeRightBorderNews() {
    var selector = '.news > ul > li',
        delimToRemove = calculateLIsInRow(selector);
    $(selector).each(function(index, item) {
        if ((index + 1)%delimToRemove) {
            $(item).css('border-color', '#bebebe');
        }
        else {
            $(item).css('border-color', 'transparent');
        }
    });
}

$(function() {
    // Popovers
    var logoLinks = $('article.new ul li a, .top-views #carousel > li > a, .category-posts ul.center > li > a');
    if (logoLinks.length) {
        logoLinks.each(function() {
            $(this).hover(function() {
                var $self = $(this);
                $self.popover('destroy');
                $self.popover({
                    html: true,
                    trigger: 'hover',
                    placement: getPlacement($self),
                    content: $self.find('.popover').html(),
                    container: 'body'
                });
                $self.popover('show');
            }, function() {
                var $self = $(this);
                $self.popover('hide');
            });
        });
    }
    
    // Soon
    $('.soon > .center > ul > li.big-soon > a').hover(function() {
        var $ul = $(this).parents('ul'),
            $lis = $ul.find('> li'),
            forHide = 0;
        for (var i = $lis.length; i--;) {
            if ($($lis[i]).css('display') != 'none') {
                forHide = i;
                break;
            }
        }
        if (forHide)
            $($lis[forHide]).hide();
        $ul.find('.bs-descr').stop().show(100);
    }, function(e) {
        var $ul = $(this).parents('ul'),
            $lis = $ul.find('> li'),
            forShow = 0;
        for (var i = $lis.length; i--;) {
            if ($($lis[i]).css('display') != 'none') {
                forShow = i + 1;
                break;
            }
        }
        $ul.find('.bs-descr').stop().hide(100, function() {
            if (forShow) 
                $($lis[forShow]).show();
        });
    });
    
    $(window).resize(function() {
        chgDesc();
        removeRightBorderNews();
    });
    chgDesc();
    removeRightBorderNews();
    
    // Menu hover
    $('header nav.main-nav ul li a, footer nav.footer-nav ul li a').hover(function() {
        var $self = $(this);
        if (!$self.parent().hasClass('active')) {
            $self.find('.not-hover').animate({
                top: -30
            }, 200);
            $self.find('.hover').animate({
                top: -30,
                opacity: 1
            }, 200);
        }
    }, function() {
        var $self = $(this);
        if (!$self.parent().hasClass('active')) {
            $self.find('.not-hover').stop().animate({
                top: 0
            }, 200);
            $self.find('.hover').stop().animate({
                top: 0,
                opacity: 0
            }, 200);
        }
    });
    
    // Home Slider
    var carousel = $('#carousel');
    if (carousel.length)
        carousel.elastislide();
    $('.elastislide-horizontal ul li').hover(function() {
       $(this).stop().animate({
           top: '-10px'
       }, 200); 
    }, function() {
        $(this).stop().animate({
           top: 0
       }, 200); 
    });
    
    // Checkboxes
    var pc = $('.pc');
    if (pc.length) {
        pc.prettyCheckable();
    }
    
    /* Серии */
    $('.seasons a.opener').on('click', function(e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('opened')) {
            $(this).next('.s-series').stop().slideDown(200);
            $(this).parent().addClass('opened');
        }
        else {
            $(this).next('.s-series').stop().slideUp(200);
            $(this).parent().removeClass('opened');
        }
    });
    
    // Скроллер
    var settings = {
        autoReinitialise: true,
        verticalGutter: 2
    };
    var pane = $('.scroll-pane')
    pane.jScrollPane(settings);
    
    // 
});
