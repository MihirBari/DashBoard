const { pool } = require("../database");

const showDealer = (req,res) => {

    const dealer = `SELECT id,debitor_name, debitor_Date, 	debitor_Amount, debitor_paid_by, total_product, other_cost,created_at,updated_at FROM debitors`;

    pool.query(dealer, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
    
      console.log('All users:', results);
      res.status(200).json(results)
    });

}

const showCustomer = (req,res) => {

    const seller = `SELECT id,creditor_name, product_id, amount_sold,Product_sold, amount_condition, returned FROM creditors`;

    pool.query(seller, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
    
      console.log('All users:', results);
      res.status(200).json(results)
    });

}

const addDealer = (req,res) => {
    const addDealer = `Insert into debitors
     (debitor_name, debitor_Date, debitor_Amount, debitor_paid_by, total_product, other_cost,created_at)
     values (?,?,?,?,?,?, NOW())
     `
    const value = [ 
        req.body.debitor_name,
        req.body.debitor_Date,
        req.body.debitor_Amount,
        req.body.debitor_paid_by,
        req.body.total_product,
        req.body.other_cost]

    pool.query(addDealer, value ,(error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return;
        }
      
        console.log('All users:', results);
        res.json(results)
      });
}

const addCustomer = (req,res) => {
    const addCustomer = `Insert into creditors
     (creditor_name, product_id, amount_sold,Product_sold, amount_condition, returned,created_at)
     values (?,?,?,?,?,?, NOW())
     `
    const value = [ 
        req.body.creditor_name,
        req.body.product_id,
        req.body.amount_sold,
        req.body.amount_condition,
        req.body.returned]

    pool.query(addCustomer, value ,(error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          return;
        }
      
        console.log('All users:', results);
        res.json(results)
      });
}


const deleteCustomer = (req, res) => {
  const query = `DELETE FROM creditors WHERE product_id = ?`;
  const value = [req.query.id]; 

  pool.query(query, value, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Deleted', results);
    res.json(results);
  });
};

const deleteSeller = (req, res) => {
  const query = 'DELETE FROM debitors WHERE id = ?';
  const debitorName = req.body.id;

  pool.query(query, [debitorName], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Not Found: No matching debitor_name found for deletion' });
    }

    console.log('Deleted', results);
    res.json({ message: 'Debitor deleted successfully' });
  });
};

module.exports = {showDealer,showCustomer,addDealer,addCustomer,deleteCustomer,deleteSeller};