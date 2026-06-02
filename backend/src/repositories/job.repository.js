const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'jobs';

const list = async (options = {}, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  let query = supabase
    .from(TABLE)
    .select('*, job_skills(importance, is_required, skill:skills(name))');

  if (options.is_active !== undefined) {
    query = query.eq('is_active', options.is_active);
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

const getById = async (id, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, job_skills(importance, is_required, skill:skills(name))')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const search = async (q, accessToken) => {
  if (!q) return list({}, accessToken);
  
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, job_skills(importance, is_required, skill:skills(name))')
    .or(`title.ilike.%${q}%,company_name.ilike.%${q}%,description.ilike.%${q}%`);

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

module.exports = {
  list,
  getById,
  search,
};
