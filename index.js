const { obtenerJoyas, prepararHATEOAS, ObtenerJoyasPorFiltros, ObtenerJoya } = require('./consultas');

const express = require('express');
const app = express();
app.listen(3000, console.log("Servidor encendido"));

app.get("/joyas", async (req, res) => {
    try {
        const queryStrings = req.query;
        const joyas = await obtenerJoyas(queryStrings);
        const HATEOAS = await prepararHATEOAS(joyas);
        res.json(HATEOAS);
    } catch(error) {
        res.status(500).send(error);
    }    
});

app.get("/joyas/filtros", async (req, res) => {
    try {
        const queryStrings = req.query;
        const joyas = await ObtenerJoyasPorFiltros(queryStrings);
        res.json(joyas);
    } catch(error) {
        res.status(500).send(error);
    }    
})

app.get("/joyas/joya/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const joyas = await ObtenerJoya(id);
        res.json(joyas.rows);
    } catch(error) {
        res.status(500).send(error);
    }    
})
