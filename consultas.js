const format = require('pg-format');

const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Bgabriel441685',
    database: 'joyas',
    allowExitOnldle: true
});

const obtenerJoyas = async ({limits = 10, order_by = "id_ASC", page = 1}) => {
    const offset = (page - 1) * limits;
    const [campo, direccion] = order_by.split("_");
    const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    pool.query(formattedQuery);
    const {rows: joyas} = await pool.query(formattedQuery);
    return joyas;
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