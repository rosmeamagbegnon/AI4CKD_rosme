Ce projet est un projet fullstack. Le frontend a été réalisé avec ReactJS et le backend avec ExpressJS.
Le projet contient un dossier frontend pour le front et un dossier backend pour le back.
Pour démarrer le frontend, il faut ouvrir le terminal de votre environnement de développement et exécuter les commandes suivantes:
  "cd frontend" pour aller dans le sous dossier frontend
  "npm install"
  "npm run dev" et ensuite on clique sur le lien localhost envoyé suite à l'exécution de cette commande
Pour démarrer le backend, il faut ouvrir le terminal de votre environnement de développement et exécuter les commandes suivantes:
  "node -v" pour vérifier la version de nodeJS. Vous devez avoir au moins la version 22
  "cd backend" pour aller dans le sous dossier backend
  "npm install" pour installer les dépendances
  "npm install mysql"
  "CREATE DATABASE ai4ckd_db;" dans php MyAdmin pour créer la base de données associée au projet
  Configurer les informations de connexion à la base de données dans le fichier .env
  "npx sequelize-cli db:migrate" pour lancer les migrations
  "npm start" pour démarrer le serveur ExpressJS
