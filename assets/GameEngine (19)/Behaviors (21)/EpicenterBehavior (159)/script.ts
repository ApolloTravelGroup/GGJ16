class EpicenterBehavior extends Sup.Behavior {
  awake() {
    
  }

  private updateFreq = 90;
  private freqCount = 0;  

  update() {
    this.freqCount++;
    if(this.freqCount > this.updateFreq){
      this.freqCount = 0;
      if( Geo.hasPosition ){
        let distance = Math.round( Geo.getDistanceFromEpiCenter() * 1000 );

        this.actor.textRenderer.setText( "Distance to epicenter: " + distance.toString() + " m" );
      }
      else Sup.log('no position for epicenter');
    }
  }
}
Sup.registerBehavior(EpicenterBehavior);
