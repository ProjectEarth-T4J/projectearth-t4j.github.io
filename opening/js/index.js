StarWars = (function() {
  
  /* 
   * Constructor
   */
  function StarWars(args) {
    // Context wrapper
    this.el = $(args.el);
    
    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);
    
    // Start the animation
    this.start = this.el.find('.start');
    
    // The animation wrapper
    this.starwarsAnimation = this.el.find('.starwars-animation');
    
    // Remove animation and shows the start screen
    this.reset();

    // Start the animation on click
    
    this.start.bind('click', $.proxy(function() {
      this.start.hide();
      this.audio.play();
      this.el.append(this.starwarsAnimation);
      starwarsAnimationEndCount=0;
    }, this));
    
    let starwarsAnimationEndCount=0;
    $(this.starwarsAnimation).bind('animationend', $.proxy(function() {
      if (starwarsAnimationEndCount == 2) window.location.href = "";
      console.log(starwarsAnimationEndCount);
      starwarsAnimationEndCount++;
    }, this));
    

  }
  
  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    this.start.show();
    this.cloned = this.starwarsAnimation.clone(true);
    this.starwarsAnimation.remove();
    this.starwarsAnimation = this.cloned;
  };
  return StarWars;
})();

new StarWars({
  el : '.starwars'
});
