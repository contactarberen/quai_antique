-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 01 mai 2023 à 15:50
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `quai_antique`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`) VALUES
(1, 'Entrées'),
(2, 'Plats'),
(3, 'Desserts'),
(4, 'Les Boissons'),
(5, 'Les Boissons Chaudes');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230405163526', '2023-04-05 18:35:32', 149),
('DoctrineMigrations\\Version20230416134322', '2023-04-16 15:43:26', 137),
('DoctrineMigrations\\Version20230419114115', '2023-04-19 13:41:23', 18),
('DoctrineMigrations\\Version20230429121305', '2023-04-29 14:13:17', 12);

-- --------------------------------------------------------

--
-- Structure de la table `formule`
--

CREATE TABLE `formule` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `disponibilite` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formule`
--

INSERT INTO `formule` (`id`, `menu_id`, `titre`, `disponibilite`, `description`, `prix`) VALUES
(1, 1, 'Formule Diner', 'du lundi au samedi midi', 'Entrée+Plat+Dessert', 95),
(2, 1, 'Formule Déjeuner', 'Le midi du lundi au vendredi', 'Entrée+Plat ou Plat+Dessert', 75),
(3, 2, 'Formule Déjeuner Complet', 'Samedi et dimanche midi', 'Entrée+Plat+Dessert', 85),
(4, 2, 'Formuler Dejeuner', 'Samedi et Dimanche midi', 'Entrée+Plat ou Plat+Dessert', 65),
(6, 1, 'formule Royale', 'le midi du lundi au vendredi', 'Entrée+Plat+Dessert', 150);

-- --------------------------------------------------------

--
-- Structure de la table `horaire`
--

CREATE TABLE `horaire` (
  `id` int(11) NOT NULL,
  `jour_id` int(11) NOT NULL,
  `debut` time NOT NULL,
  `fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `horaire`
--

INSERT INTO `horaire` (`id`, `jour_id`, `debut`, `fin`) VALUES
(1, 1, '12:00:00', '14:00:00'),
(2, 1, '19:00:00', '22:00:00'),
(3, 2, '12:00:00', '15:00:00'),
(4, 2, '19:00:00', '22:00:00'),
(5, 3, '00:00:00', '00:00:00'),
(6, 4, '12:00:00', '15:30:00'),
(7, 4, '19:00:00', '22:00:00'),
(8, 5, '12:00:00', '16:15:00'),
(9, 5, '19:00:00', '23:00:00'),
(10, 6, '19:00:00', '23:00:00'),
(11, 7, '12:00:00', '14:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `jour_semaine`
--

CREATE TABLE `jour_semaine` (
  `id` int(11) NOT NULL,
  `nom_jour` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `jour_semaine`
--

INSERT INTO `jour_semaine` (`id`, `nom_jour`) VALUES
(1, 'Lundi'),
(2, 'Mardi'),
(3, 'Mercredi'),
(4, 'Jeudi'),
(5, 'Vendredi'),
(6, 'Samedi'),
(7, 'Dimanche');

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `menu`
--

INSERT INTO `menu` (`id`, `titre`) VALUES
(1, 'Menu du Marché'),
(2, 'Menu du Week-end');

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL,
  `available_at` datetime NOT NULL,
  `delivered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `parametres`
--

CREATE TABLE `parametres` (
  `id` int(11) NOT NULL,
  `nb_convive_seuil` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `parametres`
--

INSERT INTO `parametres` (`id`, `nb_convive_seuil`) VALUES
(2, 40);

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `chemin` varchar(255) NOT NULL,
  `apparition` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`id`, `titre`, `chemin`, `apparition`) VALUES
(8, 'entree2', 'entree-2-644d1b8f25fde.jpg', 1),
(9, 'plat1', 'plat-1-644d1bca1359e.jpg', 2),
(10, 'plat3', 'plat-3-644d1bdd0b633.jpg', 3),
(11, 'plat4', 'plat-4-644d1c0e7ab47.jpg', 4);

-- --------------------------------------------------------

--
-- Structure de la table `plat`
--

CREATE TABLE `plat` (
  `id` int(11) NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `plat`
--

INSERT INTO `plat` (`id`, `categorie_id`, `titre`, `description`, `prix`) VALUES
(1, 1, 'Betteraves Rôties', 'Avec une vinaigrette au citron, ail et basilic', 15),
(2, 1, 'Campagnarde', 'Une soupe de légumes variés cuits à feu doux dans une sauce tomate légère', 12),
(3, 1, 'Le foie Gras de Canard', 'Fruits secs torréfiés, pulpe d\'abricot au basilic, oignons caramélisés', 15),
(4, 2, 'Surlonge de Boeuf', 'Un morceau de viande très tendre servi avec notre sauce maison', 45),
(5, 2, 'La pintade', 'Le suprême rôti, petites carottes de couleurs aux herbes, oignon vert à la graine de moutarde, pak choi acidulé, jus à l\'estragon', 30),
(6, 2, 'La Daurade Royale', 'Confite à la moelle, fenouil braisé aux épices et jus de roche', 39),
(7, 2, 'Arlequin de pâtes', 'Langoustine Royale, vinaigrée de carottes acidulée', 28),
(8, 3, 'Pudding aux Dates', 'Avec une sauce de caramel au beurre et de la crème glacée à la vanille', 18),
(9, 3, 'Fondant', 'Un fondant au chocolat avec un coeur de chocolat noir', 18),
(10, 3, 'La prune', 'Confite aux senteurs de fruits rouges, pistache et herbes fraiches, crêpe soufflée au grand marnier et fraicheur glacée.', 20),
(11, 3, 'La figue', 'De Provence, rôtie parfumée au Porto, Gelée de fraise vanillée aux agrumes sorbet mara des bois.', 22),
(12, 4, 'Vins blancs Domaine Servin', 'AOC Chabis 1er Cru \"Vaillons\"', 51),
(13, 4, 'Chateau Cahrbonnieux', 'Chabis', 80),
(14, 4, 'L\'esprit de Chevalier', 'Domaine de Chevalier - 2011', 63),
(15, 4, 'Soda', 'Coca-cola, Sprite, 7up, Orangina, Fanta', 5),
(16, 5, 'Thé', 'noir ou vert', 6),
(17, 5, 'Café', 'Expresso', 4),
(18, 5, 'Chocolat Chaud', 'grande tasse', 4);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nb_couvert` int(11) NOT NULL,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `allergie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `nom`, `nb_couvert`, `date`, `heure`, `allergie`) VALUES
(1, 'visiteur1', 4, '2023-04-20', '12:30:00', 'gluten'),
(2, 'béril', 1, '2023-04-20', '12:30:00', 'non'),
(4, 'erdem', 4, '2023-04-19', '12:30:00', 'non'),
(5, 'yasar', 2, '2023-04-24', '12:00:00', 'gluten'),
(6, 'yeliz', 4, '2023-04-25', '12:15:00', 'no'),
(11, 'eren22', 3, '2023-04-18', '22:52:00', 'n'),
(12, 'jean', 2, '2023-04-18', '12:20:00', 'no'),
(13, 'camus', 6, '2023-04-25', '12:30:00', 'no'),
(14, 'albert', 4, '2023-04-18', '20:45:00', 'no'),
(22, 'yasar', 2, '2023-04-25', '12:15:00', 'gluten'),
(25, 'caglar yasar', 6, '2023-04-25', '19:15:00', 'non'),
(26, 'Bertrand', 4, '2023-05-01', '12:30:00', 'non'),
(27, 'Bertrand', 4, '2023-05-01', '12:30:00', 'non'),
(28, 'Julie', 3, '2023-05-01', '12:15:00', 'poissons'),
(29, 'Mélanie', 5, '2023-05-01', '19:00:00', 'non'),
(30, 'Laurent', 10, '2023-05-02', '12:15:00', 'non'),
(31, 'Charles', 2, '2023-05-04', '12:30:00', 'non'),
(32, 'Noel', 2, '2023-05-01', '12:15:00', 'non'),
(33, 'yasar', 2, '2023-05-01', '12:00:00', 'gluten'),
(34, 'yasar', 2, '2023-05-04', '13:00:00', 'gluten'),
(35, 'Djibril', 5, '2023-06-08', '12:15:00', 'non'),
(36, 'Simon', 3, '2023-05-02', '12:15:00', 'no'),
(37, 'pierre', 2, '2023-05-02', '12:15:00', 'no'),
(38, 'camus', 6, '2023-05-02', '12:30:00', 'no'),
(39, 'caglar yasar', 4, '2023-05-04', '12:15:00', 'non'),
(40, 'eren', 4, '2023-05-02', '12:15:00', 'n'),
(41, 'eren2', 3, '2023-05-02', '12:30:00', 'n'),
(42, 'albert3', 2, '2023-05-02', '12:30:00', 'no');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `nb_convive` int(11) DEFAULT NULL,
  `allergie` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `nom`, `nb_convive`, `allergie`) VALUES
(6, 'client1@studi.fr', '[]', '$2y$13$19SJlhekKUX/D52pRO/hOO8uy3OkxEydz3qzXRr9tyLX1IRz.NBGK', 'yasar', 2, 'gluten'),
(7, 'client2@studi.fr', '[]', '$2y$13$gvW4g2RGsYt6DLA0wClOI.nhRmarRWjGXN5VEtSccWEwk9f/5k6nW', 'yeliz', 4, 'no'),
(10, 'admin@lequaiantique.fr', '[\"ROLE_USER\",\"ROLE_ADMIN\"]', '$2y$13$QuqT2cauTnRzGilSFJX6dOhA/5QxDntO0QS4hsdfCz1ZLeO4j7Wpq', NULL, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `formule`
--
ALTER TABLE `formule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_605C9C98CCD7E912` (`menu_id`);

--
-- Index pour la table `horaire`
--
ALTER TABLE `horaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_BBC83DB6220C6AD0` (`jour_id`);

--
-- Index pour la table `jour_semaine`
--
ALTER TABLE `jour_semaine`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Index pour la table `parametres`
--
ALTER TABLE `parametres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `plat`
--
ALTER TABLE `plat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_2038A207BCF5E72D` (`categorie_id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `formule`
--
ALTER TABLE `formule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `horaire`
--
ALTER TABLE `horaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `jour_semaine`
--
ALTER TABLE `jour_semaine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parametres`
--
ALTER TABLE `parametres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `plat`
--
ALTER TABLE `plat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `formule`
--
ALTER TABLE `formule`
  ADD CONSTRAINT `FK_605C9C98CCD7E912` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`);

--
-- Contraintes pour la table `horaire`
--
ALTER TABLE `horaire`
  ADD CONSTRAINT `FK_BBC83DB6220C6AD0` FOREIGN KEY (`jour_id`) REFERENCES `jour_semaine` (`id`);

--
-- Contraintes pour la table `plat`
--
ALTER TABLE `plat`
  ADD CONSTRAINT `FK_2038A207BCF5E72D` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
