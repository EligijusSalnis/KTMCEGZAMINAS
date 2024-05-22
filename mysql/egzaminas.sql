-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2024 at 07:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `egzaminas`
--

-- --------------------------------------------------------

--
-- Table structure for table `ivertinimais`
--

CREATE TABLE `ivertinimais` (
  `id` int(11) NOT NULL,
  `ivertinimas` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `VartotojaiId` int(11) DEFAULT NULL,
  `RenginiaiId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ivertinimais`
--

INSERT INTO `ivertinimais` (`id`, `ivertinimas`, `createdAt`, `updatedAt`, `VartotojaiId`, `RenginiaiId`) VALUES
(1, 5, '2024-05-22 16:55:50', '2024-05-22 16:55:50', 1, 4),
(3, 5, '2024-05-22 17:13:48', '2024-05-22 17:13:48', 1, 4),
(4, 5, '2024-05-22 17:13:49', '2024-05-22 17:13:49', 1, 5),
(5, 5, '2024-05-22 17:13:50', '2024-05-22 17:13:50', 1, 6),
(6, 3, '2024-05-22 17:37:55', '2024-05-22 17:37:55', 1, 4),
(7, 1, '2024-05-22 17:38:02', '2024-05-22 17:38:02', 1, 6),
(8, 2, '2024-05-22 17:39:37', '2024-05-22 17:39:37', 1, 7),
(9, 5, '2024-05-22 17:39:39', '2024-05-22 17:39:39', 1, 7),
(10, 5, '2024-05-22 17:39:40', '2024-05-22 17:39:40', 1, 7),
(11, 5, '2024-05-22 17:39:41', '2024-05-22 17:39:41', 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `kategorijos`
--

CREATE TABLE `kategorijos` (
  `id` int(11) NOT NULL,
  `pavadinimas` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `renginiais`
--

CREATE TABLE `renginiais` (
  `id` int(11) NOT NULL,
  `pavadinimas` varchar(255) NOT NULL,
  `kategorija` varchar(255) NOT NULL,
  `laikas` datetime NOT NULL,
  `vieta` varchar(255) NOT NULL,
  `nuotrauka` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `VartotojaiId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `renginiais`
--

INSERT INTO `renginiais` (`id`, `pavadinimas`, `kategorija`, `laikas`, `vieta`, `nuotrauka`, `createdAt`, `updatedAt`, `VartotojaiId`) VALUES
(4, 'Komedija ATOSTOGOS SU ŽMONA', 'Premjeros', '2024-05-31 12:49:00', 'Klaipėda', 'https://renginiai.kasvyksta.lt/uploads/events/123779/thumb/d2475827.jpeg', '2024-05-22 15:22:06', '2024-05-22 15:43:42', 1),
(5, 'EKSKURSIJA IŠ KLAIPĖDOS IKI MIRUSIŲ KOPŲ', 'Ekskursija', '2024-05-25 15:23:00', 'Klaipėda', 'https://renginiai.kasvyksta.lt/uploads/events/71393/thumb/ekskursija_i_juodkrants_iki_mirusi_kop_0-25_screenshot.jpg', '2024-05-22 15:23:57', '2024-05-22 15:23:57', 1),
(6, 'Premjera I ” PROFESORIAUS KLASTINGAS TIRPALAS”', 'Premjeros', '2024-05-30 15:56:00', 'Klaipėda', 'https://renginiai.kasvyksta.lt/uploads/events/125790/thumb/klastingas_tirpalas_visi_2024_03_27_3.jpg', '2024-05-22 15:56:16', '2024-05-22 15:56:16', 1),
(7, 'Iniciatyva „Piešimas gyvai“', 'Mokymai', '2024-05-31 17:39:00', 'Klaipėda', 'https://renginiai.kasvyksta.lt/uploads/events/127196/thumb/piesimas_gyvai_fb.jpg', '2024-05-22 17:39:31', '2024-05-22 17:39:31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vartotojais`
--

CREATE TABLE `vartotojais` (
  `id` int(11) NOT NULL,
  `vardas` varchar(255) NOT NULL,
  `elPastas` varchar(255) NOT NULL,
  `slaptažodis` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vartotojais`
--

INSERT INTO `vartotojais` (`id`, `vardas`, `elPastas`, `slaptažodis`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@admin.com', '$2a$08$OjJMdE4xIkZRiQASemhQAumd5OXJbNdwaS96VZ2lCNpenWUKrPYh2', 1, '2024-05-22 15:14:43', '2024-05-22 15:14:43'),
(2, 'Vartotojas', 'vartotojas@vartotojas.com', '$2a$08$BkYuEdNjAKxKP3741NNSQescALJzm/0M.Zj5RYkA1527drSvTFmfK', 0, '2024-05-22 16:00:40', '2024-05-22 16:00:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ivertinimais`
--
ALTER TABLE `ivertinimais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `VartotojaiId` (`VartotojaiId`),
  ADD KEY `RenginiaiId` (`RenginiaiId`);

--
-- Indexes for table `kategorijos`
--
ALTER TABLE `kategorijos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `renginiais`
--
ALTER TABLE `renginiais`
  ADD PRIMARY KEY (`id`),
  ADD KEY `VartotojaiId` (`VartotojaiId`);

--
-- Indexes for table `vartotojais`
--
ALTER TABLE `vartotojais`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ivertinimais`
--
ALTER TABLE `ivertinimais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `kategorijos`
--
ALTER TABLE `kategorijos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `renginiais`
--
ALTER TABLE `renginiais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vartotojais`
--
ALTER TABLE `vartotojais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ivertinimais`
--
ALTER TABLE `ivertinimais`
  ADD CONSTRAINT `ivertinimais_ibfk_1` FOREIGN KEY (`VartotojaiId`) REFERENCES `vartotojais` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ivertinimais_ibfk_2` FOREIGN KEY (`RenginiaiId`) REFERENCES `renginiais` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `renginiais`
--
ALTER TABLE `renginiais`
  ADD CONSTRAINT `renginiais_ibfk_1` FOREIGN KEY (`VartotojaiId`) REFERENCES `vartotojais` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
