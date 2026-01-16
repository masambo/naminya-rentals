# Supabase Database Setup

This directory contains SQL migration files to set up your Supabase database schema.

## Setup Instructions

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project: `siutwkvarytqrjkwnyxv`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run Migrations in Order**
   - Copy and paste the contents of `01_create_tables.sql` into the SQL editor
   - Click "Run" to execute
   - Wait for it to complete
   - Repeat for `02_create_rls_policies.sql`

4. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see all the tables:
     - user_profiles
     - agents
     - properties
     - property_amenities
     - bookings
     - saved_properties
     - agent_reviews
     - property_reviews
     - notifications
     - messages

5. **Verify RLS Policies**
   - Go to "Authentication" > "Policies" in the left sidebar
   - You should see policies for each table

## Database Schema Overview

### Core Tables

- **user_profiles**: Extended user information (extends Supabase auth.users)
- **agents**: Agent profiles and information
- **properties**: Property listings (supports both long-term and short-term)
- **property_amenities**: Amenities for each property
- **bookings**: Short-term rental bookings
- **saved_properties**: User saved/favorited properties
- **agent_reviews**: Reviews for agents
- **property_reviews**: Reviews for properties
- **notifications**: User notifications
- **messages**: Chat messages between users

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Public data (like active properties) is viewable by everyone
- Property owners and agents have appropriate permissions

## Next Steps

After running the migrations:
1. Test the schema by inserting some test data
2. Update your application components to use Supabase queries
3. Set up authentication flows
4. Test RLS policies to ensure they work correctly

## Notes

- All tables use UUIDs as primary keys
- Timestamps are automatically managed with triggers
- Agent ratings and listing counts are automatically updated via triggers
- The schema supports both long-term and short-term rentals
