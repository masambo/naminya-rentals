-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'agent', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image TEXT,
  speciality TEXT,
  location TEXT,
  bio TEXT,
  languages TEXT[],
  response_time TEXT,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  listings_count INTEGER DEFAULT 0,
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  full_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  type TEXT NOT NULL CHECK (type IN ('room', 'house', 'apartment', 'guesthouse', 'hotel', 'lodge', 'camp', 'lodges-camps', 'commercial', 'airbnb', 'mbashu')),
  rental_type TEXT NOT NULL CHECK (rental_type IN ('long-term', 'short-term')),
  price DECIMAL(12, 2) NOT NULL, -- Monthly price for long-term, base price for short-term
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  size DECIMAL(10, 2), -- in square meters
  images TEXT[], -- Array of image URLs
  verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'rented', 'inactive')),
  is_new BOOLEAN DEFAULT FALSE,
  
  -- Long-term specific fields
  available_from DATE,
  deposit DECIMAL(12, 2),
  lease_term TEXT,
  pets_allowed BOOLEAN DEFAULT FALSE,
  furnished BOOLEAN DEFAULT FALSE,
  
  -- Short-term specific fields
  daily_price DECIMAL(12, 2),
  weekly_price DECIMAL(12, 2),
  monthly_price DECIMAL(12, 2),
  minimum_stay INTEGER DEFAULT 1,
  max_guests INTEGER,
  cleaning_fee DECIMAL(12, 2),
  check_in_time TIME DEFAULT '14:00',
  check_out_time TIME DEFAULT '11:00',
  instant_book BOOLEAN DEFAULT FALSE,
  cancellation_policy TEXT CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict')),
  
  -- Availability for short-term (stored as JSONB for flexibility)
  availability JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create property_amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, amenity)
);

-- Create bookings table (for short-term rentals)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (check_out > check_in)
);

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create agent_reviews table
CREATE TABLE IF NOT EXISTS agent_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, user_id, property_id)
);

-- Create property_reviews table
CREATE TABLE IF NOT EXISTS property_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, user_id, booking_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('booking', 'message', 'review', 'property', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table (for chat functionality)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_rental_type ON properties(rental_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_properties_user_id ON saved_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_agent_id ON agent_reviews(agent_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_reviews_updated_at BEFORE UPDATE ON agent_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_reviews_updated_at BEFORE UPDATE ON property_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update agent listings count
CREATE OR REPLACE FUNCTION update_agent_listings_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE agents SET listings_count = listings_count + 1 WHERE id = NEW.agent_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE agents SET listings_count = listings_count - 1 WHERE id = OLD.agent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agent_listings_count_trigger
  AFTER INSERT OR DELETE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_agent_listings_count();

-- Create function to update agent rating
CREATE OR REPLACE FUNCTION update_agent_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE agents
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM agent_reviews
      WHERE agent_id = COALESCE(NEW.agent_id, OLD.agent_id)
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM agent_reviews
      WHERE agent_id = COALESCE(NEW.agent_id, OLD.agent_id)
    )
  WHERE id = COALESCE(NEW.agent_id, OLD.agent_id);
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agent_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON agent_reviews
  FOR EACH ROW EXECUTE FUNCTION update_agent_rating();
