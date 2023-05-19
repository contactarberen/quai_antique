# quai_antique
Déploiement en local
---------------------
Récupérer le code sur github.

lancer: "composer update" pour tout installer. 

dans le fichier .env, renseigner les informations de votre base de données.

Taper les commandes suivantes pour effectuer la migration:

  - php bin/console doctrine:database:create

  - php bin/console doctrine:migrations:diff

  - php bin/console doctrine:migrations:migrate

lancer le serveur local pour tester en local: symfony server:start -d —port=8050

Déploiement en ligne sur Heroku
--------------------------------
Après avoir installé Heroku CLI et choisi une base de donnée MySQL (Jawsdb dans mon cas), créer le projet en passant par le compte github. Ne pas oublier de définir les variables d'environnement:

  APP_ENV= prod

  APP_SECRET

  DATABASE_URL


Création d'un administrateur
----------------------------
La création de l'administrateur va se faire via les fixtures. Lancer la commande suivante via le terminal pour créer l'administrateur 

php bin/console doctrine:fixtures:load --append (par défaut: "admin@lequaiantique.fr", mot de passe:321).
