CREATE TABLE `url` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`hash` varchar(10),
	`original` text,
	CONSTRAINT `url_hash_unique` UNIQUE(`hash`)
);
