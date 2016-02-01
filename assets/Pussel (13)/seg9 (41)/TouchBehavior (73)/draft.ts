class TouchBehavior extends Sup.Behavior {
  doorName : string;
private donePrinted : boolean = false;

  awake() {
    
  }


  update() {
    if(Sup.ArcadePhysics2D.intersects(Game.player.arcadeBody2D, this.actor.arcadeBody2D)){
      Sup.log("open door");
      let door = this.actor.getChild(this.doorName);
      let doorOpener = door.getBehavior(OpenDoorBehavior);
      doorOpener.open();
    }
  }
}
Sup.registerBehavior(TouchBehavior);
