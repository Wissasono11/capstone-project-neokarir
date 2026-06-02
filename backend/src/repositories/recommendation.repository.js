const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'recommendations';

const listByUserId = async (userId, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

const deleteByUserId = async (userId, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq('user_id', userId);

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const bulkCreate = async (records, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .insert(records)
    .select('*');

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

module.exports = {
  listByUserId,
  deleteByUserId,
  bulkCreate,
};