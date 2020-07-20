Points fondamentaux de CryptPad
-------------------------------

Lors de changements d'envergure effectués à CryptPad, il est important
de garder en tête certains éléments qui bloqueront leur intégration au
projet s'ils ne sont pas respectés.

Zero-knowledge
^^^^^^^^^^^^^^

**Aucune donnée non-essentielle concernant l'utilisateur ou ses
documents ne doit atteindre le serveur de manière non-chiffrée.** C'est
l'élément le plus important pour CryptPad !

Données visibles par le serveur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Certaines données sont malheureusement impossible à ne pas recevoir sur
le serveur à cause du fonctionnement même d'Internet via le protocole
HTTP. Il s'agit notamment de l'adresse IP ainsi que d'éléments
concernant le navigateur et le système d'exploitation des utilisateurs.
Les utilisateurs peuvent toutefois se protéger se leur côté :

-  L'utilisation d'un VPN ou de TOR permet de "remplacer" son adresse IP
   réelle par une autre.
-  Certaines extensions pour navigateur permettent de modifier son
   "user-agent" (qui contient par défaut la verion du navigateur et de
   système d'exploitation de l'utilisateur).

Par ailleurs, le serveur CryptPad reçoit également de manière
non-chiffrée la "clé publique de signature" générée par CryptPad pour
identifier chaque utilisateur. Cette clé est la seule chose qui relie
les données des utilisateurs à leur "compte CryptPad", mais elle ne
permet pas de faire le lien avec une personne physique.

**Nous n'accepterons aucune contribution qui envoie au serveur, de
manière directe ou non, des données non-chiffrée permettant d'identifier
un utilisateur (nom d'utilisateur, image de profil, liste de contacts,
etc.).**

Lorsqu'une telle information semble nécessaire, l'expérience nous a
montré qu'il est presque toujours possible de trouver des solutions
alternatives permettant de répondre au même besoin tout en protégeant
les utilisateurs. Le code source contient beaucoup d'outils adaptés à ce
genre de situation et l'équipe de développement est prête à aider tout
contributeur ayant des difficulté à respecter cette règle pour les
modifications souhaitées.

Zero-knowledge dans CryptPad
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Beaucoup de mesures sont en place dans CryptPad pour contourner les
besoins habituels des services de connaître l'identité de leurs
utilisateurs :

-  Il est impossible de "retrouver" un compte utilisateur à partir d'un
   nom ou pseudonyme, que ce soit pour les administrateurs du service ou
   pour ajouter un contact.

   -  **Raisons**

      -  Un tel système de recherche nécessite l'accès à une base de
         données non-chiffrée de noms d'utilisateurs. Aucun nom n'est
         stocké dans la base de données de CryptPad.

   -  **Dans CryptPad**

      -  Les comptes sont identifiés par leur "clé publique de
         signature". Cette clé est générée à l'inscription dans le
         navigateur du client lui-même. Le nom d'utilisateur et le mot
         de passe requis pour s'identifier sont utilisés dans une
         fonction `Scrypt`_ pour dériver des clés de chiffrements dans
         le navigateur du client.
      -  Seules les parties "publiques" de ces clés sont parfois
         envoyées au serveur.

-  Il est impossible de "ré-initialiser" son mot de passe en cas de
   perte de celui-ci.

   -  **Raisons**

      1. Les services permettant de ré-initialiser le mot de passe
         nécessitent l'envoi d'un email par le serveur. Le serveur
         CryptPad n'a pas accès aux adresses emails et ne peut donc pas
         effectuer cette tâche.
      2. S'il était possible aux administrateurs de changer le mot de
         passe d'un compte utilisateur, cela signifierait qu'ils
         pourraient le changer à tout moment et accéder aux données, ce
         que nous ne voulons pas.

   -  **Dans CryptPad**

      -  Aucun système n'est actuellement en place pour retrouver son
         mot de passe en cas de perte.

-  Toutes les données stockées dans la base de données sont chiffrées
   avant d'être envoyées au serveur. Il y a 2 systèmes principaux pour
   stocker des données sur le serveur :

   -  Pour les comptes utilisateurs et les pads/documents modifiables,
      notre librairie `ChainPad`_ est généralement utilisée. Elle permet
      lors de la modification d'un document de créer un "patch"
      contenant les différences par rapport à l'état précédent. Ce patch
      est alors chiffré et envoyé au serveur pour être redirigé vers les
      autres participants du document et être stocké dans la base de
      données. Les documents sont donc principalement stockés sous forme
      d'une suite de patchs permettant de les reconstruire à partir d'un
      point de départ donné.
   -  Pour les fichiers statiques non-modifiables (image, vidéo, pdf,
      etc.) qui peuvent être stockés dans le compte ou intégrés aux
      documents, ils sont simplement chiffrés dans le navigateur du
      client et envoyés au serveur pour y être stockés tels quels.
   -  **A noter** : les "comptes utilisateurs" avec leur drive sont
      considérés comme des "documents modifiables" et sont donc
      impossible à différencier dans la base de données d'un document
      texte par exemple.

Content Security Policy (CSP) et sécurité
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Le fonctionnement même de la plupart des applications dans CryptPad est
basé sur la collaboration entre différents utilisateurs. Ces
applications permettent alors à un utilisateur d'écrire du contenu qui
sera affiché dans le navigateur d'un autre. Un élément majeur consiste
alors à **empêcher un utilisateur malveillant d'envoyer du code qui sera
exécuté par le navigateur d'un autre utilisateur** (vulnerabilité de
type XSS). Pour empêcher cette possibilité, CryptPad utilise pour cela 3
grands mécanismes pour garantir au maximum la sécurité des données.

Au premier niveau, le code contient de nombreux mécanismes pour filter
ce qui est écrit par des utilisateurs et affiché chez d'autres afin d'y
retirer tout ce qui ressemble à du code. Cependant, une erreur ou un
oubli est toujours possible d'une part, et le CryptPad utilise des
librairies externes dont le code pourrait être vulnérable suite à une
mise à jour.

Au deuxième niveau, afin d'ajouter une protection supplémentaire, le
serveur envoie alors des règles de **Content-Security-Policy** aux
navigateurs des utilisateurs. Ces règles permettent au navigateur de
savoir ce qu'il peut effectuer sans risque et ce qui est bloqué car
potentiellement dangereux. Elles sont nombreuses mais les principales
pour les contributeurs concernent le JavaScript :

-  Il est impossible de charger du code JavaScript depuis un site
   externe (CDN). Tous les fichiers JavaScript chargés dans une page
   doivent être hébergés par le système représenté par l'adresse
   indiquée dans le champ ``httpUnsafeOrigin`` du fichier de
   configuration.
-  Il est impossible d'exécuter du JavaScript "inline", c'est-à-dire en
   utilisant des attributs HTML du type
   ``<span onclick="alert('test');">Click</span>``. Les gestionnaires
   d'évènements doivent être ajoutés depuis le code JavaScript
   directement : ``span.addEventListener('click', onClick);``.
-  Il est impossible d'évaluer une chaîne de caractère en tant que code
   avec la fonction JavaScript ``eval()``.

Enfin, au troisième niveau, si vraiment une faille "XSS" est présente et
que les règles CSP arrivent à être contournées, un dernier mécanisme
permet de protéger un compte CryptPad des utilisateurs malveillants.
CryptPad fonctionne avec un système de "sandbox" : toute l'interface est
ainsi créée dans une iframe ouverte sur une origine HTTP différente de
celle de l'onglet du navigateur, qui contient l'ensemble des données de
votre compte utilisateur. Dans une instance de développement, cette
séparation est effectuée en utilisant 2 ports différents :
``http://localhost:3000`` pour l'onglet principal et
``http://localhost:3001`` pour l'iframe sandbox. L'intégralité de
l'interface collaborative étant présente dans cette iframe, si du code
venait à être injecté par un autre utilisateur, il ne pourrait être
exécuté qu'à ce niveau. La différence d'origine entre la sandbox et le
reste du code protègerait le reste de votre compte d'être récupéré par
un utilisateur. **L'utilisateur malveillant ne pourrait donc récupérer
que les données présentes dans le document auquel il a déjà accès**.

Personnalisation
^^^^^^^^^^^^^^^^

Lors de l'écriture de code pour CryptPad, il est important de se
souvenir qu'il existe de nombreuses instances de CryptPad et que les
administrateurs de celles-ci souhaitent parfois personnaliser des
éléments de l'interface ou le fonctionnement de certains outils.

Afin de faciliter la mise à jour vers une version plus récente de
CryptPad lorsque de telles modifications sont présentes, les éléments
estimés personnalisables sans risque par l'équipe de développement sont
stockés dans le dossier ``customize.dist``. Chaque fichier stocké dans
ce répertoire peut être modifié en créant un dossier ``customize`` et en
copiant le fichier d'origine. Si un fichier existe dans ``customize``,
il sera alors fourni aux utilisateurs à la place de son homonyme dans
``customize.dist``.

La plupart des images, logos et des fichiers de style LESS sont donc
placés dans ``customize.dist`` afin de pouvoir être facilement
modifiables. Les modifications locales effectuées dans ``customize``
sont ignorées par Git et ne peuvent donc pas être envoyées comme
contributions.

Architecture du code
^^^^^^^^^^^^^^^^^^^^

Plusieurs points important concernant le code sont à respecter au
maximum lors de contributions à CryptPad :

-  Tout le code JavaScript du client doit respecter les standards ES5
   (ECMAScript Edition 5).
-  Le code de style est écrit au format LESS.

   -  Rappel : aucune étape de build/compilation n'est requise durant le
      développement.

-  CryptPad utilise un système de sandbox (détaillé dans la suite de ce
   guide) pour contenir toute l'interface des outils collaboratifs.
   Lorsque du code doit toucher au contenu du drive, aux équipes, aux
   contacts ou à tout autre élément ne devant pas être accessible aux
   autres utilisateurs, ce code doit se trouver en dehors de la sandbox.
-  CryptPad utilise la technologie SharedWorker (quand le navigateur la
   supporte) pour partager un "thread" entre tous les onglets du
   navigateur ouvert sur la même instance CryptPad. Le code qui concerne
   toutes les applications de CryptPad peut être placé à ce niveau
   (détaillé dans la suite de ce guide) afin d'éviter de l'exécuter une
   fois dans chaque onglet.

Clés de traduction
^^^^^^^^^^^^^^^^^^

CryptPad est traduit officiellement (par l'équipe de développement) en
anglais (langue par défaut) et en français. De nombreuses autres langues
sont disponibles, mais les traductions sont effectuées par la communauté
via notre plateforme `Weblate`_.

Les clés de traductions pouvant être traduites sur Weblate doivent être
ajoutées manuellement par l'équipe de développement. Pour faciliter
l'intégration des contributions, nous demandons de **ne pas ajouter
directement de clé de traduction dans le fihcier de traduction**. Les
clés de traduction à ajouter peuvent être indiquées soit dans le message
accompagnant la "pull request", soit en commentaire dans le code
directement. Lorsqu'une telle clé doit être ajoutée, il est préférable
d'inclure (si possible) au moins soit une version anglaise, soit une
version française du texte.

.. _Weblate: https://weblate.cryptpad.fr
.. _Scrypt: https://fr.wikipedia.org/wiki/Scrypt
.. _ChainPad: https://github.com/xwiki-contrib/chainpad
