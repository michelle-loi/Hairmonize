# CPSC 471 Final Project: Getting Started

Clone this project from git onto your computer


MYSQL SERVER:
----
- Before you start the program you must configure your MySQL server authentication properly or else it
will not be able to communicate with the back end. You might need to grant all privileges to your mysql user 
account. To do so:

<h3>Linux:</h3>

1) Open a terminal 
2) Run in terminal: `Sudo my sql and then log in`
3) Run in terminal: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
        
    - Replace password with you actual password, but retain the single quote marks.

4) Run in terminal: `FLUSH PRIVILEGES`;
5) Run in terminal `GRANT ALL PRIVILEGES ON “your database name here”.* TO 'User account name here'@'localhost';`
6) Run in terminal: `FLUSH PRIVILEGES`;


<h3>Windows/MacOS</h3>
1) Open mysql work bench or datagrip.
2) Access your root server, then open a query terminal.
3) Run: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

    - Replace password with your actual password, but retain the single quote marks.

4) Run: `FLUSH PRIVILEGES;`
5) Run: `GRANT ALL PRIVILEGES ON “your database name here”.* TO 'User account name here'@'localhost';`
6) Run: `FLUSH PRIVILEGES`;


Database importing
----
After setting up your mysql environment you will need to restore the included dump file into your mysql server to get 
this project working. The dump file is named: salon_database_dump.sql To do so:

<h3>Linux:</h3>
1) Open a terminal
2) Run in terminal and log in to your mysql data base via: ` mysql -u username -p` replace username with your username.
   if this doesn't work Log in with your root user like above in the mysql server steps.
3) Create a new database by running in the terminal: `mysql> CREATE DATABASE my_database;` Replace my database with any name. For instance we chose 
   SALON_DATABASE
4) Then run in terminal: `mysql> USE my_database;`
5) Then give the path to the mysql dump file that we included by running this in the terminal: ` mysql> SOURCE /path/to/salon_database_dump.sql`
6) Once the dump file has been imported you may have to rename all the tables in the database to be in uppercase. This 
is because some linux distributions are case sensitive despite mysql not being case sensitive. This was the case for me 
using Ubuntu 22.04 lts.

<h3>Windows/MacOS</h3>
1) Open mysql work bench or datagrip.
2) Run: ` mysql -u username -p` replace username with your username. If this doesn't work Log in with your root user like above in the mysql server steps
3) Create a new database by running: `mysql> CREATE DATABASE my_database;` Replace my database with any name. For instance we chose
   SALON_DATABASE
4) Then run: `mysql> USE my_database;`
5) Then give the path to the mysql dump file that we included by running this: ` mysql> SOURCE /path/to/salon_database_dump.sql`



FRONT END:
---

After we have setup the mysql server we will begin on the code itself.

To run the front end:

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
To run the back end:

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


Sources for learning ACID transactions, rollback, etc:
https://www.geeksforgeeks.org/acid-properties-in-dbms/
https://www.w3resource.com/mysql/mysql-transaction.php
https://www.javatpoint.com/mysql-transaction
https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlTransaction.html
https://w3schools.com/asp/met_conn_begintrans.asp
https://www.tutorialspoint.com/sql/sql-transactions.htm