const axios = require("axios").default;
const BASE_URL = "https://nominatim.openstreetmap.org";


class NominatimWrapper {
  
  constructor (base_url) {
    this.base_url = base_url
  }

  async queryAddress (address) {
    return axios.get(`${BASE_URL}/search?`, {
      params: {
        q: address,
        format: "json"
      }
    })
  }
}


module.exports = {
  nominatimController: new NominatimWrapper(BASE_URL)
}