CREATE DATABASE IF NOT EXISTS cut_and_go
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cut_and_go;

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS creneaux;
DROP TABLE IF EXISTS horaires_ouverture;
DROP TABLE IF EXISTS prestations;
DROP TABLE IF EXISTS salons;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  adresse VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('client', 'salon', 'admin') NOT NULL DEFAULT 'client',
  statut ENUM('actif', 'restreint') NOT NULL DEFAULT 'actif',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE salons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  nom VARCHAR(120) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  description TEXT,
  telephone VARCHAR(30),
  image_url VARCHAR(500),
  note DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_salons_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE prestations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  salon_id INT NOT NULL,
  nom VARCHAR(120) NOT NULL,
  prix DECIMAL(8,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_prestations_salon
    FOREIGN KEY (salon_id) REFERENCES salons(id)
    ON DELETE CASCADE,
  CONSTRAINT chk_prestations_prix
    CHECK (prix >= 0)
);

CREATE TABLE horaires_ouverture (
  id INT AUTO_INCREMENT PRIMARY KEY,
  salon_id INT NOT NULL,
  jour_semaine TINYINT NOT NULL,
  heure_ouverture TIME,
  heure_fermeture TIME,
  ferme BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_horaires_salon
    FOREIGN KEY (salon_id) REFERENCES salons(id)
    ON DELETE CASCADE,
  CONSTRAINT uq_horaires_salon_jour
    UNIQUE (salon_id, jour_semaine),
  CONSTRAINT chk_horaires_jour
    CHECK (jour_semaine BETWEEN 1 AND 7),
  CONSTRAINT chk_horaires_heures
    CHECK (
      ferme = TRUE
      OR (
        heure_ouverture IS NOT NULL
        AND heure_fermeture IS NOT NULL
        AND heure_ouverture < heure_fermeture
      )
    )
);

CREATE TABLE creneaux (
  id INT AUTO_INCREMENT PRIMARY KEY,
  salon_id INT NOT NULL,
  date_creneau DATE NOT NULL,
  heure_debut TIME NOT NULL,
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_creneaux_salon
    FOREIGN KEY (salon_id) REFERENCES salons(id)
    ON DELETE CASCADE,
  CONSTRAINT uq_creneaux_salon_datetime
    UNIQUE (salon_id, date_creneau, heure_debut)
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  salon_id INT NOT NULL,
  prestation_id INT NOT NULL,
  creneau_id INT NOT NULL,
  statut ENUM('confirmee', 'annulee') NOT NULL DEFAULT 'confirmee',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  cancelled_at DATETIME NULL,
  CONSTRAINT fk_reservations_client
    FOREIGN KEY (client_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reservations_salon
    FOREIGN KEY (salon_id) REFERENCES salons(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reservations_prestation
    FOREIGN KEY (prestation_id) REFERENCES prestations(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_reservations_creneau
    FOREIGN KEY (creneau_id) REFERENCES creneaux(id)
    ON DELETE RESTRICT
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_statut ON users(statut);
CREATE INDEX idx_salons_ville ON salons(ville);
CREATE INDEX idx_prestations_nom ON prestations(nom);
CREATE INDEX idx_creneaux_salon_date ON creneaux(salon_id, date_creneau);
CREATE INDEX idx_reservations_client ON reservations(client_id);
CREATE INDEX idx_reservations_salon ON reservations(salon_id);
CREATE INDEX idx_reservations_creneau ON reservations(creneau_id);
