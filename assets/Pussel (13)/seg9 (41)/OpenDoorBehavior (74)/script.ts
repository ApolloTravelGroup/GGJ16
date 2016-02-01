class OpenDoorBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(this.shouldOpen && !this.isOpen){
      Sup.Audio.playSound("Sounds/DoorOpen");
      let pos = this.actor.getPosition();
      this.actor.arcadeBody2D.warpPosition(pos.x,pos.y+2);
      this.isOpen = true;
    }
  }
  private shouldOpen = false;
    private isOpen = false;

  open(){
    this.shouldOpen = true;
  }
}
Sup.registerBehavior(OpenDoorBehavior);
