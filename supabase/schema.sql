-- Dorit Campaign Intelligence Dashboard
-- Supabase source-of-truth schema with privacy-first campaign operations boundaries.

create extension if not exists pgcrypto;

do $$
begin
  create type app_role as enum ('candidate', 'manager', 'volunteer');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type campaign_half as enum ('King', 'V1', 'Both');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type record_status as enum ('Not Started', 'Open', 'Planning', 'In Progress', 'Waiting', 'Ready', 'Urgent', 'Verify', 'Closed');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role app_role not null default 'volunteer',
  created_at timestamptz not null default now()
);

create table if not exists public.campaign_metrics (
  key text primary key,
  label text not null,
  actual numeric not null default 0,
  target numeric not null check (target >= 0),
  unit text not null default '',
  category text not null,
  color text not null default '#075f63',
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  date date,
  date_label text not null,
  month text,
  name text not null,
  location text,
  address text,
  half campaign_half not null default 'Both',
  tier int not null check (tier between 1 and 4),
  attendance_estimate text,
  parent_heavy text,
  action_required text,
  lead_time text,
  cost text,
  status record_status not null default 'Planning',
  owner_profile_id uuid references public.profiles(id),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stakeholders (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  priority text not null check (priority in ('P1', 'P2', 'P3')),
  name text not null,
  type text,
  half campaign_half not null default 'Both',
  address text,
  community_reach text,
  why_it_matters text,
  outreach_approach text,
  talking_points text,
  contact_path text,
  status record_status not null default 'Open',
  owner_profile_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.outreach_logs (
  id uuid primary key default gen_random_uuid(),
  stakeholder_id uuid references public.stakeholders(id) on delete set null,
  stakeholder_name text,
  contact_role text,
  method text not null,
  outcome text not null,
  follow_up_required boolean not null default true,
  follow_up_date date,
  status record_status not null default 'Open',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.canvass_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  half campaign_half not null,
  tier int not null check (tier between 1 and 4),
  cadence text,
  boundaries text,
  priority_reason text,
  tactics text,
  target_doors int not null default 0,
  doors_knocked int not null default 0,
  hard_ids int not null default 0,
  status record_status not null default 'Planning',
  updated_at timestamptz not null default now()
);

create table if not exists public.map_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  half campaign_half not null default 'Both',
  tier int check (tier between 1 and 4),
  address text,
  latitude numeric,
  longitude numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.volunteer_training_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  where_to_find text,
  cares_about text,
  avoid text,
  sample_message text,
  sort_order int not null default 100
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor uuid references public.profiles(id),
  table_name text not null,
  record_id text,
  action text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.campaign_metrics enable row level security;
alter table public.events enable row level security;
alter table public.stakeholders enable row level security;
alter table public.outreach_logs enable row level security;
alter table public.canvass_zones enable row level security;
alter table public.map_locations enable row level security;
alter table public.volunteer_training_cards enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "profiles read self or managers" on public.profiles;
drop policy if exists "campaign read authenticated" on public.campaign_metrics;
drop policy if exists "events read authenticated" on public.events;
drop policy if exists "stakeholders read authenticated" on public.stakeholders;
drop policy if exists "zones read authenticated" on public.canvass_zones;
drop policy if exists "map read authenticated" on public.map_locations;
drop policy if exists "training read authenticated" on public.volunteer_training_cards;
drop policy if exists "manager metric writes" on public.campaign_metrics;
drop policy if exists "manager event writes" on public.events;
drop policy if exists "manager stakeholder writes" on public.stakeholders;
drop policy if exists "authenticated outreach insert" on public.outreach_logs;
drop policy if exists "outreach read authenticated" on public.outreach_logs;
drop policy if exists "manager zone writes" on public.canvass_zones;
drop policy if exists "audit read managers" on public.audit_log;

create or replace function public.current_app_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'volunteer'::app_role);
$$;

create policy "profiles read self or managers"
on public.profiles for select
using (id = auth.uid() or public.current_app_role() in ('candidate', 'manager'));

create policy "campaign read authenticated"
on public.campaign_metrics for select
to authenticated
using (true);

create policy "events read authenticated"
on public.events for select
to authenticated
using (true);

create policy "stakeholders read authenticated"
on public.stakeholders for select
to authenticated
using (true);

create policy "zones read authenticated"
on public.canvass_zones for select
to authenticated
using (true);

create policy "map read authenticated"
on public.map_locations for select
to authenticated
using (true);

create policy "training read authenticated"
on public.volunteer_training_cards for select
to authenticated
using (true);

create policy "manager metric writes"
on public.campaign_metrics for all
to authenticated
using (public.current_app_role() in ('candidate', 'manager'))
with check (public.current_app_role() in ('candidate', 'manager'));

create policy "manager event writes"
on public.events for all
to authenticated
using (public.current_app_role() in ('candidate', 'manager'))
with check (public.current_app_role() in ('candidate', 'manager'));

create policy "manager stakeholder writes"
on public.stakeholders for all
to authenticated
using (public.current_app_role() in ('candidate', 'manager'))
with check (public.current_app_role() in ('candidate', 'manager'));

create policy "authenticated outreach insert"
on public.outreach_logs for insert
to authenticated
with check (created_by = auth.uid() or public.current_app_role() in ('candidate', 'manager'));

create policy "outreach read authenticated"
on public.outreach_logs for select
to authenticated
using (true);

create policy "manager zone writes"
on public.canvass_zones for all
to authenticated
using (public.current_app_role() in ('candidate', 'manager'))
with check (public.current_app_role() in ('candidate', 'manager'));

create policy "audit read managers"
on public.audit_log for select
to authenticated
using (public.current_app_role() in ('candidate', 'manager'));

insert into public.campaign_metrics (key, label, actual, target, unit, category, color) values
  ('hardIds', 'Hard voter IDs', 840, 4000, '', 'votes', '#075f63'),
  ('appearances', 'In-person appearances', 38, 200, '', 'visibility', '#d85f4a'),
  ('doors', 'Doors knocked', 3150, 22000, '', 'field', '#285f9c'),
  ('events', 'Events attended', 17, 120, '', 'visibility', '#44724c'),
  ('stakeholderMeetings', 'Stakeholder meetings', 28, 180, '', 'relationships', '#d6a83f'),
  ('endorsements', 'Endorsements', 4, 35, '', 'relationships', '#0d7a78'),
  ('volunteers', 'Active volunteers', 31, 90, '', 'team', '#9f3d35'),
  ('signs', 'Signs placed', 0, 650, '', 'visibility', '#285f9c')
on conflict (key) do nothing;
