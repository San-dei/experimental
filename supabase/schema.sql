-- Ejecutar en el SQL Editor de un proyecto nuevo de Supabase.
-- La página envía solicitudes a su API de Next.js; el navegador nunca usa la clave Secret.
begin;

create table if not exists public.solicitudes (
  id uuid primary key,
  nombre text not null check (char_length(nombre) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  telefono text not null check (char_length(telefono) between 7 and 40),
  servicio text not null check (servicio in ('pentesting', 'vulnerabilidades')),
  descripcion text not null check (char_length(descripcion) between 20 and 4000),
  estado text not null default 'nueva',
  creada_el timestamptz not null default now()
);

create index if not exists solicitudes_fecha_idx on public.solicitudes (creada_el desc);
alter table public.solicitudes enable row level security;

-- Los visitantes no tienen acceso directo a los registros.
revoke all on public.solicitudes from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert on public.solicitudes to service_role;

commit;
