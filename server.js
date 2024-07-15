const express = require('express');
const pool = require('./db');
const port = 1338;

const app = express();
app.use(express.json());

app.get('/ram/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE ram (id SERIAL PRIMARY KEY, title TEXT, brand TEXT, description TEXT, dims TEXT, speed TEXT, ddrClass TEXT, capacity TEXT, CASLatency TEXT, timing TEXT, rgb TEXT, model TEXT, voltage TEXT, ecc TEXT, color TEXT, bufferedOrRegistered TEXT, heatSpreader TEXT, photoURLS TEXT ARRAY, microcenterLink TEXT, amazonLink TEXT, neweggLink TEXT, bestbuyLink TEXT)');
        res.status(200).send({message: "Succesfully created
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

app.get('/ram', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM ram');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/ram/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM ram WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/ram', async (req, res) => {
    const { title,
            brand,
            description,
            dims,
            speed,
            ddrClass,
            capacity,
            CASLatency,
            timing,
            rgb,
            model,
            voltage,
            ecc,
            color,
            bufferedOrRegistered,
            heatSpreader,
            photoURLS,
            microcenterLink,
            amazonLink,
            neweggLink,
            bestbuyLink
        } = req.body;
    try {
        await pool.query('INSERT INTO ram (title, brand, description, dims, speed, ddrclass, capacity, caslatency, timing, rgb, model, voltage, ecc, color, bufferedorregistered, heatspreader, photourls, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)', 
            [title, brand, description, dims, speed, ddrClass, capacity, CASLatency, timing, rgb, model, voltage, ecc, color, bufferedOrRegistered, heatSpreader, photoURLS, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added RAM to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE motherboard (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), socket VARCHAR(255), formFactor VARCHAR(255), chipset VARCHAR(255), memoryType VARCHAR(255), memorySlots VARCHAR(255), pcieSlots VARCHAR(255), sataPorts VARCHAR(255), m2Slots VARCHAR(255), photourls TEXT ARRAY, microcenterLink VARCHAR(1000), amazonLink VARCHAR(1000), neweggLink VARCHAR(1000), bestbuyLink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE motherboard');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM motherboard');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM motherboard WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/motherboard', async (req, res) => {
    const { name,
            brand,
            description,
            socket,
            formFactor,
            chipset,
            memoryType,
            memorySlots,
            pcieSlots,
            sataPorts,
            m2Slots,
            photoURLS,
            microcenterLink,
            amazonLink,
            neweggLink,
            bestbuyLink
        } = req.body;
    try {
        await pool.query('INSERT INTO motherboard (name, brand, description, socket, formfactor, chipset, memoryType, memorySlots, pcieslots, sataports, m2slots, photourls, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', 
            [name, brand, description, socket, formFactor, chipset, memoryType, memorySlots, pcieSlots, sataPorts, m2Slots, photoURLS, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added motherboard to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cpu/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE cpu (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), socket VARCHAR(255), cores VARCHAR(255), threads VARCHAR(255), baseclock VARCHAR(255), boostclock VARCHAR(255), tdp VARCHAR(255), integratedgraphics VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cpu/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE cpu');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cpu', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM cpu');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cpu/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM cpu WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/cpu', async (req, res) => {
    const { name,
            brand,
            description,
            socket,
            cores,
            threads,
            baseClock,
            boostClock,
            tdp,
            integratedGraphics,
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
        await pool.query('INSERT INTO cpu (name, brand, description, socket, cores, threads, baseclock, boostclock, tdp, integratedgraphics, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)', 
            [name, brand, description, socket, cores, threads, baseClock, boostClock, tdp, integratedGraphics, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added CPU to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/gpu/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE gpu (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), chipset VARCHAR(255), memory VARCHAR(255), tdp VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/gpu/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE gpu');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/gpu', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM gpu');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/gpu/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM gpu WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/gpu', async (req, res) => {
    const { name,
            brand,
            description,
            chipset,
            memory,
            tdp,
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
        await pool.query('INSERT INTO gpu (name, brand, description, chipset, memory, tdp, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', 
            [name, brand, description, chipset, memory, tdp, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added GPU to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/storage/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE storage (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), capacity VARCHAR(255), formfactor VARCHAR(255), interface VARCHAR(255), speed VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/storage/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE storage');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/storage', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM storage');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/storage/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM storage WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/storage', async (req, res) => {
    const { name,
            brand,
            description,
            capacity,
            formFactor,
            interface,
            speed,
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
        await pool.query('INSERT INTO storage (name, brand, description, capacity, formfactor, interface, speed, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', 
            [name, brand, description, capacity, formFactor, interface, speed, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added storage to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/psu/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE psu (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), wattage VARCHAR(255), efficiency VARCHAR(255), modular VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/psu/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE psu');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/psu', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM psu');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/psu/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM psu WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/psu', async (req, res) => {
    const { name,
            brand,
            description,
            wattage,
            efficiency,
            modular,
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
        await pool.query('INSERT INTO psu (name, brand, description, wattage, efficiency, modular, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', 
            [name, brand, description, wattage, efficiency, modular, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added PSU to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/case/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE case (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), formfactor VARCHAR(255), type VARCHAR(255), color VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/case/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE case');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/case', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM case');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/case/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM case WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/case', async (req, res) => {
    const { name,
            brand,
            description,
            formFactor,
            type,
            color,
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
        await pool.query('INSERT INTO case (name, brand, description, formfactor, type, color, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', 
            [name, brand, description, formFactor, type, color, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added case to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cooler/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE cooler (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), type VARCHAR(255), fanRPM VARCHAR(255), noiseLevel VARCHAR(255), color VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cooler/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE cooler');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cooler', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM cooler');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/cooler/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM cooler WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/cooler', async (req, res) => {
    const { name,
            brand,
            description,
            type,
            fanRPM,
            noiseLevel,
            color,
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
        await pool.query('INSERT INTO cooler (name, brand, description, type, fanrpm, noiselevel, color, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', 
            [name, brand, description, type, fanRPM, noiseLevel, color, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added cooler to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/monitor/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE monitor (id SERIAL PRIMARY KEY, name VARCHAR(255), brand VARCHAR(255), description VARCHAR(2000), resolution VARCHAR(255), refreshRate VARCHAR(255), responseTime VARCHAR(255), panelType VARCHAR(255), size VARCHAR(255), photourl1 VARCHAR(1000), photourl2 VARCHAR(1000), photourl3 VARCHAR(1000), photourl4 VARCHAR(1000), photourl5 VARCHAR(1000), microcenterlink VARCHAR(1000), amazonlink VARCHAR(1000), newegglink VARCHAR(1000), bestbuylink VARCHAR(1000))');
        res.status(200).send({message: "Succesfully created table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/monitor/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE monitor');
        res.status(200).send({message: "Succesfully dropped table"});
    }
    catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/monitor', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM monitor');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/monitor/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM monitor WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.post('/monitor', async (req, res) => {
    const { name,
            brand,
            description,
            resolution,
            refreshRate,
            responseTime,
            panelType,
            size,
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
        await pool.query('INSERT INTO monitor (name, brand, description, resolution, refreshrate, responsetime, paneltype, size, photourl1, photourl2, photourl3, photourl4, photourl5, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', 
            [name, brand, description, resolution, refreshRate, responseTime, panelType, size, photoURL1, photoURL2, photoURL3, photoURL4, photoURL5, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added monitor to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});