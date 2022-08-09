const { db } = require("../DBMiddleware");
const { distanceCalculator } = require("../DistanceCalculator");
const { nominatimController } = require("../Nominatim");

class Core {
  
  constructor (db, distanceCalculator, nominatimController) {
    this.db = db;
    this.distanceCalculator = distanceCalculator;
    this.nominatimController = nominatimController;
  }

}

// Thanks 
// https://www.dofactory.com/javascript/design-patterns/singleton
// for providing an implementation of singleton gof design patter
const CoreFactory = (function () {
  let instance;
  
  function createInstance() {
    const newCore = new Core(
      db,
      distanceCalculator,
      nominatimController
    );
    return newCore;
  }
  
  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();

module.exports = {
  CoreFactory
}