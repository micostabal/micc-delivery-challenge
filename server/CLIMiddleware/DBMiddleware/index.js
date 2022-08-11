const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');
const moment = require('moment');
const {queries} = require("./utils");
const ENTRY_SIZE_LIMIT = 200;

class DataBase {
  constructor (max_entries=ENTRY_SIZE_LIMIT) {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    this.pool.connect();
  }
  
  createTable = async () => {
    await this.pool.query(queries.CREATE_TABLE);
  }
  
  getSearchRequests = async () => {
    let results;
    try {
      results = await this.pool.query(
        `select * from entries order by createdAt desc limit ${ENTRY_SIZE_LIMIT};`
      );
    } catch(err) {
      throw err;
    }
    return results.rows.map( el => {
      el.createdAt = el.createdat;
      delete el.createdat;
      return el;
    });
  }
  
  postSearchRequest = async ({origin, destination, distance}) => {
    try {
      if (!origin || !destination || !distance) {
        return {success: false, message: "At least one parameter is undefined"};
      }
      const id = uuidv4();
      const createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
      const results = this.pool.query(`
        INSERT INTO entries(id, origin, destination, distance, createdAt)
        VALUES ('${id}', '${origin}','${destination}', ${distance}, '${createdAt}');
      `);
      return JSON.stringify(results);
    } catch(err) {
      return {success:false, message: err.message}
    }
  }
  
}

module.exports = {
  db: new DataBase()
};

