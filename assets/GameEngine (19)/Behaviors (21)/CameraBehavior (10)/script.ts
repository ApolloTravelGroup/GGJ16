class CameraBehavior extends Sup.Behavior {
  
  followActor:string = null;
  private otherActor:Sup.Actor;
  private hasFollowed = false;

  awake() {
     
  }

  update() {
    if(this.otherActor == null && this.followActor != null){
      this.otherActor = Sup.getActor(this.followActor); 
    }   
    
    if(this.otherActor != null){
      this.hasFollowed = true;
        this.actor.setX(this.otherActor.getX());
        this.actor.setY(this.otherActor.getY());
       }
    else if(this.hasFollowed){
      this.hasFollowed = false;
      this.actor.setX(0);
      this.actor.setY(0);
    }
  }
}

Sup.registerBehavior(CameraBehavior);
