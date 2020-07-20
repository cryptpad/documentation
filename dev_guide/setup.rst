Instance locale de développement
--------------------------------

Prérequis
~~~~~~~~~

Avant de commencer, veuillez vous assurer que les éléments suivants sont
installés sur votre système :

-  git
-  nodejs (nous utilisons node v12.14.0)

   -  Nous recommendons l'utilisation de nvm pour installer nodejs

-  npm
-  bower

   -  Vous pouvez l'installer avec ``npm install -g bower`` une fois npm
      installé

Installation
~~~~~~~~~~~~

Le code source de CryptPad se trouve sur `GitHub`_. Pour contribuer, il
faut posséder un compte sur cette plateforme.

-  Effectuer un fork de notre code:
   `https://github.com/xwiki-labs/cryptpad.git`_
-  Cloner le fork sur votre système dans le répertoire souhaité

   -  ``git clone https://github.com/{VOTRE_NOM_D'UTILISATEUR}/cryptpad.git``

-  Installer les dépendances du serveur (avec npm) et du client (avec
   bower) :

::

   cd cryptpad
   npm install
   bower install

Configuration
~~~~~~~~~~~~~

Une fois l'instance installée, certains éléments de configuration
peuvent être réglés avant de lancer le serveur.

-  Effectuer une copie de la configuration par défaut:

::

   cd $cryptpath/config
   cp config.example.js config.js

-  Le `fichier de configuration`_ donne la liste des éléments
   configurables et comment les utiliser.
-  Pour une instance de développement, on retrouve parmis les éléments
   importants :

   -  ``httpUnsafeOrigin`` : pour utiliser le serveur de développement
      et le client de test sur des systèmes différents, il faut modifier
      cette valeur pour utiliser l'adresse réseau du serveur (exemple:
      '`http://192.168.0.10:3000`_')
   -  ``adminKeys`` : pour avoir accès au panneau d'administration dans
      le client CryptPad, il faut créer un compte utilisateur sur
      l'instance et ajouter la *Clé publique de signature* ici.
   -  ``supportMailboxPublicKey`` : pour avoir accès au support sur
      l'instance de développement, il faut générer un "compte" de
      support en utilisant le script \*generate-admin-key.js"

      -  \``node ./scripts/generate-admin-keys.js\`
      -  Copier la clé **publique** (public key) dans le champ
         ``supportMailboxPublicKey`` du fichier de configuration
      -  Copier la clé **privée** (private key) dans la partie support
         du panneau d'administration (après avoir configuré un compte
         administrateur). Cette clé **privée** est la même pour tous les
         comptes administrateurs souhaitant accéder au support.

   -  ``defaultStorageLimit`` : pour augmenter la limite de stockage
      (50Mo par défaut) sur votre instance de développement

Cache et compilation (important)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CryptPad utilise un système de "Cache busting" pour gérer la version du
code JavaScript et du code CSS compilé. Cela signifie que, pour un
lancement normal du serveur, tout le code sera mis en cache à la
première ouverture de chaque fichier et les modifications apportées par
la suite aux sources ne seront pas appliquées dans le navigateur. Pour
éviter ce problème, il faut donc lancer le serveur en mode
*développement*.


Il est important de noter qu'aucune étape de "build" ou "compilation"
n'est nécessaire lors du développement de code pour CryptPad. Les fichiers
JavaScript sont chargés "bruts" dans le navigateur et le code "LESS" est
compilé en CSS par le navigateur des clients directement. Pour tester une
modification, il suffit donc d'écrire le code et de recharger la page sur
CryptPad.

Lancement en mode développement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``npm run dev``

