import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database tables
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_funnel (
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        budget_lower INTEGER,
        budget_upper INTEGER,
        due_date VARCHAR(50),
        specific_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        current_step VARCHAR(20) DEFAULT 'personal',
        UNIQUE(phone_number, created_at)
      );

      CREATE TABLE IF NOT EXISTS user_images (
        id SERIAL PRIMARY KEY,
        user_funnel_id INTEGER REFERENCES user_funnel(id),
        s3_path VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_funnel_id, s3_path)
      );

      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      DROP TRIGGER IF EXISTS update_user_funnel_updated_at ON user_funnel;
      
      CREATE TRIGGER update_user_funnel_updated_at
        BEFORE UPDATE ON user_funnel
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { pool, initDb };