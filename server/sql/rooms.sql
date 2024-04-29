-- Active: 1707101283581@@127.0.0.1@3306@sesac
-- rooms

-- rooms
desc rooms;

select * from rooms;

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status
    )
VALUES (1, 1, "방 1번", null, false);

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status
    )
VALUES (2, 3, "방 2번", null, true);

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status
    )
VALUES (3, 4, "방 3번", "qwerty", false);