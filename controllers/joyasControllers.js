import db from "../models/db.js";
import hateoas from "../utils/heteoas.js";

const getJoyas = async (req, res) => {
  const { limits, page, order_by } = req.query;

  // Si no se proporcionan los parámetros, obten todos los registros
  if (!limits && !page && !order_by) {
    try {
      const result = await db("SELECT * FROM inventario");
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  const offset = (page - 1) * limits;
  const [orderField, orderDirection] = order_by.split("_");

  try {
    const result = await db(
      `SELECT * FROM inventario ORDER BY ${orderField} ${orderDirection} LIMIT $1 OFFSET $2`,
      [limits, offset]
    );
    const totalItems = await db("SELECT COUNT(*) FROM inventario");

    const response = hateoas(
      result,
      totalItems[0].count,
      limits,
      page,
      order_by
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJoyasFiltradas = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;

  try {
    const result = await db(
      `SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria = $3 AND metal = $4`,
      [precio_min, precio_max, categoria, metal]
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getJoyas, getJoyasFiltradas };
