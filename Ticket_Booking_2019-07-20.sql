# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: Ticket_Booking
# Generation Time: 2019-07-20 08:58:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(255) DEFAULT NULL,
  `adminEmail` varchar(255) DEFAULT NULL,
  `authToken` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `userType` enum('ADMIN') DEFAULT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;

INSERT INTO `admin_users` (`id`, `adminName`, `adminEmail`, `authToken`, `salt`, `password`, `status`, `userType`, `createdTime`, `updatedTime`)
VALUES
	(1,'Admin','ticketAdmin@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYzNDU0NTIyLCJleHAiOjE1OTQ5OTA1MjJ9.m41RQPqsqeZU1fWENRUS-lynmBzOCEFtktfeMq2Vv7A','$2a$10$yAIDUWaG/4jOYjbA5kHNze','$2a$10$sjZQHhFnF0vWmuHPSnQ4iuY2.S4JWPSLe891dA2Vy3/vOmCi571uO',1,'ADMIN','2019-07-18 12:55:21','2019-07-18 18:25:22');

/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `duration` time NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT '',
  `times` longtext NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`, `duration`, `type`, `times`, `status`, `createdTime`, `updatedTime`)
VALUES
	(3,'Batla House','02:40:00','MOVIE','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:21:30','2019-07-19 22:43:53'),
	(4,'A. R. Rahman Concert','02:00:00','EVENT','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:21:56','2019-07-19 22:44:02'),
	(5,'Comedy Knights','03:00:00','EVENT','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:22:24','2019-07-19 22:44:06'),
	(6,'Super 30','02:25:00','MOVIE','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:22:48','2019-07-19 22:44:09'),
	(7,'Saaho','02:40:00','MOVIE','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:23:18','2019-07-19 22:44:13'),
	(8,'Avengers','03:00:00','MOVIE','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:26:02','2019-07-19 22:44:17'),
	(9,'Kabir Singh','03:05:00','MOVIE','9:00 AM,01:00 PM,5:00 PM,9:00 PM',1,'2019-07-19 20:26:31','2019-07-19 22:44:21');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `theatreId` int(11) NOT NULL,
  `bookingId` varchar(255) NOT NULL,
  `showTime` varchar(255) NOT NULL DEFAULT '',
  `showType` varchar(255) NOT NULL DEFAULT '',
  `numOfSeats` int(11) NOT NULL,
  `totalCost` int(11) NOT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`id`, `userId`, `categoryId`, `theatreId`, `bookingId`, `showTime`, `showType`, `numOfSeats`, `totalCost`, `createdTime`, `updatedTime`)
VALUES
	(1,1,3,5,'H3dtYUbrRy','9:00 AM','',5,750,'2019-07-20 08:39:32','2019-07-20 14:09:32');

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table theatre
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theatre`;

CREATE TABLE `theatre` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `seat` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `createdTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `theatre` WRITE;
/*!40000 ALTER TABLE `theatre` DISABLE KEYS */;

INSERT INTO `theatre` (`id`, `name`, `seat`, `cost`, `status`, `createdTime`, `updatedTime`)
VALUES
	(4,'Inorbit Mall',100,200,1,'2019-07-19 20:10:59','2019-07-19 20:10:59'),
	(5,'Preston Prime',150,150,1,'2019-07-19 20:11:47','2019-07-19 20:11:47'),
	(6,'Forum Mall',200,350,1,'2019-07-19 20:12:37','2019-07-19 20:12:37'),
	(7,'Stadium',500,1500,1,'2019-07-19 20:13:05','2019-07-19 20:13:05'),
	(8,'INOX GVK One',120,300,1,'2019-07-19 20:16:58','2019-07-19 20:16:58'),
	(9,'INOX Panjagutta',90,450,1,'2019-07-19 20:17:29','2019-07-19 20:17:29'),
	(10,'INOX Malleshwaram',110,300,1,'2019-07-19 20:18:10','2019-07-19 20:18:10'),
	(11,'INOX GSM Mall',70,400,1,'2019-07-19 20:18:59','2019-07-19 20:18:59'),
	(12,'IIIT Hyderabad',800,999,1,'2019-07-19 20:20:15','2019-07-19 20:20:15'),
	(13,'ISB Hyderabad',1200,2000,1,'2019-07-19 20:21:05','2019-07-19 20:21:05');

/*!40000 ALTER TABLE `theatre` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table theatre_category_mapping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theatre_category_mapping`;

CREATE TABLE `theatre_category_mapping` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `theatreId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `theatre_category_mapping` WRITE;
/*!40000 ALTER TABLE `theatre_category_mapping` DISABLE KEYS */;

INSERT INTO `theatre_category_mapping` (`id`, `theatreId`, `categoryId`)
VALUES
	(3,5,3),
	(4,13,4),
	(5,7,5),
	(6,4,6),
	(7,6,7),
	(8,8,8),
	(9,11,9);

/*!40000 ALTER TABLE `theatre_category_mapping` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table theatre_seat_time_mapping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theatre_seat_time_mapping`;

CREATE TABLE `theatre_seat_time_mapping` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `theatreId` int(11) NOT NULL,
  `time` varchar(255) NOT NULL,
  `totalSeats` int(11) NOT NULL,
  `seatsBooked` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `theatre_seat_time_mapping` WRITE;
/*!40000 ALTER TABLE `theatre_seat_time_mapping` DISABLE KEYS */;

INSERT INTO `theatre_seat_time_mapping` (`id`, `theatreId`, `time`, `totalSeats`, `seatsBooked`)
VALUES
	(5,4,'9:00 AM',100,0),
	(6,4,'01:00 PM',100,0),
	(7,4,'5:00 PM',100,0),
	(8,4,'9:00 PM',100,0),
	(9,5,'9:00 AM',150,5),
	(10,5,'01:00 PM',150,0),
	(11,5,'5:00 PM',150,0),
	(12,5,'9:00 PM',150,0),
	(13,6,'9:00 AM',200,0),
	(14,6,'01:00 PM',200,0),
	(15,6,'5:00 PM',200,0),
	(16,6,'9:00 PM',200,0),
	(17,7,'9:00 AM',500,0),
	(18,7,'01:00 PM',500,0),
	(19,7,'5:00 PM',500,0),
	(20,7,'9:00 PM',500,0),
	(21,8,'9:00 AM',120,0),
	(22,8,'01:00 PM',120,0),
	(23,8,'5:00 PM',120,0),
	(24,8,'9:00 PM',120,0),
	(25,9,'9:00 AM',90,0),
	(26,9,'01:00 PM',90,0),
	(27,9,'5:00 PM',90,0),
	(28,9,'9:00 PM',90,0),
	(29,10,'9:00 AM',110,0),
	(30,10,'01:00 PM',110,0),
	(31,10,'5:00 PM',110,0),
	(32,10,'9:00 PM',110,0),
	(33,11,'9:00 AM',70,0),
	(34,11,'01:00 PM',70,0),
	(35,11,'5:00 PM',70,0),
	(36,11,'9:00 PM',70,0),
	(37,12,'9:00 AM',800,0),
	(38,12,'01:00 PM',800,0),
	(39,12,'5:00 PM',800,0),
	(40,12,'9:00 PM',800,0),
	(41,13,'9:00 AM',1200,0),
	(42,13,'01:00 PM',1200,0),
	(43,13,'5:00 PM',1200,0),
	(44,13,'9:00 PM',1200,0);

/*!40000 ALTER TABLE `theatre_seat_time_mapping` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `authToken` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress_UNIQUE` (`userEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `userName`, `userEmail`, `mobile`, `authToken`, `password`, `salt`, `createdTime`, `updatedTime`)
VALUES
	(1,'Arpit','arpit@blueberrylabs.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYzNDU0NTIyLCJleHAiOjE1OTQ5OTA1MjJ9.m41RQPqsqeZU1fWENRUS-lynmBzOCEFtktfeMq2Vv7A','$2a$10$sjZQHhFnF0vWmuHPSnQ4iuY2.S4JWPSLe891dA2Vy3/vOmCi571uO','$2a$10$yAIDUWaG/4jOYjbA5kHNze','2019-07-18 12:55:21','2019-07-18 18:25:22'),
	(2,'Arpit','arpit@sdfs.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYzNDU1MjA5LCJleHAiOjE1OTQ5OTEyMDl9.S5uH_ze7t-2EDIjUnssE2xwYRPfDiAhgGmzdocqLB5E','$2a$10$mUt7v62hV.CUMMZFJEr43uKMOfr6JHXlIOZelKYrPqXhmPUqQxdv2','$2a$10$aVwgBwQpBcEeXdo3eRNsuO','2019-07-18 13:06:49','2019-07-18 18:36:49'),
	(3,'sad','asdf@wef.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYzNDU1Mjc2LCJleHAiOjE1OTQ5OTEyNzZ9.F8ijqjntysn4hYNOYI9efYsRQMNnP-d-oC6HuH6Vpv8','$2a$10$NfBbeyxXi21/KksewN2mXu/IN7p6MvVybkswRmAv.N/frtSC9Amn2','$2a$10$bXpmD81lqiU3oO0KaPQPVu','2019-07-18 13:07:56','2019-07-18 18:37:56'),
	(4,'Arpit','sdf@sdf.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTYzNDYyNTM4LCJleHAiOjE1OTQ5OTg1Mzh9.yP2jqXFNbNWFwPwcg7-CYzdWWkJifiGiT9LIoGtcKYU','$2a$10$ZFpwF7OasbaO6RKXogPfO.oK4JO1.W265ALu8XtTj0/6rPbpM/cE6','$2a$10$sTilyh/LZyedhnxpZ5unSu','2019-07-18 15:08:58','2019-07-18 20:38:58'),
	(5,'Arpit','arpit@sfdgh.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTYzNDYyNTg4LCJleHAiOjE1OTQ5OTg1ODh9.PPMF8rIdqnDNpalJP8cfy-0IYNLNFvxCPPlUEAVzLJs','$2a$10$mLFbXdQYAiTyfT7ZZ59wYe4UbPNQx4bzkHjzYi5GM.YANRFdXZ9Lq','$2a$10$QXQox6.weIEGEfRH9hBY2.','2019-07-18 15:09:48','2019-07-18 20:39:48'),
	(6,'asdf','sdfgh@sd.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTYzNDYyOTIzLCJleHAiOjE1OTQ5OTg5MjN9.UWH5sMCk_JscGt3AcfjNT72hJ6iRh08myGLYs8J99mw','$2a$10$W82u5SRsI3rnVfcGNMYOZe.lfD35jLCn76ZHCzqo1iUw3E1PEPCt.','$2a$10$Acy57YBfkD/kv/ABiD9i8.','2019-07-18 15:15:23','2019-07-18 20:45:23'),
	(7,'asdf','sdfgh@sdf.cpm',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTYzNDYzNDM4LCJleHAiOjE1OTQ5OTk0Mzh9.s8ShWbD48zoT9bMI26xxGcqCV1yrnQ3kkMNhtPWyl64','$2a$10$gXG1ij2hZia4tLHgiDR/hOp2qps2zEQ8t3xJiOnEf/Tr84bcGR59C','$2a$10$RsHzVvAQxqFKFShQqkwaBu','2019-07-18 15:23:58','2019-07-18 20:53:58'),
	(8,'sadf','erthgfd@sdf.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTYzNDYzNTY4LCJleHAiOjE1OTQ5OTk1Njh9.oO5MvOjpTA5Q5yPfu7TGzVdgh3Tlz06yZ1_uZ1_Q4q0','$2a$10$nbh5kTiSnwPDR2kbgfyqautFEIr/BVcB5.PfAdGrzya4ep8rwPB7m','$2a$10$Z3sY07gUg.vC681UK1Rt3e','2019-07-18 15:26:07','2019-07-18 20:56:08'),
	(9,'sadf','asdf!@sd.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTYzNDYzNjI5LCJleHAiOjE1OTQ5OTk2Mjl9.kcCA7ST1TOMoi-vARLgbMNfeeHgpGhcUh38P5-FgK8k','$2a$10$.KdTTcpoIFKzR1d/Gk98KO0jr4.FlmzTtd1U.Qh3n7CaUtdsN1ngK','$2a$10$ZHAy8TtzI.uQT6mRt6B3E.','2019-07-18 15:27:09','2019-07-18 20:57:09'),
	(10,'asdv','asdfefwd@sd.com',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTU2MzQ2MzcyMSwiZXhwIjoxNTk0OTk5NzIxfQ.EDk_lPodiF4kP3jBVTWudE-qNddgEw-eSpho7MPPUK8','$2a$10$5sUSy0B2a5asIBZU54hCbOTO3ZROA4iTACm3PMMWW2b0/.AmG4/0q','$2a$10$h5HgA761imeFoRYvmrTDte','2019-07-18 15:28:41','2019-07-18 20:58:41');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
