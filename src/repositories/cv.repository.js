const { getSupabaseClient } = require('../config/database');
const { AppError } = require('../middlewares/error.middleware');
const { ERROR_CODES } = require('../constants/error');

const TABLE = 'cvs';

const CV_FIELDS = new Set([
  'file_name',
  'file_path',
  'mime_type',
  'size',
  'storage_bucket',
  'storage_object_path',
  'file_url',
  'parsed_text',
  'summary',
  'cv_data',
]);

const splitCvPayload = (payload = {}) => {
  const record = {};
  const cvData = {};

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (key === 'cv_data' && value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(cvData, value);
      return;
    }

    if (CV_FIELDS.has(key)) {
      record[key] = value;
      return;
    }

    cvData[key] = value;
  });

  if (Object.keys(cvData).length > 0) {
    record.cv_data = {
      ...(record.cv_data && typeof record.cv_data === 'object' ? record.cv_data : {}),
      ...cvData,
    };
  }

  return record;
};

const getByUserId = async (userId, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  const { data, error } = await supabase.from(TABLE).select('*').eq('user_id', userId).maybeSingle();
  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const upsertByUserId = async (userId, payload, accessToken) => {
  const supabase = getSupabaseClient(accessToken);
  
  // Get existing cv_data to merge
  const { data: existing } = await supabase.from(TABLE).select('cv_data').eq('user_id', userId).maybeSingle();
  
  const newRecord = splitCvPayload(payload);
  
  // Deep merge cv_data
  if (newRecord.cv_data || existing?.cv_data) {
    newRecord.cv_data = {
      ...(existing?.cv_data || {}),
      ...(newRecord.cv_data || {}),
    };
  } else if (!existing) {
    // If it's a new row and no cv_data provided, set it to empty object to satisfy NOT NULL
    newRecord.cv_data = {};
  }
  
  const record = { user_id: userId, ...newRecord };
  
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(record, { onConflict: 'user_id' })
    .select('*')
    .maybeSingle();
    
  if (error) throw new AppError(ERROR_CODES.DATABASE_ERROR, error.message, 500, error);
  return data;
};

const attachFile = async (userId, file, accessToken) => {
  if (!file) {
    throw new AppError(ERROR_CODES.VALIDATION_ERROR, 'File is required', 400);
  }
  return upsertByUserId(userId, file, accessToken);
};

module.exports = {
  getByUserId,
  upsertByUserId,
  attachFile,
};