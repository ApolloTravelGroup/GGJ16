interface KillBox{
  trigger();
  getBody():Sup.ArcadePhysics2D.Body;
  getActor():Sup.Actor;
}

class KillBoxBehavior 
  extends Sup.Behavior
  implements KillBox{

  private isTriggered:boolean;
    
  trigger(){
    if(!this.isTriggered) {
      Sup.log("You died");
      this.isTriggered = true;
      Game.player.getBehavior( PlayerBehavior ).die();
    }
  }
    
  getBody():Sup.ArcadePhysics2D.Body{
    return this.actor.arcadeBody2D;
  }
    
  getActor():Sup.Actor{
    return this.actor;
  }
    
  awake() {
    Game.registerKillBox(this);
  }

  update() {
    //if(this.isTriggered)
     // Sup.log("you are dead...");
  }
}
Sup.registerBehavior(KillBoxBehavior);
