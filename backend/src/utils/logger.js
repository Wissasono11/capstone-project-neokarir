const env = require('../config/env');

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const getCurrentLevel = () => LOG_LEVELS[env.LOG_LEVEL] || LOG_LEVELS.info;

const logger = {
  debug: (message, data) => {
    if (getCurrentLevel() <= LOG_LEVELS.debug) {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  
  info: (message, data) => {
    if (getCurrentLevel() <= LOG_LEVELS.info) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  
  warn: (message, data) => {
    if (getCurrentLevel() <= LOG_LEVELS.warn) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  
  error: (message, data) => {
    if (getCurrentLevel() <= LOG_LEVELS.error) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
};

module.exports = logger;
