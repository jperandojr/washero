-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)

create extension if not exists "pgcrypto";

-- ---------- pages ----------
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- blog posts ----------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- orders (from the booking form) ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  address text not null,
  service text not null,
  pickup_date date not null,
  pickup_time text not null,
  load_size text,
  notes text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ---------- admin users ----------
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'partner' check (role in ('admin', 'partner')),
  created_at timestamptz not null default now()
);

-- ---------- marketing assets (metadata; files live in Supabase Storage) ----------
create table if not exists marketing_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  file_path text not null,
  file_url text not null,
  file_type text not null,
  file_size bigint,
  created_at timestamptz not null default now()
);

-- ---------- site settings (single row) ----------
-- id is a boolean that can only ever be `true`, so the primary key
-- constraint enforces exactly one row for the whole table.
create table if not exists site_settings (
  id boolean primary key default true check (id),
  phone_display text not null default '(000) 000-0000',
  phone_href text not null default '+639000000000',
  email text not null default 'hello@washero.com',
  hours_weekday text not null default 'Mon–Sat · 7 AM – 8 PM',
  hours_sunday text not null default 'Sun · 8 AM – 5 PM',
  whatsapp_number text not null default '639000000000',
  messenger_username text not null default 'washero',
  updated_at timestamptz not null default now()
);

insert into site_settings (id) values (true) on conflict (id) do nothing;

-- Lock every table down by default. The dashboard and the public booking
-- form both talk to Supabase through server-side code using the
-- service_role key, which bypasses RLS entirely -- so no public policies
-- are needed here.
alter table pages enable row level security;
alter table blog_posts enable row level security;
alter table orders enable row level security;
alter table site_settings enable row level security;
alter table admin_users enable row level security;
alter table marketing_assets enable row level security;
