-- Student Management System Database Setup
-- Run this script to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    gpa DECIMAL(3,2) NOT NULL,
    address TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO students (name, email, phone, course, year, gpa, address, date_of_birth, enrollment_date) VALUES
('John Doe', 'john.doe@email.com', '+1-555-0123', 'Computer Science', '2023', 3.8, '123 Main St, City, State 12345', '2000-05-15', '2021-09-01'),
('Jane Smith', 'jane.smith@email.com', '+1-555-0124', 'Mathematics', '2024', 3.9, '456 Oak Ave, City, State 12345', '2001-03-22', '2022-09-01'),
('Mike Johnson', 'mike.johnson@email.com', '+1-555-0125', 'Physics', '2022', 3.6, '789 Pine Rd, City, State 12345', '1999-11-08', '2020-09-01'),
('Sarah Wilson', 'sarah.wilson@email.com', '+1-555-0126', 'Chemistry', '2024', 3.7, '321 Elm St, City, State 12345', '2000-08-12', '2022-09-01'),
('David Brown', 'david.brown@email.com', '+1-555-0127', 'Biology', '2025', 3.5, '654 Maple Ave, City, State 12345', '2002-01-25', '2023-09-01');

-- Show the created table structure
DESCRIBE students;

-- Show sample data
SELECT * FROM students;
