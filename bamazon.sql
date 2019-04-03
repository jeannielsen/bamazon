DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (40) NOT NULL,
department_name VARCHAR (25),
price DECIMAL (6, 2) NOT NULL,
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products
  (product_name, department_name, price, stock_quantity)
VALUES
  ('Where the Crawdads Sing', 'books', 18.17, 27), 
  ('Grip & Stand for Phones','cell phone accessories' , 12.99, 37), 
  ('lousiana hot sauce', 'food', 3.99, 0),
  ('purple tote bag', 'womens accessories', 56.47, 6),
  ('Nike sandal', 'mens shoes', 27.50, 38),
  ('queen size bed sheet', 'home goods', 39.99, 32),
  ('rice steamer', 'kitchen', 24.99, 13),
  ('scented candle', 'home goods', 6.99, 59),
  ('decorative pillow', 'home goods', 15.49, 12),
  ('throw rug', 'home goods', 24.99, 98),
  ('kale chips', 'food', 5.99, 70);