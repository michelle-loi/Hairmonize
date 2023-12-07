import {db} from "../database.js";

export const getPrices = (req, res)=>{

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