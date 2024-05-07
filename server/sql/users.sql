-- Active: 1707101283581@@127.0.0.1@3306@tetris
desc users;

show tables;

DELETE from users;

select * from users;

INSERT INTO
    users (
        email, password, nickname, win, lose, rating, access_penalty
    )
VALUES (
        "user1@test.com", "user1234!", "유저1", 1, 3, 100, false
    );

INSERT INTO
    users (
        email, password, nickname, win, lose, rating, access_penalty
    )
VALUES (
        "user2@test.com", "user1234!", "유저2", 5, 5, 100, true
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

-- UPDATE [테이블] SET [열] = '변경할값' WHERE [조건]
UPDATE users SET win = "50" where nickname = "qwer";

UPDATE users SET lose = "50" where nickname = "qwer";