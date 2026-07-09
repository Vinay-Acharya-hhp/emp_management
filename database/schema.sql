-- Run this manually if you don't want Hibernate auto-DDL to create the table.
-- (Spring Boot's spring.jpa.hibernate.ddl-auto=update will create this automatically on first run.)

CREATE DATABASE IF NOT EXISTS employeedb;
USE employeedb;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    salary DOUBLE NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Sample seed data
INSERT INTO employees (first_name, last_name, email, department, salary, created_at, updated_at) VALUES
('Asha', 'Rao', 'asha.rao@example.com', 'Engineering', 95000, NOW(), NOW()),
('Vikram', 'Nair', 'vikram.nair@example.com', 'Marketing', 68000, NOW(), NOW()),
('Priya', 'Iyer', 'priya.iyer@example.com', 'HR', 72000, NOW(), NOW()),
('Rohan', 'Mehta', 'rohan.mehta@example.com', 'Engineering', 102000, NOW(), NOW());
