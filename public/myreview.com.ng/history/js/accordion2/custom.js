//$(function(){
//  $(".haccordion > li").hover(
//    function(){
//      var $this = $(this);
//      $this.stop().animate({"width": "300px"},500);
//      $('.heading', $this).stop(true,true).fadeOut();
//      $('.bgDescription', $this).stop(true,true).slideDown(500);
//      $('.description',$this).stop(true,true).fadeIn();
//    },
//    function(){
//      var $this = $(this);
//      $this.stop().animate({"width": "120px"},500);
//      $('.heading', $this).stop(true,true).fadeIn();
//      $('.bgDescription', $this).stop(true,true).slideUp(500);
//      $('.description',$this).stop(true,true).fadeOut();
//    }
//  )
//});

if ( $(window).width() > 640) {     

$(function(){
  $(".haccordion > li").hover(
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "350px"},500);
      $('.heading', $this).stop(true,true).fadeOut();
      $('.bgDescription', $this).stop(true,true).slideDown(500);
      $('.description',$this).stop(true,true).fadeIn();
    },
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "120px"},500);
      $('.heading', $this).stop(true,true).fadeIn();
      $('.bgDescription', $this).stop(true,true).slideUp(500);
      $('.description',$this).stop(true,true).fadeOut();
    }
  )
});

}

else if ( $(window).width() < 450) {     

$(function(){
  $(".haccordion > li").hover(
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "149px"},500);
      $('.heading', $this).stop(true,true).fadeOut();
      $('.bgDescription', $this).stop(true,true).slideDown(500);
      $('.description',$this).stop(true,true).fadeIn();
    },
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "50px"},500);
      $('.heading', $this).stop(true,true).fadeIn();
      $('.bgDescription', $this).stop(true,true).slideUp(500);
      $('.description',$this).stop(true,true).fadeOut();
    }
  )
});

}

else {

$(function(){
  $(".haccordion > li").hover(
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "300px"},500);
      $('.heading', $this).stop(true,true).fadeOut();
      $('.bgDescription', $this).stop(true,true).slideDown(500);
      $('.description',$this).stop(true,true).fadeIn();
    },
    function(){
      var $this = $(this);
      $this.stop().animate({"width": "50px"},500);
      $('.heading', $this).stop(true,true).fadeIn();
      $('.bgDescription', $this).stop(true,true).slideUp(500);
      $('.description',$this).stop(true,true).fadeOut();
    }
  )
});

}
