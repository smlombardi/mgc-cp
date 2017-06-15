
  //  $(document).bind('mobileinit',function(event){
    //  window.console && console.log( event.type + 'event triggered');
    //});

    var $pages = $("div[data-role='page']");

    $(window).bind('orientationchange orientationchange.htmlclass', function(event){
      if (window.console) {
        window.console && console.log(event.type + ' event triggered');
      }
    });

    $(window.document).bind('mobileinit', function(event){
      if (window.console) {
        window.console && console.log(event.type + ' event triggered');
      }  
    });
    
    $('body').on('pagebeforecreate pagecreate pagebeforehide pagebeforeshow pageshow pagehide',$pages,function(event){
      if (window.console) {
        window.console && console.log( event.type + ' event triggered for ' + $(this).attr('id'));
      }
    });
    

