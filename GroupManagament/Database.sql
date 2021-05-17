-- create database
DROP DATABASE IF EXISTS GroupManagement;
CREATE DATABASE GroupManagement;
USE GroupManagement;
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`(
	UserID					TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Email					VARCHAR(50) NOT NULL UNIQUE KEY, 
    Username				VARCHAR(50) NOT NULL UNIQUE KEY,
    `password`				VARCHAR(800) NOT NULL,
    FirstName				NVARCHAR(50) NOT NULL,
    LastName				NVARCHAR(50) NOT NULL,	-- create field fullName in POJO
    `role` 					ENUM('Admin','Employee','Manager') NOT NULL DEFAULT 'Employee'
    
);
-- create table: Department
DROP TABLE IF EXISTS `Group`;
CREATE TABLE `Group`(
	GroupID 				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    TotalMember				TINYINT	UNSIGNED NOT NULL,
    GroupName 				NVARCHAR(30) NOT NULL UNIQUE KEY,
    CreatorID				TINYINT UNSIGNED NOT NULL,
    CreateDate				DATETIME DEFAULT NOW(),
	FOREIGN KEY(CreatorID) REFERENCES `User`(UserID)
);

/*============================== INSERT DATABASE =======================================*/
/*======================================================================================*/

INSERT INTO `User`	(Email								, Username			, FirstName,	LastName,		 GroupID,   `password`, `role`	)
VALUES 				('haidang29productions@gmail.com'	, 'dangblack'		,'Dang'	,		'Nguyen Hai'	,   '5'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Admin'	),
					('account1@gmail.com'				, 'quanganh'		,'Anh'	,		'Tong Quang'	,   '1'		,'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'Employee'	),
                    ('account2@gmail.com'				, 'vanchien'		,'Chien',		'Nguyen Van'	,   '2'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Employee'	),
                    ('account3@gmail.com'				, 'cocoduongqua'	,'Do'	,		'Duong'			,   '3'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('account4@gmail.com'				, 'doccocaubai'		,'Thang',		'Nguyen Chien'  ,   '4'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('dapphatchetngay@gmail.com'		, 'khabanh'			,'Kha'	,		'Ngo Ba'		,   '6'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('songcodaoly@gmail.com'			, 'huanhoahong'		,'Huan'	,		'Bui Xuan'		,   '7'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('sontungmtp@gmail.com'				, 'tungnui'			,'Tung'	,		'Nguyen Thanh'	,   '8'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('duongghuu@gmail.com'				, 'duongghuu'		,'Huu'	,		'Duong Van'		,   '9'		, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Employee'	),
                    ('vtiaccademy@gmail.com'			, 'vtiaccademy'		,'Ai'	,		'Vi Ti'			,   '10'	, '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Employee'	);

-- Add data Department
INSERT INTO `Group`(GroupName, TotalMember, CreatorID) 
VALUES
						(N'Marketing'	, 1, 	10),
						(N'Sale'		, 2, 	9),
						(N'Bảo vệ'		, 3, 	8),
						(N'Nhân sự'		, 4, 	7),
						(N'Kỹ thuật'	, 5, 	6),
						(N'Tài chính'	, 6, 	5),
						(N'Phó giám đốc', 7,	4),
						(N'Giám đốc'	, 8, 	4),
						(N'Thư kí'		, 9, 	3),
						(N'Bán hàng'	, 10,	3);