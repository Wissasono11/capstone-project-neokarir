-- Migration: Update skill_gap table to support AI-2 response details and general analyses
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS owned_skills jsonb;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS target_role text;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS target_domain text;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS analysis_result jsonb;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS matched_skills jsonb;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS missing_skills jsonb;
ALTER TABLE public.skill_gap ADD COLUMN IF NOT EXISTS match_score numeric;

-- Unique index to prevent multiple general analyses (where job_id is null) for the same user
CREATE UNIQUE INDEX IF NOT EXISTS skill_gap_user_id_null_job_idx ON public.skill_gap (user_id) WHERE job_id IS NULL;
