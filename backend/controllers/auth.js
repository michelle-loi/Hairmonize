import {db} from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// controller for the register page
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
        const hash = bcrypt.hashSync(request.body.Password, salt);

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


// controller for the login page
export const login = (request, response) => {
    // Check if the account exists in our account database

    // Querying the ACCOUNT table for the entered Username
    const query = "SELECT * FROM ACCOUNT WHERE Username = ?"

    db.query(query, [request.body.Username], (error,data)=> {
        if(error) return response.json(error)

        // check if data length is zero, and that means that user doesn't exist in our database so return error
        if(data.length === 0) return response.status(404).json("Username was not found!");

        // if the user does exist check the password next
        const passVerify = bcrypt.compareSync(
            request.body.Password,
            // here password needs to be uppercase because it is pulling data from the database and password in the database is uppercase
            data[0].Password
        );

        // check password
        if(!passVerify) return response.status(400).json("Incorrect Username or Password!");

        // creating a webtoken so we can differentiate different users from one another
        const token = jwt.sign({Username:data[0].Username}, "jwtkey");

        // separating password and other information, this way we do not send the password with the other data
        const {Password, ...other} = data[0]

        // sending out cookie out to the user
        response.cookie("access_token", token, {
            // make it work on http only for extra security
            httpOnly:true
        }).status(200).json(other)
    });

};

export const logout = (request, response) => {

};