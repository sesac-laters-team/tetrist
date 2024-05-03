-- Active: 1714636836094@@sesac-db.c3gm8eikkttp.ap-northeast-2.rds.amazonaws.com@3306@information_schema
CREATE DATABASE tetris CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
SELECT now();


###########[DCL]
-- 유저 생성1
CREATE USER 'sesac'@'%' IDENTIFIED BY '1234';

-- 비밀번호 변경이 필요 시
ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';

-- 유저생성2 : 생성후 권한 부여
CREATE USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';

-- 모든 DB에 접근 가능하도록, sesac 계정에 DB접근 권한을 부여
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

-- 현재 사용중인 MySQL 캐시를 지우고 새로운 설정 적용
FLUSH PRIVILEGES;

