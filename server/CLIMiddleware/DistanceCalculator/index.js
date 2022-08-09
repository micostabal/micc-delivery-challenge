const geolib = require("geolib");
const STD_SCALE = 1000;

class DistanceCalculator {
  
  constructor (scaler) {
    this.scaler=scaler;
  }
  
  getDistance(p1, p2) {
    const {lat: p1Latitude, lon: p1Longitude} = p1;
    const {lat: p2Latitude, lon: p2Longitude} = p2;
    
    return geolib.getDistance(
      { latitude: Number(p1Latitude), longitude: Number(p1Longitude) },
      { latitude: Number(p2Latitude), longitude: Number(p2Longitude) }
    ) / this.scaler
  }

}

module.exports= {
  distanceCalculator: new DistanceCalculator(STD_SCALE)
}