-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: leave_management
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `demo`
--

DROP TABLE IF EXISTS `demo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demo`
--

LOCK TABLES `demo` WRITE;
/*!40000 ALTER TABLE `demo` DISABLE KEYS */;
INSERT INTO `demo` VALUES (4,'Bala Muthu Manikandan','bmb4600@gmail.com','09443844825','Bala@123'),(6,'Bala Muthu Manikandan','bmb4600@gmail.com','09443844825','Bala@123'),(7,'Bala Muthu Manikandan','bmb4600@gmail.com','09443844825','Bala@123'),(8,'Bala Muthu Manikandan','bmb4600@gmail.com','09443844825','Bala@2703'),(9,'Bala Muthu Manikandan','bmb4600@gmail.com','9443844825','Bala123'),(10,'ParamuMala','bmb4600@gmail.com','09443844825','$2b$10$SaRDyHgg6uUgyeDBkegkCOUBFdnMrrh/ClKm/tn37eXbmtSU9hXRO'),(11,'Bala Mala','bmb4600@gmail.com','9443844825','$2b$10$u2KL.1jfI5mbE8TOTNPwn.CYNH0Mfj8q47tsLWnJ6l9Bdnih9dhw6'),(12,'Paramu','paramu2717@gmail.com','09443844825','$2b$10$XlIAGLgsyAVlKVJd6DLXruJ1E9lqiXKbdBSNSh9b0xexkH2Qf8vJO'),(13,'Mala','mala@gmail.com','09443844825','$2b$10$7hG0mpJfmKoKNZZUhekV/OtWwLkaaQcrMMHlsQaCjyEBaOJV1Gvp6');
/*!40000 ALTER TABLE `demo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_applications`
--

DROP TABLE IF EXISTS `leave_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leaveType` varchar(50) NOT NULL,
  `leaveCategory` varchar(50) NOT NULL,
  `leaveDate` varchar(15) DEFAULT NULL,
  `endDate` varchar(15) DEFAULT NULL,
  `reason` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `employeeId` varchar(255) DEFAULT NULL,
  `employeeName` varchar(255) DEFAULT NULL,
  `approvedDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_applications`
--

LOCK TABLES `leave_applications` WRITE;
/*!40000 ALTER TABLE `leave_applications` DISABLE KEYS */;
INSERT INTO `leave_applications` VALUES (15,'More than one day','Scheduled','10-06-2025','13-06-2025','Going to Native','2025-06-06 08:00:10','Approved','848322','Employee','2025-06-06'),(16,'','','NaN-NaN-NaN',NULL,'','2025-06-06 08:12:03','Pending','126312','Bala Muthu',NULL);
/*!40000 ALTER TABLE `leave_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `email_id` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `employeeId` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `joiningDate` date DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (21,'Admin','admin@gmail.com','$2b$10$BlkoVxNo6H18aVjxBaLZZO6jah1S21r6qZZS3E5sjhOUL74FxX4HS','126324','Admin','2024-03-04','{\"admin\": true, \"employee\": false}'),(22,'Employee','employee@gmail.com','$2b$10$dXZdqNlW4QUNzriX.B/vJe890UNqn9pZ0F2IYvW/gcbej6pbwUXdK','848322','Software Development','2025-06-05','{\"admin\": false, \"employee\": true}'),(23,'Bala Muthu','bmb4600@gmail.com','$2b$10$Pz.kb/llm7NENnDhpJP4H.FJWZtF/mJh0xuDKROScWZNX9btidXb.','126312','Software Development','2025-06-12','{\"admin\": false, \"employee\": true}');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'leave_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06 13:47:13
