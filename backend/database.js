const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'db.eemi.gabia.io',
  user: 'eemi',
  password: 'eemi220516',
  connectionLimit: 20,
  database: 'dbeemi'
});

module.exports = {
  async run(query, params) {
    return new Promise((resolve, reject)=>{
      pool.getConnection()
      .then(conn => {
        conn.query(query, params)
          .then((rows) => {
            resolve(rows);
            conn.end();
          })
          .catch(err => {
            console.log(err);
            conn.end();
            reject(err)
          })

      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });    
  }
}