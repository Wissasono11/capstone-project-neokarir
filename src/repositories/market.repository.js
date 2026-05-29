const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'market';

const list = async ({ limit = 10, offset = 0 } = {}) => {
  const supabase = getSupabaseClient();

  const { data, error, count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1);

  if (error) {
    if (error.code === 'PGRST103') {
      return {
        items: [],
        total: 0,
      };
    }
    throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  }

  return {
    items: data || [],
    total: typeof count === 'number' ? count : (data ? data.length : 0),
  };
};

module.exports = {
  list,
};