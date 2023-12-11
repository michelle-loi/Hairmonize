import {db} from "../database.js";

export const getInventory = (req, res) => {
    const q = "SELECT * FROM INVENTORY";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const deleteInventory = (req, res) => {
    const Product_code = req.params.id;
    const q = "DELETE FROM INVENTORY WHERE `Product_code` = ?";

    db.query(q, [Product_code], (err, data) => {
        if (err) return res.status(500).json("Error while deleting inventory. Inventory not deleted.");

        return res.status(200).json("Inventory has been deleted.");
    });
};

export const getOneProduct = (req, res) => {
    const q =
        "SELECT * FROM INVENTORY WHERE Product_code = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const updateProduct = (req, res) => {
    const q =
        "UPDATE INVENTORY SET `Product_name` = ?, `Price` = ?, `Quantity` = ?, `Is_Merchandise` = ?, `Is_Supply` = ? WHERE Product_code = ?";
    const Product_code = req.params.id;

    db.query(q, [req.body.Product_name, req.body.Price, req.body.Quantity, req.body.Is_Merchandise, req.body.Is_Supply, Product_code], (err, data) => {
        if (err) return res.status(500).json("Error while updating product. Product not updated.");

        return res.status(200).json("Product has been updated.");
    });
};

export const addProduct = (req, res) => {
    const q =
        "INSERT INTO INVENTORY (`Product_name`, `Price`, `Quantity`, `Is_Merchandise`, `Is_Supply`) VALUES (?, ?, ?, ?, ?)";

    db.query(q, [req.body.Product_name, req.body.Price, req.body.Quantity, req.body.Is_Merchandise, req.body.Is_Supply], (err, data) => {
        if (err) return res.status(500).json("Error while adding product. Product not added.");

        return res.status(200).json("Product has been added.");
    });
};