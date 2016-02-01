class AudioManager
  {
    private audioQueue:string[] = [];
    private timerId:number;
    private soundPlayer:Sup.Audio.SoundPlayer;
    private checkingSoundPlayer = false;

    constructor(){}

    playInSequence(sound1:string, sound2?:string, sound3?:string, sound4?:string){
      this.audioQueue = [];
      if(sound4!=null)this.audioQueue.push(sound4);
      if(sound3!=null)this.audioQueue.push(sound3);
      if(sound2!=null)this.audioQueue.push(sound2);

      
      this.soundPlayer = Sup.Audio.playSound(sound1);
      Sup.log(this.soundPlayer);
      this.timerId = Sup.setInterval(50,()=>this.checkPlayer());
      
    }    

stop(){
  Sup.clearInterval(this.timerId);
  if(this.soundPlayer != null) this.soundPlayer.stop();
}

    private checkPlayer(){
      if(!this.checkingSoundPlayer && this.soundPlayer != null){
        this.checkingSoundPlayer = true;
        
        if(this.soundPlayer.getState() == Sup.Audio.SoundPlayer.State.Stopped){
          if(this.audioQueue.length == 0){
            Sup.clearInterval(this.timerId);
            this.soundPlayer = null;
          }
          else{
            let sound = this.audioQueue.pop();
            if(sound != null){
              this.soundPlayer = Sup.Audio.playSound(sound);
            }
          }
        }
        this.checkingSoundPlayer = false;
      }
    }

    private static musicPlayer:Sup.Audio.SoundPlayer;
    
    public static PlayIntro(){
     this.musicPlayer = Sup.Audio.playSound("Music/Intro",1.0,{loop:true});
    }


    public static StopMusic(){
      if(this.musicPlayer != null){
        this.musicPlayer.stop();
        this.musicPlayer = null;
      }
    }

  }