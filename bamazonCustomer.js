
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
    inquirer
        .prompt({
            name: "choose",
            type: "list",
            message: "What would you like to do today? ",
            choices: [
                "Buy a product?",
                "Look at the inventory",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Buy a product?":
                    Buying();
                    break;
                case "Look at the inventory":
                    Inventory();
                    break;
                case "exit":
                    connection.end();
                    console.log("Please come again!");
                    break;
            }
        });

    function Buying() {
        connection.query("SELECT * FROM products", function (err, data) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].products);
            }
        });
        purchase();

    }
}

function purchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'select',
            message: "Enter the ID of the item you would like to purchase.",
            validate: function (name) {
                return /^[0-9]*$/.test(name)
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Quantity?',
            validate: function (name) {
                return /^[0-9]*$/.test(name)
            }
        }
            .then(function (response) {
                var query = "SELECT * FROM inventory WHERE id='${response.select}";
                connection.query(query, function (err, data) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].products);
                    }
                });
            })
    




        ])}