
class DialogBehavior extends Sup.Behavior {
  targetState:string;
  private masterCamera:Sup.Camera;

  awake() {
    
      Sup.log("waking dialog");
    let cameraActor = Sup.getActor("Camera");
    if(cameraActor != null)
      this.masterCamera = cameraActor.camera;
  }

  update() {
    if(this.masterCamera != null){
      let interactionPoint:Sup.Math.Vector2;
      let hasInteraction = false;
      if(Sup.Input.wasTouchEnded(0)){
        interactionPoint = Sup.Input.getTouchPosition(0);
        hasInteraction = true;
      }
      else if(Sup.Input.wasMouseButtonJustReleased(0))
        {
        interactionPoint = Sup.Input.getMousePosition();
          hasInteraction = true;
        }

      if(hasInteraction){
        Sup.log("has interaction");

        let ray = new Sup.Math.Ray();
        ray.setFromCamera(this.masterCamera, interactionPoint);
       let hits = ray.intersectActor(this.actor);
        if(hits.length > 0){
        switch(this.targetState){
          case "StartGame":
            Game.state = rootControllerState.InGame;
            break;
          case "StartScreen":
            Game.state = rootControllerState.StartScreen;
            break;
          case "Instructions":
            Game.state = rootControllerState.Instructions;
          default:
            break;
        }
        }
      }
    }
  }
}
Sup.registerBehavior(DialogBehavior);
