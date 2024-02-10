/*
* Palo Alto Theme
*
* Use this file to add custom Javascript to Palo Alto.  Keeping your custom
* Javascript in this fill will make it easier to update Palo Alto. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line

  $('.scroll-to-lead').on('click', () => {
    //$('body').scrollTo('[href="#lead-form"]');
    //$('[href="#lead-form"]').get(0).scrollIntoView({behavior: 'smooth'});
    $('html, body').animate({ scrollTop: $('[href="#lead-form"]').offset().top - 200}, "slow", "linear");
  })
 
  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();
     
