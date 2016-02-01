class ZeroGravityBehavior extends Sup.Behavior {
  awake() {
    this.actor.arcadeBody2D.setCustomGravity(0,0);
  }

  update() {
    
  }
}
Sup.registerBehavior(ZeroGravityBehavior);
