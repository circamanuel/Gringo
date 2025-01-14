-- Benutzer erstellen
INSERT INTO user (username, password, role) VALUES
                                                ('admin', '$2a$10$zRc6g7fEOCyFZHg2j0n2bJFLzKpVuQkhfKkCQNp6Htmov2u.QS0lC', 'ROLE_ADMIN'),
                                                ('user', '$2a$10$D8xUgfK6m8b6ex9U9fvmftppNvnCqPpwOlvXzzG.PnxVz8Z7yUJw2', 'ROLE_USER');

-- Foren erstellen
INSERT INTO forum (name, description) VALUES
                                          ('Programming', 'Diskussionen über Programmierung und Softwareentwicklung'),
                                          ('Gaming', 'Austausch über Spiele, Konsolen und mehr');

-- Beispiel-Post erstellen
INSERT INTO post (content, forum_id, user_id) VALUES
                                                  ('Erster Beitrag im Forum', 1, 1),
                                                  ('Was haltet ihr von den neuesten Spielen?', 2, 2);
