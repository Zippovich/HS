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

$(function() {
    // Logo popover
    var logoLinks = $('article.new ul li a');
    if (logoLinks.length) {
        logoLinks.each(function() {
            $(this).hover(function() {
                var $self = $(this);
                $self.popover('destroy');
                $self.popover({
                    html: true,
                    trigger: 'hover',
                    placement: getPlacement($self),
                    content: $self.find('.popover').html()
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
        $ul.find('.bs-descr').show();
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
        if (forShow) 
            $($lis[forShow]).show();
        $ul.find('.bs-descr').hide();
    });
    
    $(window).resize(function() {
        chgDesc();
    });
    chgDesc();
});
