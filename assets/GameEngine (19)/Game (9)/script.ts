 enum rootControllerState{Undefined,StartScreen,Instructions,InGame,GameOver, Switching}

namespace Game{
  
  let killItems:KillBox[] = [];
  let paused = true;
  let started = false;
  
  let audioManager:AudioManager;
  
  let saidHello = false;
  
  export var player:Sup.Actor;
  
  export var Physics:GamePhysics;
  
  export var state : rootControllerState = rootControllerState.Undefined; 
  export var lastState : rootControllerState = rootControllerState.Undefined; 
  
  let verticalGravity = -0.012;
  let horizontalSpeed = 0.3;
  
  export function isPaused(){
    return paused;  
  }
  
    export function isStarted(){
    return started;  
  }
  
  export function Init(){
    audioManager = new AudioManager();
    
    Game.Physics = new GamePhysics();
    if(!saidHello){
      saidHello = true;
      AudioManager.PlayIntro();
    }
  }
  
  export function Start() {
    new Sup.Actor("LevelRoot").setPosition(0,0);
    Game.player.getBehavior(PlayerBehavior).revive();
    LevelGenerator.Generate(30);
    Sup.ArcadePhysics2D.setGravity(horizontalSpeed, verticalGravity);
    started = true;
    paused = false;
    AudioManager.StopMusic();
    //audioManager.playInSequence("Sounds/Speech/Exploring","Sounds/Speech/AlphaCentauri","Sounds/Speech/ComeHome");
  }
  
  export function registerKillBox(pickup:KillBox){
    killItems.push(pickup);
  }
  
    export function unregisterKillBox(pickup:KillBox){
      let index = killItems.indexOf(pickup);
      if(index > -1)
        killItems.splice(index, 1);
  }
  
   export function getKillBoxes():KillBox[]{
      return killItems;
    }
    
  export function Pause(){
    if(!paused){
      paused = true;
    Sup.getActor("LevelRoot").destroy();
    killItems = [];
    Start();
    }
    /*if(paused)
      Start();
    else{
      Sup.ArcadePhysics2D.setGravity(0,0);
      paused = true;
      
    }
    */
  }
}




