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

do $$
begin
  create type approval_status as enum ('pending', 'approved', 'rejected', 'suspended');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role app_role not null default 'volunteer',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists approval_status approval_status not null default 'pending';
alter table public.profiles add column if not exists community_preference text;
alter table public.profiles add column if not exists zone_preference text;
alter table public.profiles add column if not exists availability_note text;
alter table public.profiles add column if not exists volunteer_interests text[] not null default '{}';
alter table public.profiles add column if not exists approved_at timestamptz;
alter table public.profiles add column if not exists approved_by uuid references public.profiles(id);
alter table public.profiles add column if not exists decision_note text;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

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

create table if not exists public.volunteer_assignments (
  id uuid primary key default gen_random_uuid(),
  volunteer_profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  assignment_type text not null default 'Shift',
  assignment_date date,
  start_time time,
  end_time time,
  location text,
  zone_id uuid references public.canvass_zones(id) on delete set null,
  instructions text,
  status record_status not null default 'Open',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteer_availability (
  id uuid primary key default gen_random_uuid(),
  volunteer_profile_id uuid not null unique references public.profiles(id) on delete cascade,
  weekdays text,
  weekends text,
  communities text,
  interests text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteer_reports (
  id uuid primary key default gen_random_uuid(),
  volunteer_profile_id uuid not null references public.profiles(id) on delete cascade,
  assignment_id uuid references public.volunteer_assignments(id) on delete set null,
  report_type text not null,
  zone_id uuid references public.canvass_zones(id) on delete set null,
  doors_knocked int not null default 0,
  hard_ids int not null default 0,
  issue_note text,
  shift_note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.account_approval_log (
  id bigint generated always as identity primary key,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  actor uuid references public.profiles(id),
  action text not null check (action in ('approve', 'reject', 'suspend', 'reactivate')),
  note text,
  created_at timestamptz not null default now()
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
alter table public.volunteer_assignments enable row level security;
alter table public.volunteer_availability enable row level security;
alter table public.volunteer_reports enable row level security;
alter table public.account_approval_log enable row level security;
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
drop policy if exists "profiles update managers" on public.profiles;
drop policy if exists "assignments read scoped" on public.volunteer_assignments;
drop policy if exists "assignments write managers" on public.volunteer_assignments;
drop policy if exists "availability read scoped" on public.volunteer_availability;
drop policy if exists "availability upsert self or managers" on public.volunteer_availability;
drop policy if exists "reports read scoped" on public.volunteer_reports;
drop policy if exists "reports insert self" on public.volunteer_reports;
drop policy if exists "approval log read managers" on public.account_approval_log;

create or replace function public.current_app_role()
returns app_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'volunteer'::app_role);
$$;

create or replace function public.current_approval_status()
returns approval_status
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select approval_status from public.profiles where id = auth.uid()), 'pending'::approval_status);
$$;

create or replace function public.current_profile_approved()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_approval_status() = 'approved'::approval_status;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    email,
    phone,
    role,
    approval_status,
    community_preference,
    zone_preference,
    availability_note,
    volunteer_interests
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), 'Volunteer'),
    new.email,
    nullif(new.raw_user_meta_data->>'phone', ''),
    'volunteer',
    'pending',
    nullif(new.raw_user_meta_data->>'community_preference', ''),
    nullif(new.raw_user_meta_data->>'zone_preference', ''),
    nullif(new.raw_user_meta_data->>'availability_note', ''),
    coalesce(
      array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'volunteer_interests', '[]'::jsonb))),
      '{}'::text[]
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create policy "profiles read self or managers"
on public.profiles for select
using (id = auth.uid() or (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager')));

create policy "profiles update managers"
on public.profiles for update
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert"
on public.profiles for insert
to authenticated
with check (id = auth.uid() and role = 'volunteer' and approval_status = 'pending');

create policy "campaign read authenticated"
on public.campaign_metrics for select
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "events read authenticated"
on public.events for select
to authenticated
using (public.current_profile_approved());

create policy "stakeholders read authenticated"
on public.stakeholders for select
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "zones read authenticated"
on public.canvass_zones for select
to authenticated
using (
  public.current_profile_approved()
  and (
    public.current_app_role() in ('candidate', 'manager')
    or exists (
      select 1 from public.volunteer_assignments va
      where va.zone_id = public.canvass_zones.id
        and va.volunteer_profile_id = auth.uid()
    )
  )
);

create policy "map read authenticated"
on public.map_locations for select
to authenticated
using (public.current_profile_approved());

create policy "training read authenticated"
on public.volunteer_training_cards for select
to authenticated
using (public.current_profile_approved());

create policy "manager metric writes"
on public.campaign_metrics for all
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "manager event writes"
on public.events for all
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "manager stakeholder writes"
on public.stakeholders for all
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "authenticated outreach insert"
on public.outreach_logs for insert
to authenticated
with check (public.current_profile_approved() and (created_by = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "outreach read authenticated"
on public.outreach_logs for select
to authenticated
using (public.current_profile_approved() and (created_by = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "manager zone writes"
on public.canvass_zones for all
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "audit read managers"
on public.audit_log for select
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "assignments read scoped"
on public.volunteer_assignments for select
to authenticated
using (public.current_profile_approved() and (volunteer_profile_id = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "assignments write managers"
on public.volunteer_assignments for all
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'))
with check (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

create policy "availability read scoped"
on public.volunteer_availability for select
to authenticated
using (public.current_profile_approved() and (volunteer_profile_id = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "availability upsert self or managers"
on public.volunteer_availability for all
to authenticated
using (public.current_profile_approved() and (volunteer_profile_id = auth.uid() or public.current_app_role() in ('candidate', 'manager')))
with check (public.current_profile_approved() and (volunteer_profile_id = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "reports read scoped"
on public.volunteer_reports for select
to authenticated
using (public.current_profile_approved() and (volunteer_profile_id = auth.uid() or public.current_app_role() in ('candidate', 'manager')));

create policy "reports insert self"
on public.volunteer_reports for insert
to authenticated
with check (public.current_profile_approved() and volunteer_profile_id = auth.uid());

create policy "approval log read managers"
on public.account_approval_log for select
to authenticated
using (public.current_profile_approved() and public.current_app_role() in ('candidate', 'manager'));

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
