/* Users with passwords 'password' */
INSERT INTO `role` VALUES (1, 'STUDENT');
INSERT INTO `role` VALUES (2, 'TEACHER');
INSERT INTO `role` VALUES (3, 'ADMIN');
INSERT INTO `role` VALUES (4, 'PARENT');

INSERT INTO `user` VALUES (1, 'Jonas', 'Jonaitis','$2a$10$n/mj3823gVUA5wszZfxdGu2jXPjn5giAW9CXi9k1rW3eKKEnz2fKW', 'admin');
INSERT INTO `user` VALUES (2, 'Petras', 'Petraitis','$2a$10$n/mj3823gVUA5wszZfxdGu2jXPjn5giAW9CXi9k1rW3eKKEnz2fKW', 'student');
INSERT INTO `user` VALUES (3, 'Antanas', 'Antanaitis','$2a$10$n/mj3823gVUA5wszZfxdGu2jXPjn5giAW9CXi9k1rW3eKKEnz2fKW', 'teacher');
INSERT INTO `user` VALUES (4, 'Juozas', 'Juozaitis','$2a$10$n/mj3823gVUA5wszZfxdGu2jXPjn5giAW9CXi9k1rW3eKKEnz2fKW', 'parent');

INSERT INTO `user_role` VALUES (1, 3);
INSERT INTO `user_role` VALUES (2, 1);
INSERT INTO `user_role` VALUES (3, 2);
INSERT INTO `user_role` VALUES (4, 4);
