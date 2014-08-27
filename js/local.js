if( typeof(SNI) == "undefined" ) { SNI = {}; }
if( typeof(SNI.M) == "undefined" ) { SNI.M = {}; }

SNI.M.SPEED = 250;

// temporary for ads
SNI.M.Ad = function(type, ad, position) {
  return;
};

// mobile detection helper
SNI.M.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (SNI.M.isMobile.Android() || SNI.M.isMobile.BlackBerry() || SNI.M.isMobile.iOS() || SNI.M.isMobile.Windows());
    }
};

// hide address bar
(function(win){
  var doc = win.document;
    
  // If there's a hash, or addEventListener is undefined, stop here
  if( !location.hash && win.addEventListener ){
    //scroll to 1
    window.scrollTo( 0, 1 );
    var scrollTop = 1,
      getScrollTop = function(){
        return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
      },
      //reset to 0 on bodyready, if needed
      bodycheck = setInterval(function(){
        if( doc.body ){
          clearInterval( bodycheck );
          scrollTop = getScrollTop();
          win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        } 
      }, 15 );
    win.addEventListener( "load", function(){
      setTimeout(function(){
          //reset to hide addr bar at onload
          win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
      }, 0);
    } );
  }
})(this);

// Default to mouse up, if there's no touching
SNI.M.touchEndEvent = "ontouchend" in document ? "touchend" : "mouseup";

// double click to view source (debug only)
SNI.M.Debug = function() {
  var node = $('section');
  node.each(function(i, obj) {
     var the_html = $(obj).html();
     the_html = the_html.replace(/[<>]/g, function(m){
             return {
                 '<' : '&lt;',
                 '>' : '&gt;'
             }[m];
         });
     $(obj).append('<pre class="block">'+the_html+'</pre>');
  });
  node.dblclick(function () {
     $(this).css('position','relative');
     var codenode = $(this).find('pre');
     codenode
         .fadeToggle('350');
         $('html,body').animate({scrollTop: codenode.offset().top-14},SNI.M.SPEED);
  });};

$(document).ready( function () {
  var templates = $('.warn');
  var template_list = $('.warn > ul');
  templates.hover( 
    function () {template_list.slideDown()},
    function () {template_list.slideUp()}
  );
});

// simple accordion 
// todo: change active arrow, scrollto          
SNI.M.Accordion = function (options) {

  var defaults = {
    parent: '.accordion',
    header: 'dt',
    panel: 'dd',
    open: 0,
    slide: false
  },

  settings = $.extend({}, defaults, options);

  var $header = $(settings.header),
      $panel = $(settings.panel);

  // initialize
  $panel
    .addClass('hide')
    .eq(settings.open).slideDown(SNI.M.SPEED);

  $(settings.parent).on(SNI.M.touchEndEvent, settings.header, function(e) {
    $(this).next()
        .slideDown(SNI.M.SPEED, function() {
          if (settings.slide) {
            Slide();
          }
        })
        .addClass('active').removeClass('hide')
        .siblings(settings.panel)
          .slideUp(SNI.M.SPEED)
          .removeClass('active');
          $(settings.header).removeClass('current');
          $(this).addClass('current');
      e.preventDefault();

      var Slide = function() {
        $('html,body').animate({scrollTop: $(e.target).offset().top-7},SNI.M.SPEED);
      }

  }).on('click', function() {return false});  

};

// expand list items following .expand link on "tap"
SNI.M.Expose = function(elem) {

  var $link = $(elem);
  var $list = $(elem + '~ div');

  $list
    .addClass('hide');

  $link.on(SNI.M.touchEndEvent, $list, function(e) {
    $(this).fadeOut(SNI.M.SPEED, function() {
      $(this).next()
        .fadeIn(SNI.M.SPEED);
        $('html,body').animate({scrollTop: $(this).offset().top+56},SNI.M.SPEED);
      e.preventDefault();
    });
  }).on('click', function() {return false});
};

// toggle one element
SNI.M.Toggler = function (trigger, panel) {

  var $trigger = $(trigger);
  var $panel = $(panel);

  $trigger.on(SNI.M.touchEndEvent,function() {
      $(this).toggleClass('active');
      $panel.toggle();
      return false;
  });};

// determines height of h2 banner tag and add class
SNI.M.SizeBanner = function () {

  var b = $('.banner').find('h2'),
      h = b.height(),
      sm = 32,
      med = 49;

  if (!b.length) {
    return;
  }

  $.each(b, function (index, value) {

    if (h > sm && h < med) {
      b.addClass('med') 
    }

    else if (h > med) {
      b.addClass('sm');
    }

  })};

SNI.M.SlideShow = function(options) {

  var defaults = {
      wrapper: 'wrapper',
      autoWidth: false,
      vertical: false,
      count: true,
      snapTo: 'li',
      scrollTo: 4,
      prev: '#prev',
      next: '#next'
  },

  settings = $.extend({}, defaults, options),

  // container to scroll
  wrapper = settings.wrapper,
  wrap_element = '#' + wrapper,

  //count number of items in list
  items = '#' + wrapper + " " + settings.snapTo,
  count = $(items).length;

  // set item width to 100%
  if (settings.autoWidth) {
    var set_item_width = function () {
      var set_width = $(wrap_element).innerWidth();
      $(items).width(set_width);
    };
    set_item_width();
  }

  // add "snap" class to every "scrollTo" item
  if (settings.vertical) {
    $.each($('.guide dl'), function(index, value) {
      if (index % settings.scrollTo == 0) 
        $(value).addClass('snap');
    });
  }

  // populate counter
  if (settings.count) {
    $('.count').text(count);   
  }

   // initialize slideshow
  var slideshow = new iScroll(wrapper,{
    snap: settings.snapTo,
    momentum: false,
    hScrollbar: false,
    vScrollbar: false,
    // update count
    onScrollEnd: function () {
      var cur = this.currPageX +1;
      $('.step').text(cur);
      // enable/disable buttons
      if (cur == count) {
        $(settings.next).addClass('dis');
      }
      else if (cur == 1) {
        $(settings.prev).addClass('dis');
      }
      else {
        $(settings.prev+', '+settings.next).removeClass('dis');
      }
    }
  });

  if (settings.activeItem) {
    // custom active item
    settings.activeItem;
    slideshow.scrollToPage(slideshow.currPageX, 0, 100);
    //console.log('curpagex',slideshow.currPageX)
  }

  // previous and next items
  $(settings.prev).on(SNI.M.touchEndEvent,function () {
    slideshow.scrollToPage('prev', 0);
  });
  $(settings.next).on(SNI.M.touchEndEvent,function () {
    slideshow.scrollToPage('next', 0);
  });

  // refresh on orientation change
  window.onorientationchange = function() { 
    set_item_width();
    setTimeout(function () {
      slideshow.refresh();
      slideshow.scrollToPage(slideshow.currPageX, 0, 100) 
      console.log(slideshow.currPageX);
    }, 0);
  } 
};


// CSS transitions
SNI.M.Transition = (function() {

  return new function() {

    var Trans = this,

        defaults = {
            wrapper: 't-wrap',
            forward: '.narrow-results',
            reverse: '.arrow.back',
            toPage: '#narrow-results',
            fromPage: '#search-results',
            type: 'push',
            fixed: true
        },

        settings = {};
    
    var init = function(options) {
      settings = $.extend({}, defaults, options);
    };

    Trans.DoublePane = function(options) {
      init(options);

      $(settings.forward).on(SNI.M.touchEndEvent, function(e){
        e.preventDefault();      
        InitDoublePane($(settings.toPage), settings.type);
      });

      $(settings.reverse).on(SNI.M.touchEndEvent, function(e){
        e.preventDefault();
        InitDoublePane($(settings.fromPage), settings.type, true);
      });

      Trans.Position();
    };

    var InitDoublePane = function(toPage, type, reverse) {
      var toPage = $(toPage),
          fromPage = $(".current"),
          reverse = reverse ? "reverse" : "";

        if(toPage.hasClass("current") || toPage === fromPage) { 
          return;
        };
        
        toPage
          .addClass("current fixed " + type + " in " + reverse)
          .one("webkitAnimationEnd", function(){
            fromPage.removeClass("current " + type + " out " + reverse);
            toPage.removeClass(type + " in " + reverse)
          });
        fromPage.addClass(type + " out " + reverse);
        
        if(!("WebKitTransitionEvent" in window)){
          toPage.addClass("current");
          fromPage.removeClass("current");
          return;
        }
      }

    // because the .t panel is absolutely positioned
    // width/height need to be applied to it, and it's parent
    Trans.Position = function() {

      var elem = $('.t-wrap'),
          pane = $('.t.current'),
          panes = $('.t');
          width = elem.width(),
          height = pane.height();

      if( !SNI.M.isMobile.any() ) {
        var width = elem.width()-14;
      };

      $(settings.fromPage)
        .css('width',width);

      elem
        .css('height',height);

      $(settings.toPage)
        .css('height',height)
    }

    Trans.Viewport = function() {

        var yScroll;

        if (self.pageYOffset) {
          yScroll = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
          yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
          yScroll = document.body.scrollTop;
        }

        $(settings.toPage)
          .css('top',yScroll)

        return yScroll;

    }

    // refresh on orientation change
    window.onorientationchange = function() { 
      position();
    } 
    
    window.onscroll = function() {
      SNI.M.Transition.Viewport();
    };
  
  };

})();


// provide option to toggle/search
SNI.M.Search = function() {

  // required eg: body class="home"
  // add body class to "s" array to 'open' search
  // eg: var s = ['home']. all other pages will receive a "toggle"
  var s = ['home'],
      body = $('body'),
      open = false;

      s.forEach(function(v,i,a) { 
        if (body.hasClass(v)) {
          open = true; 
          return false;
        } 
      })

  if (open) return;

  var $search_wrap = $('.search-wrap'),
      $search_btn = $('.search-btn'),
      $search_bar = $('.search-bar');

      $search_wrap.addClass('hidden');
      $search_bar.hide();
      $search_btn.show();

      $search_btn.on(SNI.M.touchEndEvent, function() {
        $(this).toggleClass('active');
        $search_wrap.toggleClass('hidden');
        $search_bar.toggle();
      });
};

// fetches more data from server, to append
SNI.M.MoreResults = function(options) {

  var defaults = {
    url: 'templates/_data/more_search_results.php',
    appendage: '.snippets',
    trigger: '.vert.down',
    current: 1
  },

  settings = $.extend({}, defaults, options);
  
  var init = function(page) {
    var url = settings.url;
    $.get(url, {page: page}, function(response) {
      $(settings.appendage)
      .append(response);
      SNI.M.Transition.Position();
    });
  }

  $(settings.trigger).on(SNI.M.touchEndEvent, function() {
    init(++settings.current);
  }).on('click', function() {return false});

};


SNI.M.Abridge = function(element, numchars, options) {
    
    /* available options
    
      delimiter - specifies a string on which to split the text for truncation
      forwardRange - number of characters to search past the truncation point {numchars} for the delimiter
      reverseRange - number of character to search before the truncation point {numchars} for the delimiter
      moreSuffix - string to append at the end of the truncated text, before the "more" link
      moreLinkText - string to use for the "more" link
      lessSuffix - string to append at the end of the full text, before the "less" link
      lessLinkText - string to use for the "less" link
      showTruncatedDefault - boolean flag, indicating whether or not to show the truncated text by default
    */
    
    options = $.extend({
      delimiter: " ",
      forwardRange: 10,
      reverseRange: 10,
      moreSuffix: ' ... ',
      moreLinkText: 'more',
      lessSuffix: ' ',
      lessLinkText: '',
      showTruncatedDefault: true
    }, options);
    
    // make sure numchars is greater than or equal to zero
    numchars = Math.max(numchars, 0);
    
    // store jquery obj in a variable
    var element = $(element);
    // store text content in a variable
    var current_text = element.text();
    
    // if a delimiter is defined, begin the search for an occurrence
    if((options.delimiter != undefined) && (options.delimiter != "")) {
      
      // initialize the delimiter_found flag
      delimiter_found = false;
    
      // search from (numchars) down to (numchars - reverseRange) for a delimiter
      for(var i = numchars; i > Math.max(0, numchars - options.reverseRange); i--) {
        // check character positions one-by-one, and accept the first occurrence of the delimiter
        // found at an index lower than numchars
        delimiter_position = current_text.indexOf(options.delimiter, i);
        // check that delimiter position is < numchars and also not -1 (not found)
        if((delimiter_position != -1) && (delimiter_position < numchars)) {
          // set the {delimiter_found} flag to true, to prevent the forward search
          delimiter_found = true;
          // set the truncation position, {numchars} to {delimiter_position}
          numchars = delimiter_position;
          break;
        }
      }
      // if the delimiter hasn't been found before the truncation point,
      // check from (numchars) to (numchars + forwardRange) for a delimiter
      if(!delimiter_found) {
        delimiter_position = current_text.indexOf(options.delimiter, numchars + 1);
        // if the delimiter was found (!= -1) and it is less than the minimum of the length of the text string and the forward range endpoint
        if((delimiter_position != -1) && (delimiter_position < Math.min(current_text.length, numchars + options.forwardRange))) {
          // set the {delimiter_found} flag to true, for consistency
          delimiter_found = true;
          // set the truncation position, {numchars} to {delimiter_position}
          numchars = delimiter_position;
        }
      }
    }
  
    // construct the "more" and "less" links from the supplied text strings
    var less = options.lessSuffix + '<a href="#" class="less">' + options.lessLinkText + '</a>'
    var more = options.moreSuffix + '<a href="#" class="more">' + options.moreLinkText + '</a>'
  
    // append a "less" link at the end of the existing, full text
    element.html(current_text + less);
    
    // if the length of the text is less than the truncation point, truncate the text and append a "more" link
    var truncated_text = (numchars >= current_text.length) ? current_text : current_text.slice(0, numchars) + more;

    // use current date - seconds for a randomization seed
    var now = new Date();
    var seed = now.getSeconds();
    
    // if there is no ID attribute, assign one of the form "original-text-<5-digit-Random-Number>"
    element.attr('id', element.attr('id') || 'original-text-' + Math.floor(Math.random(seed)*10000));

    // look for an existing truncated version of this element
    var truncated_element = $('#' + element.attr('id') + '-truncated');

    if(!truncated_element.length) {
    // if a truncated element doesn't exist, clone the element and change its id / content to the truncated versions
      truncated_element = element.clone();
      truncated_element.attr('id', element.attr('id') + '-truncated');
      truncated_element.html(truncated_text);
      element.after(truncated_element);
    } else {
    // otherwise, just replace the text content with the truncated text
      truncated_element.html(truncated_text);
    }
    
    // assign event handlers to the "more" and "less" links on the element and its truncated sibling
    element.find('.less').on(SNI.M.touchEndEvent, function() {
      element.hide();
      truncated_element.show();
    }).on('click', function() {return false});

      truncated_element.find('.more').on(SNI.M.touchEndEvent, function() {
      truncated_element.hide();
      element.show();
    }).on('click', function() {return false});
    
    // set one of the siblings to visible and the other to hidden based on the {showTruncatedDefault} option
    if(options.showTruncatedDefault) {
      element.hide();
      truncated_element.show();
    } else {
      element.show();
      truncated_element.hide();
    }
  };