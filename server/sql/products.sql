-- Active: 1707101713117@@127.0.0.1@3306@tetris
desc products;

select * from products;

DELETE from products;

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        1,
        "profile",
        "펭귄",
        "/images/profile/penguin.png",
        0
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        2,
        "profileEdge",
        "프로필테두리1",
        "/images/profile_edge/frame_leaves.png",
        0
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        3,
        "theme",
        "#cde8e7",
        "/images/theme/cde8e7.png",
        0
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        4,
        "profile",
        "닭",
        "/images/profile/chicken.png",
        100
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        5,
        "profileEdge",
        "프로필테두리2",
        "/images/profile_edge/frame_triangle.png",
        100
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        6,
        "theme",
        "#eef7ff",
        "/images/theme/eef7ff.png",
        200
    );

INSERT INTO
    products (
        product_id,
        p_type,
        p_name,
        p_img,
        p_price
    )
VALUES (
        7,
        "profile",
        "개",
        "/images/profile/dog.png",
        100
    );