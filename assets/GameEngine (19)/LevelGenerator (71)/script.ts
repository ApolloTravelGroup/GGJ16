namespace LevelGenerator{
  
  export function Generate(nrOfSegments:number):string[]{
    let segments:string[] = [];
    var seed = Geo.getGeoBasedSeed();
    Sup.log("Geoseed: " + seed);
    var rand = new Random.RNG(seed);
    
    
    let origo = Game.player.getPosition();
    origo.x-=5;
    origo.y-=10;
    let segmentCount = 0;
    let root = Sup.getActor("LevelRoot");

    addSegment(1, segmentCount, root, origo);
    segmentCount++;
    addSegment(1, segmentCount, root, origo);
    
    for(let i= 1;i<nrOfSegments;i++){
      segmentCount++;
      let segnr:number = rand.random(1,13);
      addSegment(segnr, segmentCount, root, origo);    
    }
    //addSegment(14, segmentCount, root, origo);
    let sceneHolder = new Sup.Actor("new-win", root);
    sceneHolder.setX(origo.x);
    sceneHolder.setY(origo.y);
    sceneHolder.setZ(0);
    Sup.log("win at " + origo.x.toString() + ":" + origo.y);
    Sup.appendScene("Pussel/PreFabSeg/Win", sceneHolder);
    
    return segments;
  }
  
  function addSegment(name:number, count:number, root:Sup.Actor, origo:Sup.Math.Vector3){
    Sup.log("start" + origo.x);
    Sup.log("starty" + origo.y);
      Sup.log("generate " + count.toString() + ":" + name.toString());
    let sceneHolder = new Sup.Actor("new" + count.toString(), root);
    sceneHolder.setX(origo.x);
    sceneHolder.setY(origo.y);
    sceneHolder.setZ(0);
    let scene5 = Sup.appendScene("Pussel/PreFabSeg/PrefabSeg" + name.toString(), sceneHolder);
  
      origo.x+=scene5[0].tileMapRenderer.getTileMap().getWidth();

    Sup.log("end" + origo.x);
        Sup.log("endy" + origo.y);
  }
  
  
}