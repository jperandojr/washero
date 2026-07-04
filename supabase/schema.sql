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

-- Lock every table down by default. The dashboard and the public booking
-- form both talk to Supabase through server-side code using the
-- service_role key, which bypasses RLS entirely -- so no public policies
-- are needed here.
alter table pages enable row level security;
alter table blog_posts enable row level security;
alter table orders enable row level security;
