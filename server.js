const express = require('express');
const pool = require('./db');
const port = 1338;

const app = express();
app.use(express.json());

app.get('/ram', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM ram');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/ram', async (req, res) => {
    const { name,
            brand,
            description,
            dims,
            speed,
            ddrClass,
            capacity,
            photoURL1,
            photoURL2,
            photoURL3,
            photoURL4,
            photoURL5,
            microcenterLink,
            amazonLink,
            neweggLink,
            bestbuyLink
        } = req.body;
    try {
        await pool.query('INSERT INTO ram (name, brand, description, dims, speed, ddrclass, capacity, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', 
            [name, brand, description, dims, speed, ddrClass, capacity, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added RAM to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/ram/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE ram (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), dims VARCHAR(255), speed VARCHAR(255), ddrclass VARCHAR(255), capacity VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/ram/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE ram');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});