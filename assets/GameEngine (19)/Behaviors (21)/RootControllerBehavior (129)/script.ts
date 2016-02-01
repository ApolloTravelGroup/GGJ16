
class RootControllerBehavior extends Sup.Behavior {
  
  private initialScreen : Sup.Actor;
  private gameScreen : Sup.Actor;
  private instructionScreen : Sup.Actor;
  private gameOverScreen : Sup.Actor;
  
  awake() {
    
  }

  update() {
    
    if(Game.state == rootControllerState.Undefined){
      Geo.initializeGeoLocation();
      Game.state = rootControllerState.StartScreen;
    }
    
    let tempState = Game.state;
    if(Game.state != Game.lastState && Game.state != rootControllerState.Switching ){
    
      Game.state = rootControllerState.Switching;
      
      Sup.log("switching state..." + tempState);
      switch(tempState){
          
        case rootControllerState.StartScreen:
          //start everything up
          this.initialScreen = this.navigateToScene("Scenes/Children/InitialScreen");
          this.destroyOtherScreens(this.initialScreen);
          break;
        case rootControllerState.InGame:
          Sup.log("going to game state");
          this.gameScreen = this.navigateToScene("Scenes/Children/Game");
          this.destroyOtherScreens(this.gameScreen);
          break;
        case rootControllerState.Instructions:
          Sup.log("going to instructions");
          this.instructionScreen = this.navigateToScene("Scenes/Children/Instructions");
          this.destroyOtherScreens(this.instructionScreen);
          break;
        default:
          break;
      }
      Game.state = tempState;
      Game.lastState = tempState;
    }
  }

navigateToScene(screen:string):Sup.Actor{
  let newScene = new Sup.Actor("scene" + new Date().toString());
  newScene.setPosition(0,0,0);
  Sup.appendScene(screen, newScene);
  return newScene;
}

  destroyOtherScreens(protectScreen:Sup.Actor){
      if(this.initialScreen != null && protectScreen !== this.initialScreen) this.initialScreen.destroy();
      if(this.gameScreen != null && protectScreen !== this.gameScreen) this.gameScreen.destroy();
      if(this.gameOverScreen != null && protectScreen !== this.gameOverScreen) this.gameOverScreen.destroy();
      if(this.instructionScreen != null && protectScreen !== this.instructionScreen) this.instructionScreen.destroy();
  }
}



Sup.registerBehavior(RootControllerBehavior);
