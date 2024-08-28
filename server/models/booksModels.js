require('dotenv').config();
const path = require('path');
const { Pool } = require('pg');

console.log(process.env.DB_USER); // For debugging
console.log("hiiiiiiiiiiiiiiiiiiii");


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Successfully connected to the database');
    release();
  }
});
console.log("nigga");
module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then(res => {
          console.log('Executed query', text);
          resolve(res);
        })
        .catch(err => {
          console.error('Error executing query', err.stack);
          reject(err);
        });
    });
  },
};