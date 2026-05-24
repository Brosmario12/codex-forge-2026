create table if not exists public.forge_requests (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  audience text not null,
  goal text not null,
  strategy text,
  created_at timestamptz not null default now()
);

alter table public.forge_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.forge_requests to anon;
grant select on table public.forge_requests to authenticated;

drop policy if exists "Anyone can create forge requests" on public.forge_requests;
create policy "Anyone can create forge requests"
  on public.forge_requests
  for insert
  to anon
  with check (true);

drop policy if exists "Authenticated users can read forge requests" on public.forge_requests;
create policy "Authenticated users can read forge requests"
  on public.forge_requests
  for select
  to authenticated
  using (true);
