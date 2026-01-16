# Supabase Integration Setup

This project is now integrated with Supabase for backend functionality including authentication, database, and real-time features.

## Environment Variables

The Supabase configuration is stored in environment variables. A `.env` file has been created with the following:

```
VITE_SUPABASE_URL=https://siutwkvarytqrjkwnyxv.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_pUUZZ6Rz1Fj2jl3SqeWQcg_NOlazCo6
```

## Features Integrated

### 1. Authentication
- **Location**: `src/contexts/AuthContext.tsx`
- **Usage**: Import `useAuth()` hook in any component
- **Methods Available**:
  - `signIn(email, password)` - Sign in with email/password
  - `signUp(email, password, metadata)` - Create new account
  - `signOut()` - Sign out current user
  - `resetPassword(email)` - Send password reset email
  - `user` - Current user object
  - `session` - Current session
  - `loading` - Loading state

### 2. Database Hooks
- **Location**: `src/hooks/useSupabase.ts`
- **Available Hooks**:
  - `useSupabaseQuery<T>()` - Fetch data from tables
  - `useSupabaseInsert<T>()` - Insert new records
  - `useSupabaseUpdate<T>()` - Update existing records
  - `useSupabaseDelete()` - Delete records

### 3. Supabase Client
- **Location**: `src/lib/supabase.ts`
- **Usage**: Import `supabase` directly for advanced operations

## Example Usage

### Authentication Example
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signOut, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Database Query Example
```typescript
import { useSupabaseQuery } from '@/hooks/useSupabase';

function PropertiesList() {
  const { data, loading, error } = useSupabaseQuery('properties', {
    filters: { status: 'active' },
    orderBy: { column: 'created_at', ascending: false },
    limit: 10
  });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(property => (
        <div key={property.id}>{property.title}</div>
      ))}
    </div>
  );
}
```

## Next Steps

1. **Set up your Supabase database schema**:
   - Go to your Supabase dashboard
   - Create tables for: properties, agents, users, bookings, etc.
   - Set up Row Level Security (RLS) policies

2. **Configure Authentication**:
   - Set up email templates in Supabase dashboard
   - Configure OAuth providers if needed
   - Set up password reset redirect URLs

3. **Update Components**:
   - Replace mock data with real Supabase queries
   - Add authentication checks to protected routes
   - Implement real-time updates where needed

## Database Schema Suggestions

Consider creating these tables:
- `properties` - Property listings
- `agents` - Agent profiles
- `users` - Extended user profiles (extends Supabase auth.users)
- `bookings` - Booking/reservation records
- `saved_properties` - User saved properties
- `messages` - Chat messages
- `notifications` - User notifications

## Security Notes

- The anon key is safe to expose in client-side code
- Always use Row Level Security (RLS) policies in Supabase
- Never expose service role keys in client code
- Validate all user inputs before database operations
