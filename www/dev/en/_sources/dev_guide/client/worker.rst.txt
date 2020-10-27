Worker
======

async-store.js et modules
-------------------------

Async-store contient l’ensemble des fonctions représentant les commandes
envoyées par “outer”. Il a pour rôle de gérer la connexion au compte
utilisateur, charger les sous-structures liées à ce compte (dossiers
partagés, profil) et charger l’ensemble des modules qui étendent son
champ d’utilisation. Il crée deux objets principaux, nommés ``store`` et
``Store``. Le premier représente la mémoire du worker et stocke tout ce
qui a été chargé par celui-ci, le second représente ses “muscles” et
contient toutes les fonctions pouvant être exécutées par les commandes
de “outer”. Beaucoup de modules sont chargés pour exécuter des tâches
spécifiques et sont accessibles via ``store``.

Commandes de l’objet “Store”
----------------------------

Les commandes pouvant être exécutées par async-store contiennent
notament :

-  Initialisation

   -  Chargement du compte utilisateur (via listmap), des dossiers
      partagés et des équipes
   -  Chargement des différents modules du worker
   -  Initialisation d’une session authentifiée avec le serveur (pour
      les utilisateurs enregistrés)

-  Requêtes serveur authentifiées

   -  L’identité de l’auteur est prouvée au serveur avec la clé de
      signature de l’utilisateur enregistré
   -  Modifier sa “liste de pins”, modifier son mot de passe, détruire
      un pad dont on est propriétaire, récupérer l’espace de stockage
      restant pour le compte, exécuter des commandes administrateurs,
      etc.
   -  Upload d’un fichier statique dans le drive utilisateur

-  Requêtes serveur non-authentifiées

   -  Récupérer la taille totale d’un document dans la base de données
      (avec son historique)
   -  Récupérer les méta-données d’un document (liste de propriétaires,
      liste d’accès, date d’expiration, etc.)

-  Actions sur le compte utilisateur

   -  Stockage ou récupération des Préférences
   -  Commandes à effectuer dans le drive
   -  Gestion des dossiers partagés
   -  Gérer les contacts (ajout ou suppression de contacts)

-  Actions sur les différents modules

   -  Chaque module peut recevoir ses propres commandes, mais celles-ci
      transitent d’abord par “async-store” qui va la redistribuer aux
      modules concernés

-  Documents collaboratifs

   -  Rejoindre un document collaboratif

      -  Initialisation de chainpad-netflux pour ce document
      -  Envoyer des messages sur ce document
      -  Écouter des évènements sur ce document

   -  Obtenir une partie d’historique d’un document (pour le mode
      “historique” de l’interface)
   -  Modifier le mot de passe d’un document
   -  Gérer les métadonnées du document (liste d’accès ou propriétaires)
