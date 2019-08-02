
// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items 
// available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "teehee12",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startSearch();
});

function startSearch() {

    var table = new Table({
        head: ['Product ID', 'Product', 'Department', 'Price', 'Quantity']
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].name, res[i].dept_name, res[i].price, res[i].quantity]);
        }
        console.log(table.toString());
        purchase(res);
    });


// function purchase(res) {
//     inquirer.prompt([
//             {
//                 name: "ID",
//                 type: "input",
//                 message: "Enter the ID of the product that you would like to purchase today!",
//             },
//             {
//                 name: "quantity",
//                 type: "input",
//                 message: "Enter the quantity of the product that you would like to get.",
//             }
//         ])
        
