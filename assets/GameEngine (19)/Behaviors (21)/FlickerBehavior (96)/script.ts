class FlickerBehavior extends Sup.Behavior {
  followActorName:string;
  private followActor:Sup.Actor;

  awake() {
    if(this.followActorName != null){
      this.followActor = Sup.getActor(this.followActorName);
    }
  }

  maxOpacity = 0.75;
  private r = new Random.RNG("hello");
  private offsetX = 0;
  private offsetY = 0;
  private count = 0;
  private goUp = true;
  private maxUpdateFreq = 25;
  private frequency = 1000;

  update() {
    if(this.followActor != null){
      this.frequency++;
      if(this.frequency>this.maxUpdateFreq){
        this.frequency = 0;
    if(this.goUp)
    this.count ++;
    else this.count --;
    
    //get difficulty
      let distance = Geo.getDistanceFromEpiCenter();
      Sup.log("distance: " + distance.toString());
      let maxdistance = 3;
      
      let difficultyPercentage = 0.0;
      //max difficulty at 5km min at 0
      if(distance > maxdistance) difficultyPercentage = 1.0;
      else difficultyPercentage = distance / maxdistance;
      
    if(this.count > 500 || this.count < -500) this.goUp = !this.goUp;
    
    this.offsetX += ((this.r.random(0,50)/2)-25)/100;
    this.offsetY += ((this.r.random(0,50)/2)-25)/100;
      
    if(Math.abs(this.offsetX) > 10 || Math.abs(this.offsetY) > 10)
      {this.offsetX = 0;
      this.offsetY = 0;
      }
      
    let randomPercentage = (Math.sin(this.r.random(0,100)/100)-this.count/500);
    
   
    this.actor.spriteRenderer.setOpacity(this.maxOpacity *((difficultyPercentage*0.8) + (randomPercentage*0.2)));

      }
      
    this.actor.setX(this.followActor.getX() + this.offsetX);
    this.actor.setY(this.followActor.getY() + this.offsetY);
    }
  }
}
Sup.registerBehavior(FlickerBehavior);
