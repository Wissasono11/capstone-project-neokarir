const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'job_match';

const getByUserIdAndJobId = async (userId, jobId, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .eq('job_id', jobId)
    .maybeSingle();

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const upsert = async (userId, jobId, record, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  
  // Find existing
  const { data: existing, error: findError } = await supabase
    .from(TABLE)
    .select('id')
    .eq('user_id', userId)
    .eq('job_id', jobId)
    .maybeSingle();
    
  if (findError) throw new AppError(ERROR_CODES.DATABASE_ERROR, findError.message, 500, findError);
  
  let result;
  if (existing) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ ...record, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select('*')
      .maybeSingle();
    if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
    result = data;
  } else {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ ...record, user_id: userId, job_id: jobId })
      .select('*')
      .maybeSingle();
    if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
    result = data;
  }
  
  return result;
};

module.exports = {
  getByUserIdAndJobId,
  upsert,
};
