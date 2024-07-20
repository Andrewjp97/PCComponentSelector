const express = require('express');
const pool = require('./db');
const port = 1338;

const app = express();
app.use(express.json());

app.get('/ram/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE ram (id SERIAL PRIMARY KEY, title TEXT, brand TEXT, description TEXT, dims TEXT, speed TEXT, ddrClass TEXT, capacity TEXT, CASLatency TEXT, timing TEXT, rgb TEXT, model TEXT, voltage TEXT, ecc TEXT, color TEXT, bufferedOrRegistered TEXT, heatSpreader TEXT, photoURLS TEXT ARRAY, microcenterLink TEXT, amazonLink TEXT, neweggLink TEXT, bestbuyLink TEXT)');
        res.status(200).send({message: "Succesfully created RAM table"});
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
        await pool.query('INSERT INTO ram (title, brand, description, dims, speed, ddrclass, capacity, caslatency, timing, rgb, model, voltage, ecc, color, bufferedorregistered, heatspreader, photourls, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)', 
            [title, brand, description, dims, speed, ddrClass, capacity, CASLatency, timing, rgb, model, voltage, ecc, color, bufferedOrRegistered, heatSpreader, photoURLS, microcenterLink, amazonLink, neweggLink, bestbuyLink]);
        res.status(200).send({message: "Succesfully added RAM to database"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE motherboard (id SERIAL PRIMARY KEY, title TEXT, brand TEXT, description TEXT, platform TEXT, socket TEXT, chipset TEXT, model TEXT, dimms TEXT, maxsupportedmemory TEXT, pcie TEXT, sataports TEXT, m2ports TEXT, sataraid TEXT, lan TEXT, wifi TEXT, reario TEXT, otherconnectors TEXT, formfactor TEXT, dimensions TEXT, memorysupport TEXT, audio TEXT, internalusb TEXT, powerconnector TEXT, bluetooth TEXT, photourls TEXT ARRAY, microcenterlink TEXT, amazonlink TEXT, newegglink TEXT, bestbuylink TEXT)');
        res.status(200).send({message: "Succesfully created motherboard table"});
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

app.get('/motherboard/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE motherboard');
        res.status(200).send({message: "Succesfully dropped table"});
    } catch (err) {
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
    const {
        title,
        brand,
        description,
        platform,
        socket,
        chipset,
        model,
        dimms,
        maxSupportedMemory,
        pcie,
        sataPorts,
        m2Ports,
        sataRaid,
        lan,
        wifi,
        rearIO,
        otherConnectors,
        formFactor,
        dimensions,
        memorySupport,
        audio,
        internalUSB,
        powerConnector,
        bluetooth,
        photoURLS,
        microcenterLink,
        amazonLink,
        neweggLink,
        bestbuyLink
    } = req.body;
    try {
        await pool.query('INSERT INTO motherboard (title , brand, description, platform, socket, chipset, model, dimms, maxsupportedmemory, pcie, sataports, m2ports, sataraid, lan, wifi, reario, otherconnectors, formfactor, dimensions, memorysupport, audio, internalusb, powerconnector, bluetooth, photourls, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)', 
            [title, brand, description, platform, socket, chipset, model, dimms, maxSupportedMemory, pcie, sataPorts, m2Ports, sataRaid, lan, wifi, rearIO, otherConnectors, formFactor, dimensions, memorySupport, audio, internalUSB, powerConnector, bluetooth, photoURLS, microcenterLink, amazonLink, neweggLink, bestbuyLink]
        )
        res.status(200).send({message: "Succesfully added motherboard to database"});
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.get('/cpu/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE cpu (id SERIAL PRIMARY KEY, title TEXT, brand TEXT, description TEXT, model TEXT, socket TEXT, cores TEXT, threads TEXT, baseClock TEXT, boostClock TEXT, l1Cache TEXT, l2Cache TEXT, l3Cache TEXT, manufacturingProcess TEXT, memorySupport TEXT, eccSupport TEXT, integratedGraphics TEXT, memoryChannels TEXT, graphicsBaseFrequency TEXT, graphicsBoostFrequency TEXT, tdp TEXT, thermalSolution TEXT, photoURLS TEXT ARRAY, microcenterLink TEXT, amazonLink TEXT, neweggLink TEXT, bestbuyLink TEXT)');
        res.status(200).send({message: "Succesfully created CPU table"});
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.get('/cpu/teardown', async (req, res) => {
    try {
        await pool.query('DROP TABLE cpu');
        res.status(200).send({message: "Succesfully dropped table"});
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.get('/cpu', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM cpu');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.get('/cpu/specific', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const data = await pool.query('SELECT * FROM cpu WHERE id = $1', [id]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.post('/cpu', async (req, res) => {
    const {
        title,
        brand,
        description,
        model,
        socket,
        cores,
        threads,
        baseClock,
        boostClock,
        l1Cache,
        l2Cache,
        l3Cache,
        manufacturingProcess,
        memorySupport,
        eccSupport,
        integratedGraphics,
        memoryChannels,
        graphicsBaseFrequency,
        graphicsBoostFrequency,
        tdp,
        thermalSolution,
        photourls,
        microcenterLink,
        amazonLink,
        neweggLink,
        bestbuyLink
    } =  req.body;
    try {
        await pool.query('INSERT INTO cpu (title, brand, description, model, socket, cores, threads, baseclock, boostclock, l1cache, l2cache, l3cache, manufacturingprocess, memorysupport, eccsupport, integratedgraphics, memorychannels, graphicsbasefrequency, graphicsboostfrequency, tdp, thermalsolution, photourls, microcenterlink, amazonlink, newegglink, bestbuylink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)',
            [title, brand, description, model, socket, cores, threads, baseClock, boostClock, l1Cache, l2Cache, l3Cache, manufacturingProcess, memorySupport, eccSupport, integratedGraphics, memoryChannels, graphicsBaseFrequency, graphicsBoostFrequency, tdp, thermalSolution, photourls, microcenterLink, amazonLink, neweggLink, bestbuyLink]
        )
        res.status(200).send({message: "Succesfully added CPU to database"});
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});