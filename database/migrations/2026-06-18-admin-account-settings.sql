SET @has_adresse = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'adresse'
);
SET @sql = IF(
  @has_adresse = 0,
  'ALTER TABLE users ADD COLUMN adresse VARCHAR(255) NULL AFTER email',
  'SELECT "users.adresse existe deja"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_statut = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'statut'
);
SET @sql = IF(
  @has_statut = 0,
  'ALTER TABLE users ADD COLUMN statut ENUM(''actif'', ''restreint'') NOT NULL DEFAULT ''actif'' AFTER role',
  'SELECT "users.statut existe deja"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_statut_index = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND INDEX_NAME = 'idx_users_statut'
);
SET @sql = IF(
  @has_statut_index = 0,
  'CREATE INDEX idx_users_statut ON users(statut)',
  'SELECT "idx_users_statut existe deja"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

INSERT INTO users (nom, email, password_hash, role, statut)
SELECT
  'Admin Cut&Go',
  'admin@cutandgo.test',
  '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW',
  'admin',
  'actif'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'admin@cutandgo.test'
);
