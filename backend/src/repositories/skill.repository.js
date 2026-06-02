const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'skills';

const list = async (accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true);

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

const getById = async (id, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const getByCategory = async (category, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('category', category)
    .eq('is_active', true);

  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data || [];
};

module.exports = {
  list,
  getById,
  getByCategory,
};
