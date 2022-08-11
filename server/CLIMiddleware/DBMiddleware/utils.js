module.exports={
  queries: {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS entries (
      id VARCHAR ( 50 ) PRIMARY KEY,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      distance REAL NOT NULL,
      createdAt VARCHAR ( 50 ) NOT NULL
    );`,
    DELETE_ALL_RECORDS: `DELETE FROM entries`
  }
}