DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    dept_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Eraser", "Office Supplies", "1.00", "50");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Stapler", "Office Supplies", "4.00", "40");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Pillow", "Bedding", "5.00", "100");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Bedsheet Set", "Bedding", "25.00", "25");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Tool Kit", "Tools", "10.00", "15");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Kit Kat", "Food", "1.50", "200");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("iPhone", "Electronics", "1000.00", "10");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Vaccum", "Cleaning", "60.00", "50");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Printer", "Electronics", "75.00", "35");
INSERT INTO products(name, dept_name, price, quantity)
VALUES ("Toilet Paper", "Cleaning", "15.00", "150");