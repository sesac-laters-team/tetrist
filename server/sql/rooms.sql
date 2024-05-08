-- Active: 1707101283311@@127.0.0.1@3306@tetris
-- rooms
desc rooms;

select * from rooms;

DELETE from rooms;

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status, guest_id
    )
VALUES (
        1, 1, "방 1번", null, false, null
    );

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status, guest_id
    )
VALUES (2, 3, "방 2번", null, true, 2);

INSERT INTO
    rooms (
        room_id, user_id, r_name, r_password, r_status, guest_id
    )
VALUES (
        3, 4, "방 3번", "qwerty", false, null
    );