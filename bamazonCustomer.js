// required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
//create the connection information for the MYSQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
});
// connect to the MYSQL server and database
connection.connect(function(err) {
  if (err) throw err;
  
});

// run start function
function start() {

// query MYSQL and select from products list
connection.query("SELECT * FROM products", function(err, res) {

// console log blank line and table of results from products
  console.log("");
  console.table(res);
});

// prompt customer regarding which item and how many of that item they would like to purchase
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;

  inquirer.prompt([{
      name: "itemTable",
      list: function() {
          var productsArr = [];
          for (var i = 0; i < res.length; i++) {
              productsArr.push(res[i].item_id);
          }
          return productsArr;
      },
      message: "Please enter Item ID of the item you want to purchase.",
  }, {
      name: "unitNum",
      message: "How many of this item would you like to order?",

  }]).then(function(custAnswer) {

      // stores customer answer to which item
      var customerChoice = custAnswer.itemTable.trim();

      //index of choice
      var arrNum = customerChoice - 1;
    // sets variable for chosen product to results array
      var chosenProduct = res[arrNum];

      //displays item choosen
      console.log("=======================================================");
      console.log("You selected item ID:  " + customerChoice + ", Product Name: " + chosenProduct.product_name);

      //displays how many items were requested 
      var unitNum = custAnswer.unitNum.trim();
      console.log("Quantity: " + unitNum);

      //num of stocks available in store
      var itemStocks = chosenProduct.stock_quantity;

      if (unitNum < chosenProduct.stock_quantity) {
          var newQuantity = chosenProduct.stock_quantity - unitNum

          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: newQuantity
          }, {
              item_id: chosenProduct.item_id
          }], function(err) {
              if (err) throw err;
              console.log("Your order has been placed");
              console.log("Total cost: $" + (unitNum * chosenProduct.price));
              console.log("=======================================================");

          })
      } else {
        console.log("=======================================================");
        console.log("");
        console.log("Sorry, that item is out of stock");
        console.log("");
        console.log("=======================================================");
      };
  });
});
}


inquirer
.prompt({
  name: "buyOrExit",
  type: "list",
  message: "Would you like to shop or exit?",
  choices: ["SHOP", "EXIT"]
})

.then(function (answer) {
  // based on their answer, either call the shop function or exit 
  
  if (answer.buyOrExit === "SHOP") {
    start();
  }

  else if (answer.buyOrExit === "EXIT") {
    console.log("=====================================");
    console.log("");
    console.log("Thank you, please shop with us again.");
    console.log("");
    console.log("=====================================");
    connection.end();
  }
});