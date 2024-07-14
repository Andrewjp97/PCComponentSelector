const { Pool } = require('pg')
const pool = new Pool({
    host: '172.17.0.4',
    port: 5432,
    user: 'andrewpaterson',
    password: 'andrewpaterson',
    database: 'andrewpaterson'
});

module.exports = pool