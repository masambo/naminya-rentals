-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USER_PROFILES POLICIES
-- ============================================
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Public profiles are viewable by everyone
CREATE POLICY "Public profiles are viewable"
  ON user_profiles FOR SELECT
  USING (true);

-- ============================================
-- AGENTS POLICIES
-- ============================================
-- Anyone can view agents
CREATE POLICY "Anyone can view agents"
  ON agents FOR SELECT
  USING (true);

-- Agents can update their own profile
CREATE POLICY "Agents can update own profile"
  ON agents FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can create agent profile
CREATE POLICY "Users can create agent profile"
  ON agents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- PROPERTIES POLICIES
-- ============================================
-- Anyone can view active properties
CREATE POLICY "Anyone can view active properties"
  ON properties FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid() OR agent_id IN (
    SELECT id FROM agents WHERE user_id = auth.uid()
  ));

-- Property owners can insert properties
CREATE POLICY "Property owners can insert properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Property owners and agents can update properties
CREATE POLICY "Property owners and agents can update properties"
  ON properties FOR UPDATE
  USING (
    auth.uid() = owner_id OR 
    auth.uid() IN (SELECT user_id FROM agents WHERE id = agent_id)
  );

-- Property owners can delete properties
CREATE POLICY "Property owners can delete properties"
  ON properties FOR DELETE
  USING (auth.uid() = owner_id);

-- ============================================
-- PROPERTY_AMENITIES POLICIES
-- ============================================
-- Anyone can view amenities
CREATE POLICY "Anyone can view amenities"
  ON property_amenities FOR SELECT
  USING (true);

-- Property owners can manage amenities
CREATE POLICY "Property owners can manage amenities"
  ON property_amenities FOR ALL
  USING (
    property_id IN (
      SELECT id FROM properties WHERE owner_id = auth.uid()
    )
  );

-- ============================================
-- BOOKINGS POLICIES
-- ============================================
-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = user_id OR
    property_id IN (
      SELECT id FROM properties WHERE owner_id = auth.uid()
    ) OR
    agent_id IN (
      SELECT id FROM agents WHERE user_id = auth.uid()
    )
  );

-- Users can create bookings
CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- SAVED_PROPERTIES POLICIES
-- ============================================
-- Users can view their own saved properties
CREATE POLICY "Users can view own saved properties"
  ON saved_properties FOR SELECT
  USING (auth.uid() = user_id);

-- Users can save properties
CREATE POLICY "Users can save properties"
  ON saved_properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own saved properties
CREATE POLICY "Users can delete own saved properties"
  ON saved_properties FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- AGENT_REVIEWS POLICIES
-- ============================================
-- Anyone can view agent reviews
CREATE POLICY "Anyone can view agent reviews"
  ON agent_reviews FOR SELECT
  USING (true);

-- Users can create reviews
CREATE POLICY "Users can create agent reviews"
  ON agent_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own agent reviews"
  ON agent_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- PROPERTY_REVIEWS POLICIES
-- ============================================
-- Anyone can view property reviews
CREATE POLICY "Anyone can view property reviews"
  ON property_reviews FOR SELECT
  USING (true);

-- Users can create reviews
CREATE POLICY "Users can create property reviews"
  ON property_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own property reviews"
  ON property_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- NOTIFICATIONS POLICIES
-- ============================================
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- System can create notifications (using service role)
-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- MESSAGES POLICIES
-- ============================================
-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- Users can send messages
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Users can update messages they sent
CREATE POLICY "Users can update own sent messages"
  ON messages FOR UPDATE
  USING (auth.uid() = sender_id);
