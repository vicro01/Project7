-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: project_7
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `commented_post_id` int DEFAULT NULL,
  `comment_text` longtext,
  `comment_date` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `post_id_idx` (`commented_post_id`),
  CONSTRAINT `post_id` FOREIGN KEY (`commented_post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (9,NULL,'undefined',NULL,NULL),(10,NULL,'comment',NULL,NULL),(11,NULL,'comment\n',NULL,NULL),(12,NULL,'comment',NULL,NULL),(13,NULL,'comment',NULL,NULL),(14,NULL,'new comment',NULL,NULL),(15,NULL,'this is newer comment',NULL,NULL),(16,NULL,'comment',NULL,NULL),(17,NULL,'comment',NULL,NULL),(18,NULL,'comment',NULL,NULL),(19,NULL,'comment',NULL,NULL),(20,NULL,'this is a new comment',NULL,12),(21,NULL,'this is a new comment',NULL,12);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `like_post_id` int NOT NULL,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `like_id_UNIQUE` (`like_id`),
  KEY `like_user_id_idx` (`like_post_id`),
  CONSTRAINT `like_user_id` FOREIGN KEY (`like_post_id`) REFERENCES `posts` (`post_author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_author_id` int NOT NULL,
  `post_title` varchar(45) NOT NULL,
  `post_text` mediumtext NOT NULL,
  `post_img` longtext,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `post_author_id_idx` (`post_author_id`),
  CONSTRAINT `post_author_id` FOREIGN KEY (`post_author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(250) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dassss','asdadwd'),(2,'$2b$10$FQxHgI9/1oJssGjCEEBcE.LX2NrwyhzQcXQf3.k/X0w38Aj967buy','essa@saxaw.com'),(3,'$2b$10$XM2nKLYurjFFZiQgk2EBJeKo46vTtb0UsyaZqVI1MmZVdFoMYvLsW','asdad@mail.com'),(4,'$2b$10$.zNtKndjvymn/RHqCdviL.qCTjVMtVEGVpSoILzL2x24xaz2AixGm','dfsfsf@gmail.com'),(5,'$2b$10$UCGpmFXpF8xdGUEwu4ejQeJiqqNrUraK0g9UjED62Putd8QUOUc56','user01@mymail.com'),(6,'$2b$10$hiabuMr/V6n/WUMoQ4FJOeGURt/h8m7eexyk8Eaj3NZ3ZWGfX75cm','user03@user.email.com'),(7,'$2b$10$SJNC7nMTmZcHz85peMlLU.qpC5CVF2kBw9bn5zPNebK00LRq5pcdS','test1234567@email.com'),(8,'$2b$10$WdSzablHm3BwS0QLti2f1ero29K1mTWNCXY2gvijAaSkAlx4.jFuG','test123456789@email.com'),(9,'$2b$10$MU46rrwvTk0nGs3UKvjDuuYLqcM344k4.DuvuxS2dg25sWlBiahle','test1234512345@email.com'),(12,'$2b$10$PoE6uJHs/lQt8flC6NZapuYtmDJqJ/Zq2H4uXIom16qi45S4OudIu','myusername@email.com'),(13,'$2b$10$d1Nnh5UrQLij/ej3/6q7HOtoMF8A5yXSqyVUa.NFPwNSNaUy2qO.6','myUserName1@email.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-29 20:41:03
