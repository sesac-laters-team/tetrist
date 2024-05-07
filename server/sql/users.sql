-- Active: 1707101283311@@127.0.0.1@3306@tetris
desc users;

show tables;
select * from users;

INSERT INTO
    users (
        user_id, email, password, nickname,  win, lose, rating, access_penalty
    )
VALUES (
        1, "user1@test.com", "user1234!", "유저1", 1, 3, 100, false
    );

INSERT INTO
    users (
        user_id, email, password, nickname, win, lose, rating, access_penalty
    )
VALUES (
        2, "user2@test.com", "user1234", "유저2", 0, 0, 0, true
    );

INSERT INTO
    users (
        user_id, email, password, nickname, win, lose, rating, access_penalty
    )
VALUES (
        3, "user3@test.com", "user3pw", "유저3", 10, 2, 500, false
    );

INSERT INTO
    users (
        user_id, email, password, nickname, win, lose, rating, access_penalty
    )
VALUES (
        4, "user4@test.com", "user4pw", "유저4", 100, 100, 700, false
    );