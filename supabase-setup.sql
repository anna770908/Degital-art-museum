-- Create visits table
CREATE TABLE visits (
  id TEXT PRIMARY KEY,
  museum TEXT NOT NULL,
  exhibition TEXT NOT NULL,
  artwork TEXT NOT NULL,
  artist TEXT NOT NULL,
  postcard TEXT,
  review TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own visits
CREATE POLICY "Users can view their own visits" ON visits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own visits" ON visits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visits" ON visits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visits" ON visits
  FOR DELETE USING (auth.uid() = user_id);