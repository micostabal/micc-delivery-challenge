const { CoreFactory } = require("../Core");

const core = CoreFactory.getInstance();

class Controller {
  
  constructor (core) {
    this.core = core;
  }

  handleOriginDestinationRequest = async (origin, destination) => {
    const payload = {
      errorMessages: {},
      result: {},
      success: false
    };
    
    const promiseOrigin = this.core.nominatimController.queryAddress(
      origin
    );
    
    const promiseDestination = this.core.nominatimController.queryAddress(
      destination
    );
    
    let [{data: resultsOrigin}, {data: resultsDestination}] = await Promise.all(
      [promiseOrigin, promiseDestination]
    );
    
    if (resultsOrigin.length === 1 && resultsDestination.length === 1) {
      payload.success = true;
      const distance = this.core.distanceCalculator.getDistance(
        resultsOrigin[0],
        resultsDestination[0]
      );
      payload.result.distance = distance;
      this.core.db.postSearchRequest({
        origin,
        destination,
        distance
      });
    } else {
      payload.errorMessages.originLength = resultsOrigin.length;
      payload.errorMessages.destinationLength = resultsDestination.length;
    }
    return payload;
  };
  
  handleGetEntriesRequest = () => {
    return this.core.db.getSearchRequests();
  }
}

module.exports = {
  controller: new Controller(core)
};