class GamePhysics{

  doKillCheck(){
    let killBodies = Game.getKillBoxes();
    let playerBody = Game.player.arcadeBody2D;
    killBodies.forEach(killbox=>{
      let killBody = killbox.getBody();
      if(killBody != null && killBody.getEnabled() && killBody !== playerBody){
        if(Sup.ArcadePhysics2D.intersects(playerBody, killBody)) {
           killbox.trigger();
        }
      }
    });
  }
}