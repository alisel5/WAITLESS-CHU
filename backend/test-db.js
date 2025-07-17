const { Pool } = require('pg');

// Test database connection
async function testDatabaseConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'waitless_chu',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
  });

  try {
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    // Test users table
    const usersResult = await client.query('SELECT COUNT(*) as user_count FROM users');
    console.log('✅ Users table accessible:', usersResult.rows[0]);
    
    client.release();
    await pool.end();
    
    console.log('✅ All database tests passed!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

// Test registration endpoint
async function testRegistrationEndpoint() {
  const axios = require('axios');
  
  try {
    console.log('\nTesting registration endpoint...');
    
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123',
      phone: '+1234567890'
    };
    
    const response = await axios.post('http://localhost:3001/api/auth/register', testUser);
    
    console.log('✅ Registration endpoint working!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Registration endpoint failed:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Running database and API tests...\n');
  
  await testDatabaseConnection();
  await testRegistrationEndpoint();
  
  console.log('\n🎉 Tests completed!');
}

runTests().catch(console.error); 