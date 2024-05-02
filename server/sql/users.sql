-- Active: 1707101283311@@127.0.0.1@3306@tetrist
desc users;
select * from users;
INSERT INTO users (user_id, email, password, nickname, point, custom, connecting, chat_penalty, access_penalty)
 VALUES (1, "user1@test.com", "user1pw", "유저1", 1000, '{"profile":1, "profileEdge":2, "theme":3}', true, true, false);
INSERT INTO users (user_id, email, password, nickname, point, custom, connecting, chat_penalty, access_penalty)
 VALUES (2, "user2@test.com", "user2pw", "유저2", 2000, '{"profile":1, "profileEdge":2, "theme":3}', false, false, true);
INSERT INTO users (user_id, email, password, nickname, point, custom, connecting, chat_penalty, access_penalty)
 VALUES (3, "user3@test.com", "user3pw", "유저3", 3000, '{"profile":1, "profileEdge":2, "theme":3}', true, false, false);
INSERT INTO users (user_id, email, password, nickname, point, custom, connecting, chat_penalty, access_penalty)
 VALUES (4, "user4@test.com", "user4pw", "유저4", 4000, '{"profile":1, "profileEdge":2, "theme":3}', false, false, false);