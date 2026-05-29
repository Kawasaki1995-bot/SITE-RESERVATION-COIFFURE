USE cut_and_go;

DELETE FROM reservations;
DELETE FROM creneaux;
DELETE FROM horaires_ouverture;
DELETE FROM prestations;
DELETE FROM salons;
DELETE FROM users;

ALTER TABLE reservations AUTO_INCREMENT = 1;
ALTER TABLE creneaux AUTO_INCREMENT = 1;
ALTER TABLE horaires_ouverture AUTO_INCREMENT = 1;
ALTER TABLE prestations AUTO_INCREMENT = 1;
ALTER TABLE salons AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;

INSERT INTO users (nom, email, password_hash, role) VALUES
('Alice Martin', 'alice.client@cutandgo.test', '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW', 'client'),
('Nadia Benali', 'nadia.client@cutandgo.test', '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW', 'client'),
('Salon Elegance', 'contact@salon-elegance.test', '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW', 'salon'),
('Studio Barber', 'contact@studio-barber.test', '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW', 'salon'),
('Maison Boucles', 'contact@maison-boucles.test', '$2b$10$MiqN8Jil85ZiNpTwrIs/bODdVo/5YnCPYh5DwDfjGdG7BYIc0rBIW', 'salon');

INSERT INTO salons (user_id, nom, ville, adresse, description, telephone, image_url, note) VALUES
(3, 'Salon Elegance', 'Bruxelles', '18 Rue Royale, 1000 Bruxelles', 'Salon moderne specialise dans les coupes classiques et les brushings soignes.', '+32 2 100 20 30', 'https://images.unsplash.com/photo-1560066984-138dadb4c035', 4.8),
(4, 'Studio Barber', 'Bruxelles', '42 Avenue Louise, 1050 Bruxelles', 'Barbier urbain pour coupe homme, barbe et entretien rapide.', '+32 2 200 30 40', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033', 4.6),
(5, 'Maison Boucles', 'Namur', '7 Rue de Fer, 5000 Namur', 'Salon chaleureux pour coupes femme, soins et coiffures naturelles.', '+32 81 300 40 50', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e', 4.7);

INSERT INTO prestations (salon_id, nom, prix, active) VALUES
(1, 'Coupe homme', 25.00, TRUE),
(1, 'Coupe femme', 45.00, TRUE),
(1, 'Brushing', 35.00, TRUE),
(2, 'Coupe homme', 22.00, TRUE),
(2, 'Barbe', 18.00, TRUE),
(2, 'Coupe et barbe', 38.00, TRUE),
(3, 'Coupe femme', 42.00, TRUE),
(3, 'Soin cheveux', 30.00, TRUE),
(3, 'Coiffage naturel', 36.00, TRUE);

INSERT INTO horaires_ouverture (salon_id, jour_semaine, heure_ouverture, heure_fermeture, ferme) VALUES
(1, 1, '09:00:00', '18:00:00', FALSE),
(1, 2, '09:00:00', '18:00:00', FALSE),
(1, 3, '09:00:00', '18:00:00', FALSE),
(1, 4, '09:00:00', '19:00:00', FALSE),
(1, 5, '09:00:00', '19:00:00', FALSE),
(1, 6, '10:00:00', '17:00:00', FALSE),
(1, 7, NULL, NULL, TRUE),
(2, 1, '10:00:00', '19:00:00', FALSE),
(2, 2, '10:00:00', '19:00:00', FALSE),
(2, 3, '10:00:00', '19:00:00', FALSE),
(2, 4, '10:00:00', '20:00:00', FALSE),
(2, 5, '10:00:00', '20:00:00', FALSE),
(2, 6, '09:00:00', '17:00:00', FALSE),
(2, 7, NULL, NULL, TRUE),
(3, 1, NULL, NULL, TRUE),
(3, 2, '09:30:00', '18:00:00', FALSE),
(3, 3, '09:30:00', '18:00:00', FALSE),
(3, 4, '09:30:00', '18:00:00', FALSE),
(3, 5, '09:30:00', '18:00:00', FALSE),
(3, 6, '10:00:00', '16:00:00', FALSE),
(3, 7, NULL, NULL, TRUE);

INSERT INTO creneaux (salon_id, date_creneau, heure_debut, disponible) VALUES
(1, '2026-06-02', '09:00:00', TRUE),
(1, '2026-06-02', '09:30:00', FALSE),
(1, '2026-06-02', '10:00:00', TRUE),
(1, '2026-06-02', '10:30:00', TRUE),
(1, '2026-06-03', '14:00:00', TRUE),
(1, '2026-06-03', '14:30:00', TRUE),
(2, '2026-06-02', '10:00:00', TRUE),
(2, '2026-06-02', '10:30:00', TRUE),
(2, '2026-06-02', '11:00:00', FALSE),
(2, '2026-06-04', '15:00:00', TRUE),
(2, '2026-06-04', '15:30:00', TRUE),
(3, '2026-06-03', '09:30:00', TRUE),
(3, '2026-06-03', '10:00:00', TRUE),
(3, '2026-06-05', '13:30:00', TRUE),
(3, '2026-06-05', '14:00:00', FALSE);

INSERT INTO reservations (client_id, salon_id, prestation_id, creneau_id, statut, created_at, cancelled_at) VALUES
(1, 1, 1, 2, 'confirmee', '2026-05-28 10:00:00', NULL),
(2, 2, 5, 9, 'confirmee', '2026-05-28 11:00:00', NULL),
(1, 3, 8, 15, 'annulee', '2026-05-27 09:30:00', '2026-05-28 09:00:00');
