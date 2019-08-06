var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table-redemption");

var table = new Table({
    head: ["ID", "Product", "Department", "Price", "Quantity"]
});

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

    
    connection.query("SELECT * FROM ", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].name, res[i].dept_name, res[i].price, res[i].quantity]);
        }
        console.log(table.toString());
        purchase(res);
    });


    function purchase(res) {
        inquirer.prompt([
            {
                name: "ID",
                type: "input",
                message: "Enter the ID of the product that you would like to purchase today!",
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter the quantity of the product that you would like to get.",
            }
        ])
            .then(function (answer) {
                if (answer.ID > res.length) {
                    console.log("You entered an invalid product ID. Please make another selection".red);
                    startSearch();
                } else {
                    connection.query("SELECT * FROM products WHERE id = " + answer.ID, function (err, res) {
                        if (err) throw err;
                        var Qpurchase = parseInt(answer.quantity);
                        var ID = answer.ID;
                        var Qstart = res[0].quantity;
                        var Qprice = res[0].price;
                        if (res.length >= 0 && Qstart >= Qpurchase) {
                            var Qend = Qstart - Qpurchase;
                            updateQuantity(ID, Qend);
                            console.log("Your total is: " + "$" + total(Qprice, Qpurchase));
                        } else {
                            console.log("There is not enough in stock to fulfill the quantity requested. Please try again.");
                            purchase();
                        }
                        connection.end();
                    });
                }
            });
    }
}

// add total cost calculation + update in quantity in the database  

function total(Qprice, Qpurchase) {
    var total = Qprice * Qpurchase
    return total.toFixed(2);
}
function updateQuantity(ID, Qend) {
    connection.query("UPDATE products SET quantity = ? WHERE id = ?", [Qend, ID], function (err, res) {
        if (err) throw err;
        console.log("Updated quantity: " + Qend);
    });
};