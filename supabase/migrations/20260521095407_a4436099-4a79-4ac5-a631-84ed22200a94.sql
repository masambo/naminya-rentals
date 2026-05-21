
-- Fix security definer view
drop view if exists public.user_profiles;
create view public.user_profiles with (security_invoker = true) as
  select p.id, p.full_name, p.phone, p.avatar_url,
         coalesce((select role::text from public.user_roles r where r.user_id = p.id limit 1),'customer') as role,
         p.created_at, p.updated_at
  from public.profiles p;

-- Tighten notifications insert
drop policy if exists "System insert notifications" on public.notifications;
create policy "Users insert own notifications" on public.notifications for insert to authenticated with check (auth.uid() = user_id);

-- Remove broad listing select on public buckets (CDN still serves files)
drop policy if exists "Public read property images" on storage.objects;
drop policy if exists "Public read avatars" on storage.objects;
