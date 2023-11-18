import {db} from "../database.js";
import bcrypt from "bcryptjs";

export const register = (request, response) => {
    // Make query of a user name
    const query = "SELECT * FROM  ACCOUNT WHERE Username = ?"

    // query the database to see if the username is already in the database before we allow registration
    db.query(query, [request.body.Username], (error,data) => {
        if(error) return response.json(error)
        // if user name already in database dont allow registration (http error 403)
        if(data.length) return response.status(403).json("Username already exists in the database!")

        //Otherwise we will get the password, hash it and create the new user registration
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(request.body.password, salt);

        // insert the new user into the database (account table)
        const newUser = "INSERT into ACCOUNT(Username, Password) VALUES(?)"
        const values =[
            request.body.Username,
            hash,
        ]

        db.query(newUser, [values], (err,data) => {
            if(error) return response.json(error)
            return response.status(200).json("New user account has been successfully created!")
        })
    })
}


export const login = (request, response) => {

}

export const logout = (request, response) => {

}