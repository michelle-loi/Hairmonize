# Getting started 

CPSC 471 Final Project

Clone this project from git onto your computer



FRONT END:

To run:

1) open the terminal cd to the front end directory
2) run in terminal: npm install react-bootstrap bootstrap 
3) run in terminal: npm install react-icons
4) run in terminal: npm add axios
5) run in terminal: enter command: npm install

---------- STOP HERE: FINISH ALL STEPS FOR THE BACK END AND START IT BEFORE CONTINUING WITH STEP 6 ------------

6) run in terminal: npm start


To use icons:

import { the_icon_you_want } from "react-icons/fa";

The icon website is: https://fontawesome.com/icons







BACKEND

1) cd to back end directory
2) run in terminal: npm add express mysql nodemon
3) in project directory: Create a new javascript file inside of the backend called database.js (DO NOT COMMIT TO GIT):

inside of this file you will write:

import mysql from "mysql"

export const db = mysql.createConnection({

host:"localhost",

user:"your server user name",

password: "your server password",

database: "your database name (from data grip or whatever you're using)"
})


4) run in terminal: npm add bcryptjs
5) run in terminal: npm add axios


