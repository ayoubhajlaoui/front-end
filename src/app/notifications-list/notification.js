$(function(){
  
    //element cache
    var $nnAlert = $('.nn-alert-container');
    
    //.on instead of .click for live binding
    $nnAlert.on('click', '.nn-alert', function(){
       hideAlert($(this));
    });
    
    function bindAnimationEnd(){
      //listen to animation end, then hide the element definitely
      $('.nn-alert').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).html('');
        $(this).addClass('hide');
      });
    }
      
    //one call for handwritten html alerts
    bindAnimationEnd();
    
    
    function createAlert(opts){
  
      var icon, //any icon form fontawesome would fit
          title,
          text,
          alertTemplate,
          color;
      
      if(opts === undefined){
        opts = {};
      }
          
      icon = opts.icon || 'check';
      title = opts.title || 'New notification';
      text = opts.text || 'lorem ipsum dolor',
      color = opts.color || '';
      
      alertTemplate = '<div class="nn-alert '+color+'"><i class="fa fa-'+icon+'"></i><strong>'+title+'</strong><p>'+text+'</p></div>';
      
      $(alertTemplate).fadeIn().appendTo('.nn-alert-container');
      bindAnimationEnd();
    }
  
    function hideAlert($alert){
      $alert.addClass('animated bounceOutLeft');
    }
     
    
    //demo start
    //createAlert({icon:'exclamation-triangle'});
  
    //hack for testing colors
    $('.color').click(function(){ 
      $('.nn-alert').removeClass('pink purple blue glass').addClass($(this).attr('class'));
    });
    
    var cnt = 0,
        icons = [ 'paperclip',
                  'exclamation-triangle',
                  'exclamation-circle',
                  'info-circle',
                  'check'],
        colors = ['none','none','none','none','none','pink'];
    
    //create alert with random icon 
    setInterval(function(){
      hideAlert($('.nn-alert').eq(cnt));
      createAlert(
        {icon:icons[Math.floor(Math.random()*icons.length)],
         title:'New notification '+cnt,
         color:colors[Math.floor(Math.random()*colors.length)],}
      );
      cnt++;
    },3000);
    //demo end
  });