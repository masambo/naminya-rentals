# Supabase Integration Guide

This guide will help you complete the Supabase integration for the Ndunda rental platform.

## ✅ What's Already Done

1. **Database Schema Created** - SQL migration files in `supabase/migrations/`
2. **RLS Policies Created** - Security policies for all tables
3. **Service Files Created** - TypeScript services for database operations
4. **React Hooks Created** - Custom hooks for easy data fetching
5. **Search Page Updated** - Now uses real Supabase data

## 📋 Step-by-Step Setup

### Step 1: Run Database Migrations

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `siutwkvarytqrjkwnyxv`
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

#### Run Migration 1: Create Tables
1. Open `supabase/migrations/01_create_tables.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click **Run** (or press Ctrl+Enter)
5. Wait for success message

#### Run Migration 2: Create RLS Policies
1. Open `supabase/migrations/02_create_rls_policies.sql`
2. Copy the entire contents
3. Paste into the SQL Editor
4. Click **Run**
5. Wait for success message

### Step 2: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - ✅ `user_profiles`
   - ✅ `agents`
   - ✅ `properties`
   - ✅ `property_amenities`
   - ✅ `bookings`
   - ✅ `saved_properties`
   - ✅ `agent_reviews`
   - ✅ `property_reviews`
   - ✅ `notifications`
   - ✅ `messages`

### Step 3: Verify RLS Policies

1. Go to **Authentication** > **Policies** in Supabase dashboard
2. Each table should have policies listed
3. Verify policies are enabled (green toggle)

### Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Search page
3. The page should load (may show empty state if no data)
4. Check browser console for any errors

## 🗄️ Database Schema Overview

### Core Tables

#### `user_profiles`
- Extends Supabase `auth.users`
- Stores: full_name, phone, avatar_url, role

#### `agents`
- Agent profiles
- Stores: name, image, speciality, location, bio, languages, verified status, ratings

#### `properties`
- Property listings (supports long-term and short-term)
- Stores: title, description, location, type, price, bedrooms, bathrooms, images
- Long-term fields: available_from, deposit, lease_term, pets_allowed, furnished
- Short-term fields: daily_price, weekly_price, minimum_stay, max_guests, cleaning_fee, check_in/out times

#### `bookings`
- Short-term rental bookings
- Stores: check_in, check_out, guests, total_price, status, payment_status

#### `saved_properties`
- User saved/favorited properties
- Many-to-many relationship between users and properties

#### `agent_reviews` & `property_reviews`
- Review system for agents and properties
- Stores: rating (1-5), comment, verified status

#### `notifications` & `messages`
- User notifications and chat messages

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with these policies:

- **Public Read**: Active properties, agents, reviews are viewable by everyone
- **User Owned**: Users can only modify their own data (properties, bookings, saved properties)
- **Agent Permissions**: Agents can manage properties they're assigned to

## 📝 Next Steps: Update Remaining Components

### Components to Update:

1. **Index.tsx** - Home page property listings
   - Replace mock data with `useProperties()` hook
   - Update FeaturedAgents to use `useAgents()` hook

2. **Agents.tsx** - Agents listing page
   - Already has service, just need to use `useAgents()` hook

3. **AgentView.tsx** - Individual agent page
   - Use `useAgent(id)` hook
   - Load agent reviews from Supabase

4. **PropertyView.tsx** - Individual property page
   - Use `useProperty(id)` hook
   - Load property details, amenities, agent info

5. **MyListings.tsx** - User's properties
   - Use `propertiesService.getByOwner(userId)`

6. **SavedProperties.tsx** - Saved properties
   - Use `savedPropertiesService.getByUser(userId)`

7. **AddListing.tsx** - Create new property
   - Use `propertiesService.create()` on form submit

## 🧪 Testing

### Insert Test Data

You can insert test data using the SQL Editor:

```sql
-- Insert test agent
INSERT INTO agents (user_id, name, image, speciality, location, bio, verified)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user_id
  'Test Agent',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'Apartments & Houses',
  'Windhoek Central',
  'Test agent bio',
  true
);

-- Insert test property
INSERT INTO properties (
  owner_id,
  agent_id,
  title,
  description,
  location,
  type,
  rental_type,
  price,
  bedrooms,
  bathrooms,
  size,
  images,
  status
)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user_id
  (SELECT id FROM agents LIMIT 1),
  'Test Property',
  'This is a test property',
  'Windhoek',
  'apartment',
  'long-term',
  10000,
  2,
  1,
  75,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
  'active'
);
```

## 🐛 Troubleshooting

### Issue: "relation does not exist"
- **Solution**: Make sure you ran both migration files in order

### Issue: "permission denied"
- **Solution**: Check RLS policies are enabled and correct
- Verify user is authenticated if accessing protected data

### Issue: Empty results
- **Solution**: Insert test data using SQL above
- Check that properties have `status = 'active'`

### Issue: Type errors in TypeScript
- **Solution**: Run `npm run build` to check for type errors
- Make sure all service imports are correct

## 📚 Available Services & Hooks

### Services
- `propertiesService` - Property CRUD operations
- `agentsService` - Agent operations
- `bookingsService` - Booking management
- `savedPropertiesService` - Saved properties management

### Hooks
- `useProperties(filters?)` - Get all properties with filters
- `useProperty(id)` - Get single property
- `useSearchProperties(query, filters?)` - Search properties
- `useAgents()` - Get all agents
- `useAgent(id)` - Get single agent

## 🔄 Migration Workflow

When you need to update the schema:

1. Create new migration file: `supabase/migrations/03_<description>.sql`
2. Write your SQL changes
3. Run in Supabase SQL Editor
4. Update TypeScript types if needed
5. Update service files if schema changed

## 📞 Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Check browser console for errors
3. Verify environment variables are set
4. Ensure RLS policies are correct

---

**Status**: Database schema ready, Search page integrated. Remaining components need to be updated to use Supabase hooks.
