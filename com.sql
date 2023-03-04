-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2022 at 09:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `com`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `log_username` varchar(50) NOT NULL,
  `log_date` datetime NOT NULL,
  `log_role` varchar(50) NOT NULL,
  `log_valid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`log_id`, `log_username`, `log_date`, `log_role`, `log_valid`) VALUES
(28, 'pinit', '2022-10-09 18:51:10', 'User', 1),
(29, 'boyson7', '2022-10-09 18:51:35', 'Admin', 1),
(30, 'pinit', '2022-10-09 18:53:32', 'User', 0),
(31, 'pinit', '2022-10-09 18:53:43', 'User', 1),
(32, 'boyson7', '2022-10-10 13:32:24', 'Admin', 1),
(33, 'bvb', '2022-10-10 13:34:52', 'User', 1),
(34, 'boyson7', '2022-10-10 13:35:19', 'Admin', 1),
(35, 'tar', '2022-10-11 00:44:38', 'User', 1),
(36, 'tar', '2022-10-11 00:45:14', 'User', 1),
(37, 'tar', '2022-10-11 00:45:56', 'User', 1),
(38, 'tar', '2022-10-11 00:47:48', 'User', 1),
(39, 'boyson7', '2022-10-11 00:51:47', 'Admin', 1),
(40, 'tar', '2022-10-11 00:53:33', 'User', 1),
(41, 'tar', '2022-10-11 00:54:44', 'User', 1),
(42, 'Armmer888', '2022-10-11 13:20:04', 'User', 1),
(43, 'armmer999', '2022-10-11 13:35:46', 'User', 1),
(44, 'Armmer999', '2022-10-11 13:36:05', 'User', 0),
(45, 'Kaitong', '2022-10-11 13:50:35', 'User', 1),
(46, 'boyson7', '2022-10-11 13:51:13', 'Admin', 1),
(47, 'boyson7', '2022-10-11 13:58:51', 'Admin', 1),
(48, 'Armmer555', '2022-10-11 14:36:06', 'User', 1),
(49, 'Armmer555', '2022-10-11 14:40:43', 'User', 1),
(50, 'Armmer555', '2022-10-11 14:45:20', 'User', 1),
(51, 'boyson7', '2022-10-11 14:46:39', 'Admin', 0),
(52, 'boyson7', '2022-10-11 14:47:05', 'Admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` text NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `Q1` varchar(50) NOT NULL,
  `Q2` varchar(50) NOT NULL,
  `Tmppassword` varchar(50) NOT NULL,
  `date` date DEFAULT NULL,
  `Role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Username`, `Password`, `Mail`, `Q1`, `Q2`, `Tmppassword`, `date`, `Role`) VALUES
(4, 'boyson7', '$2b$10$WhaoggPF/SRbtw/C2Ix4Cu4fga30RKH.vhNlgAEBgQcIEt0MiiRcC', 'pongsatorn.saw@ku.th', 'computer', 'only', '', '2022-10-08', 'Admin'),
(32, 'Nut02', '$2b$10$RxTQt5CB.16YoZeTk2MJb.j6Elo8BE5Qum5FlOsIsdfimYJM7KE.a', 'nut.bun@ku.th', 'no', 'yes', '', '2022-10-08', 'User'),
(51, 'nut3', '$2b$10$N8VSkDSR0NToNOa5SFB7LOVcqyrsMC28Rf0.ac0sJDP/FWmUydlMK', 'nut@ku.th', 'no', 'yes', '', '2022-10-09', 'User'),
(52, 'pinit', '$2b$10$52l6Aeg.IlfXHnkCjgQsj.rybJa9pDRqGWdQHuRXrY//yIxu5AVVy', 'pint@ku.th', 'math', 'anwa', '', '2022-10-10', 'User'),
(53, 'bvb', '$2b$10$vlzdQj0hB27V0D1WWTTnRelTvaM9iPE58mHjbin/Tqw2TuI9D/9cO', 'bvb@ku.th', 'so', 'nu', '', '2022-10-10', 'User'),
(54, 'tar', '$2b$10$Zp1WPUiQFPCoi/1/e9xmrez8vmhSTwhGEobOGupGIqXzlQ7QQMjJm', 'pinit_A@ku.th', 'no', 'no', '', '2022-10-10', 'User'),
(55, 'Armmer888', '$2b$10$zD1wQLTb..1WeliWi.EwbOJRCR2p9ceCWEjiSswfGySgbSAv/K56W', 'Armmer888@abc.com', 'sleep', 'into the unknown', '', '2022-10-11', 'User'),
(56, 'armmer999', '$2b$10$hRdrljh2Fk1UrZWtNQ2eteHzF2atH/tMxHvDGqAzO9aNS/yHKCtU.', 'armmer999@ku.th', 'thai', 'abc', '', '2022-10-11', 'User'),
(57, 'Kaitong', '$2b$10$7Z1vIxcN4bJeE76uzkmKfuMFuYNQc0jJKjRMYMNMJXSujXsDNAt72', 'jom.t@ku.th', 'Nig School', 'Darude-Sandstorm', '', '2022-10-11', 'User'),
(58, 'armmer555', '$2b$10$xjwCDdPy7Bx8tMnmDDkRE.OpOAWxLN0H1HvGLv6zygdSmjUAgAhvK', 'armmer8888@ku.th', 'Thai', 'abc', '', '2022-10-11', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
