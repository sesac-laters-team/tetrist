desc products;

select * from products;

DELETE from products;

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        1, "profile", "프로필1", "default", 0
    );

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        2, "profileEdge", "프로필테두리1", "default", 0
    );

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        3, "theme", "테마1", "#95a5a6", 0
    );

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        4, "profile", "프로필2", "profileA", 100
    );

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        5, "profileEdge", "프로필테두리2", "profileEdgeA", 100
    );

INSERT INTO
    products (
        product_id, p_type, p_name, p_img, p_price
    )
VALUES (
        6, "theme", "테마2", "#f39c12", 200
    );