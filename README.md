# CPSC 471 Final Project: Getting Started

Clone this project from git onto your computer


MYSQL SERVER:
----
- Before you start the program you must configure your MySQL server authentication properly or else it
will not be able to communicate with the back end. To do so:

Linux: 
---
1) Open a terminal 
2) Run in terminal: `Sudo my sql and then log in`
3) Run in terminal: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
        
    - Replace password with you actual password, but retain the single quote marks.

4) Run in terminal: `FLUSH PRIVILEGES`;

Windows/MacOS
---
1) Open mysql work bench or datagrip.
2) Access your root server, then open a query terminal.
3) Run: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

    - Replace password with your actual password, but retain the single quote marks.

4) Run: `FLUSH PRIVILEGES;`




FRONT END:
---

To run:

1) open the terminal cd to the front end directory
2) run in terminal: `npm install react-bootstrap bootstrap` 
3) run in terminal: `npm install react-icons`
4) run in terminal: `npm add axios`
5) run in terminal: `npm install react-datepicker`
6) run in terminal: `npm install`

---------- STOP HERE: FINISH ALL STEPS FOR THE BACK END AND START IT BEFORE CONTINUING WITH STEP 6 ------------

7) run in terminal: `npm start`


To use icons:

import { the_icon_you_want } from "react-icons/fa";

The icon website is: https://fontawesome.com/icons







BACKEND
---

1) cd to back end directory
2) run in terminal: `npm add express mysql nodemon`
3) in project directory: Create a new javascript file inside of the backend called database.js (DO NOT COMMIT TO GIT):

inside of this file you will write:

import mysql from "mysql"

export const db = mysql.createConnection({

host:"localhost",

user:"your server user name",

password: "your server password",

database: "your database name (from data grip or whatever you're using)"
})


4) run in terminal: `npm add bcryptjs`
5) run in terminal: `npm add axios`
6) run in terminal: `npm add jsonwebtoken`
7) run in terminal: `npm add cookie-parser`
8) run in terminal: `npm start`




REFERENCES
---
The following YouTube videos were used in developing this project:

Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE

Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10

Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
