import {db} from "../database.js";

export const getSuppliers = (req, res)=>{
    // create query
    const q = "SELECT * FROM SUPPLIER";
    db.query(q, (err, data) => {

        // return error
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        // return data
        return res.status(200).json(data);
    })
}

export const addSupplier = (req, res) => {
    const q = "INSERT INTO SUPPLIER(`SName`, `Email`, `Address`, `Phone`, `Fax`) VALUES (?)"
    const values = [
        req.body.SName,
        req.body.Email,
        req.body.Address,
        req.body.Phone,
        req.body.Fax,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error occurred while adding a supplier.");
        return res.status(200).json("Supplier added.");
    });
};

export const deleteSupplier = (req, res) => {
    const SuID = req.params.id;
    const q = "DELETE FROM SUPPLIER WHERE `SuID` = ?";

    db.query(q, [SuID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete a supplier.");
        return res.status(200).json("Supplier has been deleted.");
    });
};

export const updateSupplier = (req, res) => {
    const q =
        "UPDATE SUPPLIER SET `SName` = ?, `Email` = ?, `Address` = ?, `Phone` = ?, `Fax` = ? WHERE SuID = ?";
    const SuID = req.params.id;

    db.query(q, [req.body.SName, req.body.Email, req.body.Address, req.body.Phone, req.body.Fax, SuID], (err, data) => {
        if (err) return res.status(500).json("Error while updating supplier. Supplier not updated.");

        return res.status(200).json("Supplier has been updated.");
    });
};
