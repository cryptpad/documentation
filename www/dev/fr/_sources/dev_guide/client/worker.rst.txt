Worker
======

La partie :ref:`Architecture client<architecture_worker>` explique la structure et le
fonctionnement global du “worker”. Il y est expliqué que le fichier
``www/common/outer/async-store.js`` représente la base du worker. Ce
fichier et ses dépendances vont être expliqués ici.

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

Liste des modules et objet “store”
----------------------------------

Les modules chargés par “async-store” représente des ensembles d’actions
liées par fonctionnalité et servant dans certains cas spécifiques. Les
modules principaux sont dans l’ordre de leur initialisation :

-  Compte utilisateur

   -  Module intégré à async-store (indispensable au fonctionnement du
      worker)
   -  Charge le compte utilisateur et son drive (via chainpad-listmap)
   -  Initialisation de l’objet ``store``

      -  ``store.proxy`` : Proxy du compte utilisateur
      -  ``store.realtime`` : Chainpad associé au compte utilisateur
      -  ``store.network`` : Réseau Netflux

-  Proxy-manager

   -  ``www/common/proxy-manager.js``
   -  Il gère le drive du compte utilisateur et tous les dossiers
      partagés qu’il contient
   -  Le drive et les dossiers partagés sont représentés par un Proxy
      (chainpad-listmap) chacun, ce module effectue les actions en
      gardant la cohérence entre ces éléments distincts
   -  Il charge une librairie “userObject.js” qui effectue les
      opérations “unitaires” dans un proxy donné et l’initialise pour
      tous les “Proxy” liés au drive et aux dossiers partagés

      -  Opérations unitaires : ajouter, supprimer, renommer, déplacer
         un pad, effectuer une recherche par texte, trouver l’élement à
         un chemin donné, etc.

   -  Toutes les actions entraînant une modification du contenu du drive
      passent par ce module
   -  Accessible via ``store.manager``

-  Dossiers partagés

   -  ``www/common/outer/sharedfolders.js``
   -  Il charge tous les dossiers partagés d’un drive donné depuis le
      serveur (avec chainpad-listmap) et les ajoute au “proxy-manager”
   -  Il gère les dossiers partagés en commun entre le drive principal
      et le drive de chaque équipe dont l’utilisateur est membre
   -  Les pertes d’accès (via une liste d’accès), suppression du dossier
      ou modification de droits (édition ou lecture) sont
      automatiquement signalés aux proxy-manager concernés
   -  Module auto-géré, non accessible directement

-  Curseur

   -  ``www/common/outer/cursor.js``
   -  Il gère la position du curseur de chaque utilisateur dans les
      différents documents ouverts qui supportent cette fonctionnalité
   -  Pour chaque document, le salon “éphémère” (données non stockées
      dans la base de données) associé est ouvert

-  OnlyOffice

   -  ``www/common/outer/onlyoffice.js``
   -  Les applications basées sur OnlyOffice (Tableur uniquement pour le
      moment) n’utilisent pas uniquement ChainPad et ont un
      fonctionnement différent au niveau du stokcage, notamment pour les
      checkpoints.
   -  Ce module va rejoindre les salons Netflux associés à chaque
      document OnlyOffice ouvert et contenant les patchs chiffrés.

-  Messenger

   -  ``www/common/outer/messenger.js``
   -  Il gère toute la partie réseau et parfois le chiffrement des
      systèmes de chat utilisés dans CryptPad

      -  Chat dans un pad (reseau uniquement)
      -  Chat d’équipe (réseau et chiffrement)
      -  Chat avec un contact (réseau et chiffrement)

   -  Accessible via ``store.messenger`` ou ``store.modules.messenger``

-  Profil

   -  ``www/common/outer/profile.js``
   -  Ce module charge le document lié au profil de l’utilisateur
      enregistré courant (via listmap)
   -  Il effectue toutes les modifications souhaitées sur ce document
      (données modifiables du profil)
   -  Il écoute les changements effectués sur le nom d’utilisateur
      **affiché** pour également mettre à jour ce nom dans le profil
   -  Accessible via ``store.modules.profile``

-  Team

   -  ``www/common/outer/team.js``
   -  Le plus complexe des modules, il effectue une partie du travail
      attribué à “async-store” mais en ce qui concerne les équipes :

      -  Chargement du “compte” de chaque équipe (avec son drive)
      -  Chargement d’un proxy-manager pour le drive de chaque équipe
      -  Chargement des dossiers partagés de chaque équipe
      -  Chargement du module “roster”

         -  ``www/common/outer/roster.js``
         -  Contient la liste des membres et gère les droits d’accès de
            chaque membre

      -  Initialisation d’une session authentifiée avec le serveur
         (signée avec la clé de l’équipe)

         -  Gestion des documents dont l’équipe est propriétaire
         -  Gestion de la “liste de pins” de l’équipe
         -  Gestion de l’espace de stockage de l’équipe
         -  Upload de fichier statique dans le drive de l’équipe

      -  Gestion des métadonnées de l’équipe (nom, image)
      -  Permet la création, suppression et gestion d’une équipe

   -  Accessible via ``store.modules.team``, qui contient notamment des
      informations sur chaque équipes

-  Historique

   -  ``www/common/outer/history.js``
   -  Ce module permet de vérifier la taille de l’historique de chaque
      document collaboratif et de supprimer l’historique non-essentiel,
      c’est-à-dire tous les messages antérieurs à l’avant-dernier
      checkpoint
   -  Accessible via ``store.modules.history``

-  Mailbox

   -  ``www/common/outer/mailbox.js``
   -  Ce module permet de gérer les “boîtes mail” d’un utilisateur. Ces
      mailboxes sont des moyens de stockage supplémentaires créés pour
      chaque compte utilisateur CryptPad et permettent à différent
      utilisateurs de s’envoyer des messages chiffrés.
   -  Les messages ne quittent jamais CryptPad et quand un message est
      envoyé à un utilisateur hors-ligne, celui-ci recevra le message à
      sa prochaine connexion. Pour envoyer un message à quelqu’un, il
      est nécessaire de connaître “l’adresse” de sa mailbox et la clé
      publique de chiffrement de cet utilisateur (afin que lui seul
      puisse déchiffrer le contenu).
   -  Ce module est à la base du système de notifications de CryptPad.
      Quand une notification est affichée pour un utilisateur, elle a en
      réalité été envoyée par un autre utilisateur.
   -  Accessible via ``store.mailbox``, ce module notamment permet
      d’envoyer des messages avec ``sendTo`` ou de supprimer des
      messages affichés avec ``dismiss``.

