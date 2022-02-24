-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Gru 2021, 10:29
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `megak_todo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `closedtodos`
--

CREATE TABLE `closedtodos` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `title` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `closedtodos`
--

INSERT INTO `closedtodos` (`id`, `title`) VALUES
('5c1c4b35-96ba-4fc9-9da9-d967aeab2a22', 'Nowy title jeswzcze'),
('8f8069b2-2537-4fbd-8493-49e9f682bd81', 'Sprawdzić limit'),
('c0e48433-d410-4ae1-b80e-1d0b3480ce8b', 'Dodaję sobie wszystko');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `todos`
--

CREATE TABLE `todos` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `todos`
--

INSERT INTO `todos` (`id`, `title`) VALUES
('3154446f-043b-4623-9bed-db22aacf5054', 'Czwarty wpis'),
('715cba8a-529f-471d-a6d7-66df1b923a46', 'Trzeci wpis'),
('8332a9c7-b5a8-460d-ac75-4911de32f19f', 'To nie anioł');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `closedtodos`
--
ALTER TABLE `closedtodos`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
