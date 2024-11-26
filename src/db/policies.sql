-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON submission_images;
DROP POLICY IF EXISTS "Enable read access for all users" ON submission_images;

-- Enable RLS on tables
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_images ENABLE ROW LEVEL SECURITY;

-- Create policies for submissions table
CREATE POLICY "Enable insert for all users" ON submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON submissions
  FOR SELECT TO anon
  USING (true);

-- Create policies for submission_images table
CREATE POLICY "Enable insert for all users" ON submission_images
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON submission_images
  FOR SELECT TO anon
  USING (true);