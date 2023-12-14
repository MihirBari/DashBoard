const { pool } = require("../database");

const order = async (req, res) => {
  const {
    creditor_name,
    product_id,
    size,
    sizeValue,
    returned,
    amount_sold,
    amount_condition,
  } = req.body;

  console.log("Order received on the server:", req.body);

  pool.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error getting database connection" });
    }

    connection.beginTransaction(async (beginErr) => {
      if (beginErr) {
        connection.release();
        return res.status(500).json({ error: "Error starting transaction" });
      }

      try {
        const sizeColumn = size ? size.toLowerCase() : null;
        const sizeQuantity = isNaN(+sizeValue) ? 0 : +sizeValue;
        console.log("Order received:", req.body);
        await connection.query(
          `
          INSERT INTO order_items (
            creditor_name, product_id, ${sizeColumn},	Total_items, returned, amount_sold, amount_condition, created_at
          ) VALUES (?, ?, ?, ?,?, ?, ?, Now());
          `,
          [
            creditor_name,
            product_id,
            sizeQuantity,
            sizeQuantity,
            returned,
            amount_sold,
            amount_condition,
          ],
          (insertErr) => {
            if (insertErr) {
              console.error("Error inserting order_items:", insertErr);
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: "Error inserting order_items" });
              });
            }

            const sizeColumn = size ? size.toLowerCase() : null;

            connection.query(
              `
                 UPDATE products
                    SET ${sizeColumn} = ${sizeColumn} - ?,
                    stock = stock - ?
                    WHERE product_id = ?;
               `,
              [sizeQuantity,sizeQuantity, product_id],
              (updateErr) => {
                if (updateErr) {
                  return connection.rollback(() => {
                    connection.release();
                    return res
                      .status(500)
                      .json({ error: "Error updating product quantities" });
                  });
                }

                connection.commit((commitErr) => {
                  if (commitErr) {
                    return connection.rollback(() => {
                      connection.release();
                      return res
                        .status(500)
                        .json({ error: "Error committing transaction" });
                    });
                  }

                  connection.release();
                  res.status(200).json({
                    success: true,
                    message: "Order placed successfully",
                  });
                });
              }
            );
          }
        );
      } catch (error) {
        console.error("Error processing order:", error);
        connection.rollback(() => {
          connection.release();
          res.status(500).json({ error: "Error processing order" });
        });
      }
    });
  });
};

const updateOrder = async (req, res) => {
  const { product_id } = req.params.product_id;

  // Start a transaction
  pool.beginTransaction(async (err) => {
    if (err) {
      return res.status(500).json({ error: "Error starting transaction" });
    }

    try {
      // Update order_items to mark as returned
      await pool.query(
        `
        UPDATE order_items
        SET
          returned = "Yes"
        WHERE
        product_id = ?;
        `,
        [product_id]
      );

      // Retrieve product_id from order_items
      const getProductQuery = `
        SELECT product_id FROM order_items WHERE order_id = ?;
      `;
      const [productResult] = await pool.query(getProductQuery, [order_id]);
      const { product_id } = productResult[0];

      // Update product quantities in products table
      await pool.query(
        `
        UPDATE products
        SET
          s = s + ?,
          m = m + ?,
          l = l + ?,
          xl = xl + ?,
          xxl = xxl + ?,
          xxxl = xxxl + ?,
          xxxxl = xxxxl + ?,
          xxxxxl = xxxxxl + ?,
          xxxxxxl = xxxxxxl + ?
        WHERE
          product_id = ?;
        `,
        [s, m, l, xl, xxl, xxxl, xxxxl, xxxxxl, xxxxxxl, product_id]
      );

      // Commit the transaction
      pool.commit((commitErr) => {
        if (commitErr) {
          return pool.rollback(() => {
            return res
              .status(500)
              .json({ error: "Error committing transaction" });
          });
        }
        res
          .status(200)
          .json({ success: true, message: "Order updated successfully" });
      });
    } catch (error) {
      // Rollback in case of any error
      pool.rollback(() => {
        res.status(500).json({ error: "Error updating order" });
      });
    }
  });
};

const filterNullValues = (obj) => {
  const filteredObj = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};

const viewOrder = async (req, res) => {
  const inventoryQuery = `
    SELECT
      oi.creditor_name,
      oi.product_id,
      p.product_name,
      oi.s,
      oi.m,
      oi.l,
      oi.xl,
      oi.xxl,
      oi.xxxl,
      oi.xxxxl,
      oi.xxxxxl,
      oi.Total_items,
      oi.returned,
      oi.amount_sold,
      oi.amount_condition,
      oi.created_at,
      oi.update_at
    FROM
      order_items oi
    JOIN
      products p ON p.product_id = oi.product_id;
  `;

  pool.query(inventoryQuery, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Error executing query" });
    }

    // Map over the results and filter out null values for each item
    const filteredResults = results.map((result) => filterNullValues(result));

    res.json(filteredResults);
  });
};


const deleteOrder = (req, res) => {
  const productId = req.body.productId;

  if (!productId) {
    return res
      .status(400)
      .json({ error: "ProductId is required in the request body" });
  }

  const query = "DELETE FROM order_items WHERE product_id = ?";
  const values = [productId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Deleted", results);
    res.json(results);
  });
};

module.exports = { order, updateOrder, viewOrder, deleteOrder };


