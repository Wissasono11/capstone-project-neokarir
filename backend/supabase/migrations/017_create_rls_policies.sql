alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.user_skills enable row level security;
alter table public.jobs enable row level security;
alter table public.job_skills enable row level security;
alter table public.recommendations enable row level security;
alter table public.skill_gap enable row level security;
alter table public.cvs enable row level security;
alter table public.cv_analysis enable row level security;
alter table public.job_match enable row level security;
alter table public.chats enable row level security;
alter table public.learning_roadmaps enable row level security;
alter table public.market enable row level security;
alter table public.embeddings enable row level security;

drop policy if exists users_select_own on public.users;
create policy users_select_own
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists users_update_own on public.users;
create policy users_update_own
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own
on public.profiles
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists skills_select_public on public.skills;
create policy skills_select_public
on public.skills
for select
to anon, authenticated
using (true);

drop policy if exists user_skills_select_own on public.user_skills;
create policy user_skills_select_own
on public.user_skills
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists user_skills_write_own on public.user_skills;
create policy user_skills_write_own
on public.user_skills
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists jobs_select_public on public.jobs;
create policy jobs_select_public
on public.jobs
for select
to anon, authenticated
using (true);

drop policy if exists job_skills_select_public on public.job_skills;
create policy job_skills_select_public
on public.job_skills
for select
to anon, authenticated
using (true);

drop policy if exists recommendations_select_own on public.recommendations;
create policy recommendations_select_own
on public.recommendations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists recommendations_write_own on public.recommendations;
create policy recommendations_write_own
on public.recommendations
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists skill_gap_select_own on public.skill_gap;
create policy skill_gap_select_own
on public.skill_gap
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists skill_gap_write_own on public.skill_gap;
create policy skill_gap_write_own
on public.skill_gap
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists cvs_select_own on public.cvs;
create policy cvs_select_own
on public.cvs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists cvs_write_own on public.cvs;
create policy cvs_write_own
on public.cvs
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists cv_analysis_select_own on public.cv_analysis;
create policy cv_analysis_select_own
on public.cv_analysis
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists cv_analysis_write_own on public.cv_analysis;
create policy cv_analysis_write_own
on public.cv_analysis
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists job_match_select_own on public.job_match;
create policy job_match_select_own
on public.job_match
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists job_match_write_own on public.job_match;
create policy job_match_write_own
on public.job_match
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists chats_select_own on public.chats;
create policy chats_select_own
on public.chats
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists chats_write_own on public.chats;
create policy chats_write_own
on public.chats
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists learning_roadmaps_select_own on public.learning_roadmaps;
create policy learning_roadmaps_select_own
on public.learning_roadmaps
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists learning_roadmaps_write_own on public.learning_roadmaps;
create policy learning_roadmaps_write_own
on public.learning_roadmaps
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists market_select_public on public.market;
create policy market_select_public
on public.market
for select
to anon, authenticated
using (true);
