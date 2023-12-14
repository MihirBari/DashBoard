const { pool } = require("../database");

const TotalProducts = (req, res) => {
  const query = `
     SELECT COUNT(product_id) AS totalProducts FROM products
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 1) {
      console.log('Total Products:', results[0]);
      res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  });
};

const TotalProductsSold = (req, res) => {
  const { days } = req.query;

  const query = `
    SELECT SUM(Total_items) AS Total_items 
    FROM order_items 
    WHERE created_at > NOW() - INTERVAL ? DAY 
      AND returned = 'No';
  `;

  pool.query(query, [days], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 1) {
      console.log('Total Products Sold:', results);
      res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  });
};

const TotalProductsLeft = (req,res ) => {
 
    const query = `
     select sum(Stock) as Stock from products 
    `

    pool.query(query,(error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      
        if (results.length === 1) {
          console.log('TOtal Products Left:', results);
          res.status(200).json(results);
        } else {
          return res.status(404).json({ error: 'Product not found' });
        }
      });
}

const TotalAmountCollected = (req, res) => {
  const { days } = req.query;

  const query = `
    SELECT SUM(amount_sold) AS amt 
    FROM order_items 
    WHERE created_at > NOW() - INTERVAL ? DAY 
    AND returned = 'No';
  `;

  pool.query(query, [days], (error, results) => {
    if (error) {
 
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Results:', results); // Log the results

    if (results.length === 1) {
    
      res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  });
};

const TotalAmountInvested = (req,res ) => {

  const query = `
   select sum(Total_items) as ti from order_items where created_at > now() - INTERVAL ? day and returned = 'Yes';
  `

  pool.query(query,(error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
      if (results.length === 1) {
        console.log('TOtal Amount collected:', results);
        res.status(200).json(results);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    });
}

const TotalReturned = (req,res ) => {
  const { days } = req.query;

  const query = `
   select sum(Total_items) as ti from order_items where created_at > now() - INTERVAL ? day and returned = 'Yes';
  `

  pool.query(query, [days], (error, results) => {
    if (error) {
 
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Results:', results); // Log the results

    if (results.length === 1) {
    
      res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'Product not found' });
    }
  });
}

const profit = (req,res ) => {

  const query = `
   select sum(Total_items) as ti from order_items where created_at > now() - INTERVAL ? day and returned = 'Yes';
  `

  pool.query(query,(error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
      if (results.length === 1) {
        console.log('TOtal Amount collected:', results);
        res.status(200).json(results);
      } else {
        return res.status(404).json({ error: 'Product not found' });
      }
    });
}




module.exports = { TotalProducts,TotalProductsSold,TotalProductsLeft,TotalAmountCollected , TotalReturned  };