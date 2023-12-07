import {db} from "../database.js";

export const getServices = (req, res)=>{

    // create query
    const q = "SELECT * FROM SERVICE";
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

export const addService = (req, res) => {
    const q = "SELECT * FROM SERVICE WHERE SName = ?";

    db.query(q, [req.body.SName], (err, data) =>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("Service already exists and cannot be added again.");
        const q = "INSERT INTO SERVICE(`SPrice`, `SName`) VALUES (?)"
        const values = [
            //req.body.SID,
            req.body.SPrice,
            req.body.SName,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json("Error occurred while adding a service.");
            return res.status(200).json("Service added.");
        });
    })
};

export const deleteService = (req, res) => {
    const SID = req.params.id;
    const q = "DELETE FROM SERVICE WHERE `SID` = ?";

    db.query(q, [SID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete a service.");
        return res.status(200).json("Service has been deleted.");
    });
};

