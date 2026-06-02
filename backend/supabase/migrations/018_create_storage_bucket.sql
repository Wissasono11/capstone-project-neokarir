insert into storage.buckets (id, name, public)
values ('cv-files', 'cv-files', false)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public;

drop policy if exists cv_files_select_own on storage.objects;
create policy cv_files_select_own
on storage.objects
for select
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_insert_own on storage.objects;
create policy cv_files_insert_own
on storage.objects
for insert
to authenticated
with check (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_update_own on storage.objects;
create policy cv_files_update_own
on storage.objects
for update
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%')
with check (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_delete_own on storage.objects;
create policy cv_files_delete_own
on storage.objects
for delete
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');
