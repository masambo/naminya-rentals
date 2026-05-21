
-- ============ ENUMS ============
create type public.property_type as enum ('room','house','apartment','guesthouse','hotel','lodge','camp','commercial','airbnb','mbashu');
create type public.rental_type as enum ('long-term','short-term');
create type public.property_status as enum ('active','pending','sold','rented','inactive');
create type public.cancellation_policy as enum ('flexible','moderate','strict');
create type public.booking_status as enum ('pending','confirmed','cancelled','completed');
create type public.payment_status as enum ('pending','paid','refunded');
create type public.agent_app_status as enum ('pending','approved','rejected');

-- ============ AGENTS ============
create table public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  name text not null,
  image text,
  speciality text,
  location text,
  bio text,
  languages text[],
  response_time text,
  phone text,
  email text,
  verified boolean not null default false,
  rating numeric(3,2) not null default 0,
  reviews_count integer not null default 0,
  listings_count integer not null default 0,
  joined_date timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.agents enable row level security;
create policy "Agents are viewable by everyone" on public.agents for select using (true);
create policy "Users can create their own agent profile" on public.agents for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can update their own agent profile" on public.agents for update to authenticated using (auth.uid() = user_id);
create policy "Admins can manage agents" on public.agents for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ PROPERTIES ============
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  agent_id uuid references public.agents(id) on delete set null,
  title text not null,
  description text,
  location text not null,
  full_address text,
  latitude numeric,
  longitude numeric,
  type public.property_type not null,
  rental_type public.rental_type not null default 'long-term',
  price numeric not null default 0,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  size numeric,
  images text[] not null default '{}',
  verified boolean not null default false,
  status public.property_status not null default 'active',
  is_new boolean not null default true,
  available_from date,
  deposit numeric,
  lease_term text,
  pets_allowed boolean not null default false,
  furnished boolean not null default false,
  daily_price numeric,
  weekly_price numeric,
  monthly_price numeric,
  minimum_stay integer,
  max_guests integer,
  cleaning_fee numeric,
  check_in_time text,
  check_out_time text,
  instant_book boolean not null default false,
  cancellation_policy public.cancellation_policy,
  availability jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.properties enable row level security;
create policy "Properties are viewable by everyone" on public.properties for select using (true);
create policy "Owners can insert properties" on public.properties for insert to authenticated with check (auth.uid() = owner_id);
create policy "Owners can update their properties" on public.properties for update to authenticated using (auth.uid() = owner_id);
create policy "Owners can delete their properties" on public.properties for delete to authenticated using (auth.uid() = owner_id);
create policy "Admins manage properties" on public.properties for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ SAVED PROPERTIES ============
create table public.saved_properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, property_id)
);
alter table public.saved_properties enable row level security;
create policy "Users view own saved" on public.saved_properties for select to authenticated using (auth.uid() = user_id);
create policy "Users save" on public.saved_properties for insert to authenticated with check (auth.uid() = user_id);
create policy "Users unsave" on public.saved_properties for delete to authenticated using (auth.uid() = user_id);

-- ============ BOOKINGS ============
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null,
  agent_id uuid references public.agents(id) on delete set null,
  check_in date not null,
  check_out date not null,
  guests integer not null default 1,
  total_price numeric not null default 0,
  status public.booking_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  special_requests text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
create policy "Users view own bookings" on public.bookings for select to authenticated using (auth.uid() = user_id or auth.uid() in (select owner_id from public.properties where id = property_id));
create policy "Users create bookings" on public.bookings for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own bookings" on public.bookings for update to authenticated using (auth.uid() = user_id);

-- ============ AGENT REVIEWS ============
create table public.agent_reviews (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  user_id uuid not null,
  property_id uuid references public.properties(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);
alter table public.agent_reviews enable row level security;
create policy "Reviews viewable" on public.agent_reviews for select using (true);
create policy "Users create reviews" on public.agent_reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own reviews" on public.agent_reviews for update to authenticated using (auth.uid() = user_id);
create policy "Users delete own reviews" on public.agent_reviews for delete to authenticated using (auth.uid() = user_id);

-- ============ CONVERSATIONS & MESSAGES ============
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  participant_one uuid not null,
  participant_two uuid not null,
  property_id uuid references public.properties(id) on delete set null,
  last_message text,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  unique(participant_one, participant_two, property_id)
);
alter table public.conversations enable row level security;
create policy "Participants view conversation" on public.conversations for select to authenticated using (auth.uid() in (participant_one, participant_two));
create policy "Users create conversations" on public.conversations for insert to authenticated with check (auth.uid() in (participant_one, participant_two));
create policy "Participants update conversation" on public.conversations for update to authenticated using (auth.uid() in (participant_one, participant_two));

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null,
  content text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "Participants read messages" on public.messages for select to authenticated using (
  exists (select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.participant_one, c.participant_two))
);
create policy "Participants send messages" on public.messages for insert to authenticated with check (
  auth.uid() = sender_id and exists (select 1 from public.conversations c where c.id = conversation_id and auth.uid() in (c.participant_one, c.participant_two))
);
create policy "Sender update message" on public.messages for update to authenticated using (auth.uid() = sender_id);

-- ============ NOTIFICATIONS ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  body text,
  type text not null default 'info',
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
create policy "Users view own notifications" on public.notifications for select to authenticated using (auth.uid() = user_id);
create policy "Users update own notifications" on public.notifications for update to authenticated using (auth.uid() = user_id);
create policy "Users delete own notifications" on public.notifications for delete to authenticated using (auth.uid() = user_id);
create policy "System insert notifications" on public.notifications for insert to authenticated with check (true);

-- ============ AGENT APPLICATIONS ============
create table public.agent_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  full_name text not null,
  phone text not null,
  email text not null,
  location text,
  experience text,
  id_document_url text,
  status public.agent_app_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.agent_applications enable row level security;
create policy "Users view own application" on public.agent_applications for select to authenticated using (auth.uid() = user_id);
create policy "Users create own application" on public.agent_applications for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own application" on public.agent_applications for update to authenticated using (auth.uid() = user_id);
create policy "Admins manage applications" on public.agent_applications for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ TRIGGERS ============
create trigger trg_agents_updated before update on public.agents for each row execute function public.set_updated_at();
create trigger trg_properties_updated before update on public.properties for each row execute function public.set_updated_at();
create trigger trg_bookings_updated before update on public.bookings for each row execute function public.set_updated_at();
create trigger trg_agent_apps_updated before update on public.agent_applications for each row execute function public.set_updated_at();

-- ============ VIEW alias for user_profiles ============
create view public.user_profiles as
  select p.id, p.full_name, p.phone, p.avatar_url,
         coalesce((select role::text from public.user_roles r where r.user_id = p.id limit 1),'customer') as role,
         p.created_at, p.updated_at
  from public.profiles p;

-- ============ INDEXES ============
create index idx_properties_status on public.properties(status);
create index idx_properties_type on public.properties(type);
create index idx_properties_owner on public.properties(owner_id);
create index idx_messages_conv on public.messages(conversation_id, created_at);
create index idx_notif_user on public.notifications(user_id, created_at desc);

-- ============ STORAGE BUCKETS ============
insert into storage.buckets (id, name, public) values ('property-images','property-images',true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('avatars','avatars',true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('agent-documents','agent-documents',false) on conflict do nothing;

create policy "Public read property images" on storage.objects for select using (bucket_id = 'property-images');
create policy "Auth upload property images" on storage.objects for insert to authenticated with check (bucket_id = 'property-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Owner update property images" on storage.objects for update to authenticated using (bucket_id = 'property-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Owner delete property images" on storage.objects for delete to authenticated using (bucket_id = 'property-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Public read avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "Auth upload avatars" on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Owner update avatars" on storage.objects for update to authenticated using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Owner read agent docs" on storage.objects for select to authenticated using (bucket_id = 'agent-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Auth upload agent docs" on storage.objects for insert to authenticated with check (bucket_id = 'agent-documents' and auth.uid()::text = (storage.foldername(name))[1]);

-- ============ REALTIME ============
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.conversations;
