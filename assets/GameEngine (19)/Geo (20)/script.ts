namespace Geo{
  let epiCenterLatitude = 0;
  let epiCenterLongitude = 0;

  let roundedLatitude : number;
  let roundedLongitude : number;
  
  let currentLatitude : number;
  let currentLongitude : number;
  
  let epiCenterFound = false;
  
  let latLongDecimals = 2; // Used to determine the size of a geo square where the game will behave equally. Eg. Latitude 59.3 
  
  let positionHasBeenSet = false;
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  export function hasPosition(){
    return positionHasBeenSet;
  }
  
  // Copied from Internet (http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) : number {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  // Public function that will be called whenever the browser detects a new location
  function geoDataReceiver(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    Sup.log('Geo updated: ' + currentLatitude + " - " + currentLongitude);
    
    if (!epiCenterFound) {
      setEpiCenter()
    }
    
    positionHasBeenSet = true;
  }
  
  function geoError() {
    // Take care of Geo Error...
    Sup.log('Error getting geo information');
  }
  
  function setEpiCenter() {
    let geoDivider = Math.pow( 10, latLongDecimals );
    
    roundedLatitude  = Math.round( currentLatitude * geoDivider ) / geoDivider;
    roundedLongitude  = Math.round( currentLongitude * geoDivider ) / geoDivider;


    // Randomize a location within the geographical area that gets the same geoSeed
    let randMax = 0.5 / geoDivider; 
    let rand = new Random.RNG (new Date().toDateString()); // Todo: We should have a date component of the seed to change location every day

    let randLat = rand.random(-randMax, randMax); 
    let randLong = rand.random(-randMax, randMax); 
    

    epiCenterLatitude = roundedLatitude + randLat;
    epiCenterLongitude = roundedLongitude + randLong;
    epiCenterFound = true;
  }
  
  export function getDistanceFromEpiCenter() : number {
    return getDistanceFromLatLonInKm ( epiCenterLatitude, 
                                       epiCenterLongitude, 
                                       currentLatitude, 
                                       currentLongitude);
  }

  export function getGeoBasedSeed():string{
    // Truncate the geo codes to get the effect that all within an area get the same seed
    if (!epiCenterFound) {
      setEpiCenter()
    }
    
    let strLatitude = roundedLatitude.toString();
    let strLongitude = roundedLongitude.toString();
    
    return strLatitude + ";" + strLongitude + ";" + new Date().toDateString();
  }

  // Public function that must be called at the start of the game
  export function initializeGeoLocation(){
    window.navigator.geolocation.watchPosition(geoDataReceiver, geoError,{enableHighAccuracy : true, maximumAge:1000});  
  }

}