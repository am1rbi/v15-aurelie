import { Request, Response } from 'express';
import { pool } from '../db';
import { upload } from '../services/s3Service';
import { validatePhoneNumber, validateEmail } from '../utils/validation';

export const createOrUpdateUserFunnel = async (req: Request, res: Response) => {
  const { 
    phoneNumber,
    firstName,
    lastName,
    email,
    budgetLower,
    budgetUpper,
    dueDate,
    specificDate,
    currentStep
  } = req.body;

  try {
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const result = await pool.query(
      `INSERT INTO user_funnel 
        (phone_number, first_name, last_name, email, budget_lower, budget_upper, due_date, specific_date, current_step)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (phone_number, created_at)
       DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        email = EXCLUDED.email,
        budget_lower = EXCLUDED.budget_lower,
        budget_upper = EXCLUDED.budget_upper,
        due_date = EXCLUDED.due_date,
        specific_date = EXCLUDED.specific_date,
        current_step = EXCLUDED.current_step,
        updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [phoneNumber, firstName, lastName, email, budgetLower, budgetUpper, dueDate, specificDate, currentStep]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in createOrUpdateUserFunnel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const uploadImages = upload.array('images', 5);

export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.MulterS3.File[];
    const { userFunnelId } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageInsertPromises = files.map(file =>
      pool.query(
        'INSERT INTO user_images (user_funnel_id, s3_path) VALUES ($1, $2) RETURNING *',
        [userFunnelId, file.location]
      )
    );

    const results = await Promise.all(imageInsertPromises);
    
    res.json({
      message: 'Files uploaded successfully',
      images: results.map(result => result.rows[0])
    });
  } catch (error) {
    console.error('Error in handleImageUpload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserFunnelData = async (req: Request, res: Response) => {
  const { phoneNumber } = req.params;

  try {
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    const userResult = await pool.query(
      `SELECT * FROM user_funnel WHERE phone_number = $1 ORDER BY created_at DESC LIMIT 1`,
      [phoneNumber]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    const imagesResult = await pool.query(
      `SELECT s3_path FROM user_images WHERE user_funnel_id = $1`,
      [user.id]
    );

    res.json({
      ...user,
      images: imagesResult.rows.map(row => row.s3_path)
    });
  } catch (error) {
    console.error('Error in getUserFunnelData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};