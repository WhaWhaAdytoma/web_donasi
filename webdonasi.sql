-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2018 at 09:00 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdonasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `name_admin` varchar(225) NOT NULL,
  `pass_admin` varchar(100) NOT NULL,
  `email_admin` varchar(225) NOT NULL,
  `no_hp_admin` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `name_admin`, `pass_admin`, `email_admin`, `no_hp_admin`) VALUES
(1, 'admin1', 'admin1', 'admin1@gmail.com', '0898989123'),
(3, 'admin2', 'admin2', 'admin2@gmail.comm', '08912311233'),
(4, 'admin1', 'ad', 'ady@gmail.comm', '11111');

-- --------------------------------------------------------

--
-- Table structure for table `campaign`
--

CREATE TABLE `campaign` (
  `id_cpg` int(11) NOT NULL,
  `judul_cpg` varchar(225) NOT NULL,
  `desc_cpg` text NOT NULL,
  `foto_cpg` varchar(200) NOT NULL,
  `start_cpg` char(20) NOT NULL,
  `deadline_cpg` char(10) NOT NULL,
  `target_cpg` bigint(20) NOT NULL,
  `income_cpg` bigint(20) NOT NULL,
  `alamat` text NOT NULL,
  `kontak_dkm` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campaign`
--

INSERT INTO `campaign` (`id_cpg`, `judul_cpg`, `desc_cpg`, `foto_cpg`, `start_cpg`, `deadline_cpg`, `target_cpg`, `income_cpg`, `alamat`, `kontak_dkm`) VALUES
(1, 'judul', 'deskripsi', 'foto', 'mulai tgl', 'deadline', 1111, 111, 'alamat', 'kontak'),
(3, 'judul2', 'deskripsi', 'images.jpg', '2018-01-01', '100', 10000000, 0, 'bandung', '087316456313'),
(4, '1', '1', 'pk.png', '2018-01-04', '100', 10000000, 0, 'bekasi', '1');

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id_guest` int(11) NOT NULL,
  `name_guest` varchar(100) NOT NULL,
  `pass_guest` varchar(200) NOT NULL,
  `email_guest` varchar(100) NOT NULL,
  `no_hp_guest` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id_guest`, `name_guest`, `pass_guest`, `email_guest`, `no_hp_guest`) VALUES
(2, 'a', 'a', 'ady@gmail.comm', '1'),
(6, 'a', 'a', 'a@a.com', 'a'),
(7, 'b', 'c', 'a@a.com', '12'),
(15, 'cd', 'cd', 'a@a.com', '11111');

-- --------------------------------------------------------

--
-- Table structure for table `konfirmasi_bayar`
--

CREATE TABLE `konfirmasi_bayar` (
  `no_rek` int(11) NOT NULL,
  `jum_donasi` int(11) NOT NULL,
  `tangal` date NOT NULL,
  `id_bayar` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `proposal`
--

CREATE TABLE `proposal` (
  `id_proposal` varchar(225) NOT NULL,
  `judul_cpg` varchar(225) NOT NULL,
  `desc_cpg` text NOT NULL,
  `target_cpg` int(11) NOT NULL,
  `deadline_cpg` int(11) NOT NULL,
  `foto_cpg` varchar(225) NOT NULL,
  `alamat_cpg` text NOT NULL,
  `kontak_dkm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` varchar(225) NOT NULL,
  `rek_donatur` int(100) NOT NULL,
  `jum_donasi` int(200) NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`id_cpg`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id_guest`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `campaign`
--
ALTER TABLE `campaign`
  MODIFY `id_cpg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id_guest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
