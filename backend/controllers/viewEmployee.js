import {db} from "../database.js";

export const getEmployees = (req, res) => {
    const q = "SELECT * FROM EMPLOYEE";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        //console.log("hi");
        return res.json(data);
        //return res.json("hello");
        //return;
        //return res.status(200).json("New user account has been successfully created!")
    });
};

// export const getEmployees = (res, req) =>{
//     //res.json("from the controller")
//     console.log("from the controller")
// }