const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MENTOR: 'mentor',
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['read', 'write', 'delete', 'manage_users'],
  [ROLES.USER]: ['read', 'write'],
  [ROLES.MENTOR]: ['read', 'write'],
};

module.exports = {
  ROLES,
  ROLE_PERMISSIONS,
};
