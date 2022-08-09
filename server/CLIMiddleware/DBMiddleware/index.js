const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const ENTRY_SIZE_LIMIT = 200;

class DataBase {
  constructor (max_entries=ENTRY_SIZE_LIMIT) {
    this.max_entries
    this.entries = [];
  }
  
  postSearchRequest = ({origin, destination, distance}) => {
    if (!origin || !destination || !distance) {
      return {success: false, message: "At least one parameter is undefined"};
    }
    const id = uuidv4();
    var createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
    if (this.entries.length >= this.max_entries) {
      this.entries.shift();
    }
    this.entries.push(
      {id,createdAt,origin,destination,distance}
    );
    return {success:true, message: "Ok"}
  }
  
  getSearchRequests = () => {
    return this.entries;
  }
  
}

module.exports = {
  db: new DataBase()
}