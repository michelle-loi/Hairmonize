# Getting started 

CPSC 471 Final Project

Clone this project from git onto your computer

To run:

1) open the terminal cd to the front end directory
2) We need to install some dependencies for the react icons, so run npm install react-icons (
you can read more about it below)
3) enter command: npm install
4) enter command: npm start
5) cd into the backend and run npm i express mysql nodemon
6) npm install react-bootstrap bootstrap


In backend make a new file called db.js and inside it put where password is you local password.
DONT COMMIT THIS UNTIL THE END BECAUSE THEN EVERYONE WILL HAVE PASSWORD PROBLEMS!

import mysql from "mysql"

// This is the connection to the database

const db = mysql.createConnection({
host: "local",
user: "root",
password:"",
database: "salondatabase"
})



There are a bunch of frameworks we need so:

This is for our icons:
    npm install react-icons

To use it:

import { the_icon_you_want } from "react-icons/fa";

The icon website is: https://fontawesome.com/icons












