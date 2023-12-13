/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

import {db} from "../database.js";

/**
 *Sources for learning ACID transactions, rollback, etc:
 * https://www.geeksforgeeks.org/acid-properties-in-dbms/
 * https://www.w3resource.com/mysql/mysql-transaction.php
 * https://www.javatpoint.com/mysql-transaction
 * https://dev.mysql.com/doc/dev/connector-net/latest/api/data_api/MySql.Data.MySqlClient.MySqlTransaction.html
 * https://w3schools.com/asp/met_conn_begintrans.asp
 * https://www.tutorialspoint.com/sql/sql-transactions.htm
 */

export const getOrders = (req, res)=>{

    // create query, this will get all the order info required for the table, includes a join to get HAS table data
    // and another join to get Inventory table data. This will get us the what inventory is associated with what order
    // and what the inventory item's name is.
    const q =
   `SELECT O.Order_ID, O.Date, O.Time, O.SuID, O.EID, H.Product_code, I.Product_name
    FROM \`ORDER\` O
    LEFT JOIN HAS H ON O.Order_ID = H.Order_ID
    LEFT JOIN INVENTORY I ON H.Product_code = I.Product_code;`;
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

export const deleteOrder = (req, res) => {
    const Order_ID = req.params.id;

    // we do a transaction this way so all deletes happen or no deletes happen. this prevents situations where some orders
    // are deletred and some are not
    db.beginTransaction((transactionErr) => {
        if (transactionErr) {
            return res.status(500).json("Error occurred while starting a transaction.");
        }

        // Delete from SUPPLIES table
        const deleteSuppliesQuery = "DELETE FROM SUPPLIES WHERE `SuID` = (SELECT SuID FROM `ORDER` WHERE `Order_ID` = ?)";
        db.query(deleteSuppliesQuery, [Order_ID], (deleteSuppliesErr) => {
            if (deleteSuppliesErr) {
                // Rollback the transaction on error
                db.rollback(() => {
                    console.log(deleteSuppliesErr);
                    return res.status(500).json("Error occurred while deleting records from SUPPLIES.");
                });
            }

            // Delete from ORDER table
            const deleteOrderQuery = "DELETE FROM `ORDER` WHERE `Order_ID` = ?";
            db.query(deleteOrderQuery, [Order_ID], (deleteOrderErr) => {
                if (deleteOrderErr) {
                    // Rollback the transaction on error
                    db.rollback(() => {
                        console.log(deleteOrderErr);
                        return res.status(500).json("Error occurred while deleting an Order.");
                    });
                }

                // Commit the transaction if all queries succeed
                db.commit((commitErr) => {
                    if (commitErr) {
                        console.log(commitErr);
                        return res.status(500).json("Error occurred while committing the transaction.");
                    }
                    return res.status(200).json("Order and related records deleted.");
                });
            });
        });
    });
};

export const addOrder = (req, res) => {
    // date that the user selected in the modal
    const selectedDate = new Date(req.body.selectedDate);
    // date components
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getUTCMonth() + 1;
    const day = selectedDate.getUTCDate();
    // time components
    const hours = selectedDate.getUTCHours();
    const minutes = selectedDate.getUTCMinutes();
    const seconds = selectedDate.getUTCSeconds();
    // processing the date and time into a format that mysql can accept
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const orderValues = [
        formattedDate,
        formattedTime,
        req.body.SuID,
        req.body.EID,
    ];

    // Insert order into the ORDER table
    const orderQuery = "INSERT INTO `ORDER`(`Date`, `Time`, `SuID`, `EID`) VALUES (?,?,?,?)";

    db.query(orderQuery, orderValues, async (orderErr, orderResult) => {
        if (orderErr) {
            console.log(orderErr);
            return res.status(500).json("Error occurred while adding an order.");
        }

        const orderID = orderResult.insertId;

        // Insert selected inventory items into the HAS table
        const hasQuery = "INSERT INTO HAS (`Order_ID`, `Product_code`) VALUES (?, ?)";
        const suppliesQuery = "INSERT INTO SUPPLIES (`SuID`, `Product_code`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `SuID` = `SuID`";

        try {
            // Insert into HAS table
            for (const productCode of req.body.selectedInventory) {
                await db.query(hasQuery, [orderID, productCode]);
            }

            // Insert into SUPPLIES table, we will also ensure that no duplicates will be added to avoid breaking unique key contraints for the SUPPLIES table
            for (const productCode of req.body.selectedInventory) {
                await db.query(suppliesQuery, [req.body.SuID, productCode]);
            }
            return res.status(200).json("Order added.");
        } catch (insertErr) {
            console.log(insertErr);
            return res.status(500).json("Error occurred while adding inventory items to the order.");
        }
    });
};