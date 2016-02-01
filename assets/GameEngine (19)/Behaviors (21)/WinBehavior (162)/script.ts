class WinBehavior extends Sup.Behavior {
  
  private isWon = false;
  
  awake() {
    this.isWon = false;
  }

  update() {
    if(this.isWon){
      if(Sup.Input.wasMouseButtonJustPressed(0) || Sup.Input.wasTouchEnded(0))
        Game.state = rootControllerState.StartScreen;
    }
    else if(Sup.ArcadePhysics2D.intersects(Game.player.arcadeBody2D, this.actor.arcadeBody2D)){
      this.isWon = true;
      Game.Pause();
      this.actor.getChildren().forEach(c=>c.setVisible(true));
    }
  }
}
Sup.registerBehavior(WinBehavior);
