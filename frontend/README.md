# Getting started 

CPSC 471 Final Project

Clone this project from git onto your computer


MYSQL SERVER:
- Before you start the program you must configure your MySQL server authentication properly or else it
will not be able to communicate with the back end. To do so:

Linux: 
1) Open a terminal 
2) Run: Sudo my sql and then log in
3) Run: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
        
    - Replace password with you actual password, but retain the single quote marks.

4) Run: FLUSH PRIVILEGES;

Windows/MacOS
1) Open mysql work bench or datagrip.
2) Access your root server, then open a query terminal.
3) Run: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

    - Replace password with your actual password, but retain the single quote marks.

4) Run: FLUSH PRIVILEGES;




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


