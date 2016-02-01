

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.30;
  isAlive = true;

  awake(){
    Game.player = this.actor;
  }

  update() {
    if(!Game.isStarted()){
      if(Geo.hasPosition()){
        //LevelGenerator.Generate(30);
        Game.Start(); 
      }
    }
    
    if(!Game.isPaused() && Game.isStarted()){
    //check kill collisions
    Game.Physics.doKillCheck();
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    if( this.isAlive ){
      // As explained above, we get the current velocity
      let velocity = this.actor.arcadeBody2D.getVelocity();

      // We override the `.x` component based on the player's input
      if (Sup.Input.isKeyDown("LEFT")) {
        //velocity.x = -this.speed;

        // When going left, we flip the sprite
        this.actor.spriteRenderer.setHorizontalFlip(true);
      } else if (Sup.Input.isKeyDown("RIGHT")) {
//        velocity.x = this.speed;

        // When going right, we clear the flip
        this.actor.spriteRenderer.setHorizontalFlip(false);
      } else {
        velocity.x = 0;
      }
      // If the player is on the ground and wants to jump,
      // we update the `.y` component accordingly
      //let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
      //if(touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP") || Sup.Input.wasMouseButtonJustPressed(0))
      {
        velocity.y = this.jumpSpeed;
        
      } 
/*
      else {
          // Here, we should play either "Idle" or "Run" depending on the horizontal speed
          if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Run");
          else this.actor.spriteRenderer.setAnimation("Run");
        }
      } else {
        // Here, we should play either "Jump" or "Fall" depending on the vertical speed
        if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
        else this.actor.spriteRenderer.setAnimation("Fall");
      }
*/
      if(this.actor.getX() > 20) {
          //Sup.log( this.actor.getX() );
          //this.actor.getParent().getChild("Camera").moveLocalX(1);
      }
      
      
      if(this.actor.arcadeBody2D.getVelocity().y < 0 - this.jumpSpeed/2)
        this.actor.spriteRenderer.setAnimation("Fall",true);
      else if(this.actor.arcadeBody2D.getVelocity().y > this.jumpSpeed /2) 
        this.actor.spriteRenderer.setAnimation("Jump",true);
      else
        this.actor.spriteRenderer.setAnimation("Run",true);
      
      // Finally, we apply the velocity back to the ArcadePhysics body
      this.actor.arcadeBody2D.setVelocity(velocity);
      
      if(this.actor.getY() < -10 ) this.die();
    }
    else{
      this.actor.arcadeBody2D.setVelocity(0,0);
      Game.Pause();
    }
    }
  }

  adjustJumpspeed(){
    this.jumpSpeed = 0.2+(100-this.getDifficultyLevel())/300;
    Sup.log("jump speed: " + this.jumpSpeed);
  }

  // Returns the diffculty level as a value between 0 and 100, where 100 is most difficult
  private getDifficultyLevel() : number {
    // return 0;
    /*
    let currentDate = new Date()
    let currentSeconds = currentDate.getSeconds()
    let difficultyLevel = (60-currentSeconds) * 100 / 60  */

    let distanceFromEpicenter = Geo.getDistanceFromEpiCenter(); // Distance in kilometers
    Sup.log("distanceFromEpicenter = " + distanceFromEpicenter);
    let difficultyLevel = distanceFromEpicenter*50;
    if (difficultyLevel>100) {
      difficultyLevel = 100;
    }

    Sup.log("difficultylevel = " + difficultyLevel);
    return difficultyLevel;  
  }

  // Returns the...
  private getLocation() : number {
    let currentLocation = new Date()
    let currentLocationValue = 100  

    return currentLocationValue  
  }

  private pickupItems(){
    let touches = this.actor.arcadeBody2D.getTouches();
    /*for(let touch in touches){
      //touch.
    }*/
  }

  die() {
    if( this.isAlive ){
      Game.Pause();
      this.isAlive = false;
      this.actor.spriteRenderer.setAnimation( "Die", false );
      Sup.Audio.playSound("Sounds/KillSound2");
      
    }
  }

  revive() {
    this.isAlive = true;
    this.actor.arcadeBody2D.warpPosition(0,0);
  }
}
Sup.registerBehavior(PlayerBehavior);
