const { obtenerJoyas, prepararHATEOAS } = require('./consultas');

const express = require('express');
const app = express();
app.listen(3000, console.log("Servidor encendido"));

app.get("/joyas", async (req, res) => {
    const queryStrings = req.query;
    const joyas = await obtenerJoyas(queryStrings);
    const HATEOAS = await prepararHATEOAS(joyas);
    res.json(HATEOAS);
});

