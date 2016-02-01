class InstructionsBehavior extends Sup.Behavior {
  private audioManager = new AudioManager();
  awake() {
    this.audioManager.playInSequence("Sounds/Speech/Instructions");
  }

  onDestroy(){
    this.audioManager.stop();
  }
}
Sup.registerBehavior(InstructionsBehavior);
