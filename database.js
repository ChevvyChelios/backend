const mysql = require('mysql2');
require('dotenv').config({ path: './config.env' });

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Get a promise-based connection
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize database and create tables if they don't exist
const initializeDatabase = async () => {
  try {
    // Create students table
    await promisePool.execute(`
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
      )
    `);

    console.log('✅ Database tables created successfully');

    // Check if we have any students, if not, insert sample data
    const [rows] = await promisePool.execute('SELECT COUNT(*) as count FROM students');
    if (rows[0].count === 0) {
      await insertSampleData();
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  }
};

// Insert sample data
const insertSampleData = async () => {
  const sampleStudents = [
    {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      course: 'Computer Science',
      year: '2023',
      gpa: 3.8,
      address: '123 Main St, City, State 12345',
      date_of_birth: '2000-05-15',
      enrollment_date: '2021-09-01'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1-555-0124',
      course: 'Mathematics',
      year: '2024',
      gpa: 3.9,
      address: '456 Oak Ave, City, State 12345',
      date_of_birth: '2001-03-22',
      enrollment_date: '2022-09-01'
    },
    {
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1-555-0125',
      course: 'Physics',
      year: '2022',
      gpa: 3.6,
      address: '789 Pine Rd, City, State 12345',
      date_of_birth: '1999-11-08',
      enrollment_date: '2020-09-01'
    }
  ];

  try {
    for (const student of sampleStudents) {
      await promisePool.execute(
        `INSERT INTO students (name, email, phone, course, year, gpa, address, date_of_birth, enrollment_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          student.name,
          student.email,
          student.phone,
          student.course,
          student.year,
          student.gpa,
          student.address,
          student.date_of_birth,
          student.enrollment_date
        ]
      );
    }
    console.log('✅ Sample data inserted successfully');
  } catch (error) {
    console.error('❌ Failed to insert sample data:', error.message);
  }
};

module.exports = {
  pool: promisePool,
  testConnection,
  initializeDatabase
};
