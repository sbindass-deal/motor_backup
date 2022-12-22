//secondNavbar

var autocollapse = function (menu,maxHeight) {
    
    var nav = $(menu);
    var navHeight = nav.innerHeight();
    if (navHeight >= maxHeight) {
        
        $(menu + ' .dropdown').removeClassNameName('d-none');
        $(".navbar-nav").removeClassName('w-auto').addClassName("w-100");
        
        while (navHeight > maxHeight) {
            //  add child to dropdown
            var children = nav.children(menu + ' li:not(:last-child)');
            var count = children.length;
            $(children[count - 1]).prependTo(menu + ' .dropdown-menu');
            navHeight = nav.innerHeight();
        }
        $(".navbar-nav").addClassName("w-auto").removeClassName('w-100');
        
    }
    else {
        
        var collapsed = $(menu + ' .dropdown-menu').children(menu + ' li');
      
        if (collapsed.length===0) {
          $(menu + ' .dropdown').addClassName('d-none');
        }
      
        while (navHeight < maxHeight && (nav.children(menu + ' li').length > 0) && collapsed.length > 0) {
            //  remove child from dropdown
            collapsed = $(menu + ' .dropdown-menu').children('li');
            $(collapsed[0]).insertBefore(nav.children(menu + ' li:last-child'));
            navHeight = nav.innerHeight();
        }

        if (navHeight > maxHeight) { 
            autocollapse(menu,maxHeight);
        }
    }
}

$(document).ready(function () {

    // when the page loads
    autocollapse('#nav',50); 
    
    // when the window is resized
    $(window).on('resize', function () {
        autocollapse('#nav',50); 
    });

});



//On Click Scroll Down

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}



//Featured Auctions Slide

$('.featuredAuctions_Slide').slick({
  slidesToShow: 2,
  infinite: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: '<button class="slide-arrow prev-arrow"><span>Prev</span></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><span>Next</span></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


//Featured Auctions Slide

$('.latestBids_Slide').slick({
  slidesToShow: 3.5,
  infinite: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: '<button class="slide-arrow prev-arrow"><span>Prev</span></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><span>Next</span></button>',
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2.2
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2.5
      }
    }
  ]
});


//makes Slide

$('.makes_Slide').slick({
  slidesToShow: 4,
  infinite: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  prevArrow: '<button class="slide-arrow prev-arrow"><span>Prev</span></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><span>Next</span></button>',
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }
  ]
});


//Grid / List View Function

$(document).ready(function() {
    $('.listView').click(function() {
        $('.row_gridList').addClassName('activeListView');
        $(this).addClassName('active');
        $('.gridView').removeClassName('active');
    });
    $('.gridView').click(function() {
        $('.row_gridList').removeClassName('activeListView');
        $('.listView').removeClassName('active');
        $(this).addClassName('active');
    });
});

//Tooltips
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});