var content = $('#loaded-content');
var mp4Vid = $('#mp4Source');
var webmVid = $('#webmSource');
var ogvVid = $('#ogvSource');
var wrapper = $('#video-viewport');
var productVideo = $('#product-demo');
var productVideoElem = document.getElementById('product-demo');
var playTrigger = $('section#hero h1');
var logo = $('header h1.logo');
var appStoreBadge = $('#ios-badge');
var thingsToHide = $('header h1, #share-tease, #share-buttons, header nav a.button, #ios-badge, section#hero h1')
var container = $('div#section-container')


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Variables are in shared.js
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//
// Load only the appropriate product demo video sources
//
/////////////////////////////////////////////////////////

$(function(){
    if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i)) {
        mp4Vid.attr('src', "videos/movie.mp4");
        webmVid.attr('src', "videos/movie.webm");
        ogvVid.attr('src', "videos/movie.ogv");
    } else {
        mp4Vid.attr('src', "videos/movie.mp4");
        webmVid.attr('src', "videos/movie.webm");
        ogvVid.attr('src', "videos/movie.ogv");
    }
    productVideoElem.load();
});

/////////////////////////////////////////////////////////
//
// Hero video play trigger
//
/////////////////////////////////////////////////////////

    

    function closeVideo() {
      productVideoElem.pause();
      $('section#hero').removeClass('playing');
      wrapper.css('z-index','5').animate({
          opacity: 0,
      },300);
      
      logo.attr('style','').removeClass('radiate').addClass('light');
      appStoreBadge.attr('style','');

      setTimeout(function() {
        thingsToHide.removeClass('hidden');
        $('header a.button.download').addClass('prominent');
        productVideoElem.load();
      },500);
    }

    

    playTrigger.on('click', function() {
      if ($(this).hasClass('scroll-instead')) { 
        toNextSection();
      }
      else {
         $('section#hero').addClass('playing');
         thingsToHide.addClass('hidden');
          wrapper.css('z-index','11').animate({
                opacity: 1
            },1000);
          productVideoElem.play();
      }
    });

    playTrigger.on('touchstart', function() {
      if ($(this).hasClass('scroll-instead')) { 
        toNextSection();
      }
      else { // Just load the video directly so iOS uses its default play UI
        window.location.href = "videos/movie.mp4"
      }
    });



    productVideoElem.addEventListener('ended',videoEnded,false);

    function videoEnded(e) {
        if(!e) { e = window.event; }
        playTrigger.addClass('scroll-instead').html('Scroll it<i>&#xe003;</i>').fitText(.7)
        closeVideo();
    }

    $(document).keyup(function(e) { 
      if (e.keyCode == 27) {
        videoEnded();
      }
    });

    wrapper.on('touchstart', function() {
        closeVideo();
    });
  


/////////////////////////////////////////////////////////
//
// Background-size: cover behavior for video
//
/////////////////////////////////////////////////////////

var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;


jQuery(function() { // runs after DOM has loaded
    if(!navigator.userAgent.match(/(iPhone|iPod|Android)/i)) {
      vid_w_orig = parseInt(productVideo.attr('width'));
      vid_h_orig = parseInt(productVideo.attr('height'));
      $(window).resize(function () { resizeToCover(); });
      $(window).trigger('resize');
    }
    
});

function resizeToCover() {
    
    // set the video viewport to the window size
    wrapper.width($(window).width()).height($(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = $(window).width() / vid_w_orig;
    var scale_v = $(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    productVideo.width(scale * vid_w_orig).height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    wrapper.scrollLeft(($('video').width() - $(window).width()) / 2).scrollTop(($('video').height() - $(window).height()) / 2);  
}
 