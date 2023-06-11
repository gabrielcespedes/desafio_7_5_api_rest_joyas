const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Bgabriel441685',
    database: 'joyas',
    allowExitOnldle: true
});

const obtenerJoyas = async () => {
    const {rows} = await pool.query("SELECT * FROM inventario");
    return rows;
}

const prepararHATEOAS = (joyas) => {
    
    const results = joyas.map((j) => {
        return {
            name: j.nombre,
            href: `/joyas/joya/${j.id}`,
        }
    });

    const totalJoyas = joyas.length;
    
    let stockTotal = 0;

    for (let joya of joyas) {
        stockTotal += joya.stock;
    }
    
    const HATEOAS = {
        totalJoyas,
        stockTotal,        
        results
    }
    return HATEOAS;
}

module.exports = {obtenerJoyas, prepararHATEOAS};