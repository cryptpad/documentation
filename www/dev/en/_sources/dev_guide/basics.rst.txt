Points fondamentaux de CryptPad
===============================

Zero-knowledge
--------------

**Aucune donnée non-essentielle concernant l’utilisateur ou ses
documents ne doit atteindre le serveur de manière non-chiffrée.** C’est
l’élément le plus important pour CryptPad !

Données visibles par le serveur
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Certaines données sont malheureusement impossible à ne pas recevoir sur
le serveur à cause du fonctionnement même d’Internet via le protocole
HTTP. Il s’agit notamment de l’adresse IP ainsi que d’éléments
concernant le navigateur et le système d’exploitation des utilisateurs.
Les utilisateurs peuvent toutefois se protéger se leur côté :

-  L’utilisation d’un VPN ou de TOR permet de “remplacer” son adresse IP
   réelle par une autre.
-  Certaines extensions pour navigateur permettent de modifier son
   “user-agent” (qui contient par défaut la verion du navigateur et de
   système d’exploitation de l’utilisateur).

Par ailleurs, le serveur CryptPad reçoit également de manière
non-chiffrée la “clé publique de signature” générée par CryptPad pour
identifier chaque utilisateur. Cette clé est la seule chose qui relie
les données des utilisateurs à leur “compte CryptPad”, mais elle ne
permet pas de faire le lien avec une personne physique.

**Nous n’accepterons aucune contribution qui envoie au serveur, de
manière directe ou non, des données non-chiffrée permettant d’identifier
un utilisateur (nom d’utilisateur, image de profil, liste de contacts,
etc.).**

Lorsqu’une telle information semble nécessaire, l’expérience nous a
montré qu’il est presque toujours possible de trouver des solutions
alternatives permettant de répondre au même besoin tout en protégeant
les utilisateurs. Le code source contient beaucoup d’outils adaptés à ce
genre de situation et l’équipe de développement est prête à aider tout
contributeur ayant des difficulté à respecter cette règle pour les
modifications souhaitées.

Content Security Policy (CSP) et sécurité
-----------------------------------------

Le fonctionnement même de la plupart des applications dans CryptPad est
basé sur la collaboration entre différents utilisateurs. Ces
applications permettent alors à un utilisateur d’écrire du contenu qui
sera affiché dans le navigateur d’un autre. Un élément majeur consiste
alors à **empêcher un utilisateur malveillant d’envoyer du code qui sera
exécuté par le navigateur d’un autre utilisateur** (vulnerabilité de
type XSS). Pour empêcher cette possibilité, CryptPad utilise pour cela 3
grands mécanismes pour garantir au maximum la sécurité des données.

Le premier élément, à respecter lors de l’écriture de code pour
CryptPad, est l’utilisation de “sanitizer”, c’est-à-dire d’outils qui
nettoie le contenu entrés par des utilisateurs et affiché chez d’autres.
Ce nettoyage doit enlever tout ce qui peut permettre d’exécuter du
JavaScript chez d’autres utilisateurs, comme des attributs
``onclick="..."`` ou des balises ``<script>`` directement.

Le deuxième élément est géré par le serveur etpermet d’ajouter une
protection supplémentaire. Celui-ci envoie des règles de
**Content-Security-Policy** aux utilisateurs. Ces règles permettent au
navigateur de savoir ce qu’il peut effectuer sans risque et ce qui est
bloqué car potentiellement dangereux. Elles sont nombreuses mais les
principales pour les contributeurs concernent le JavaScript :

-  Il est impossible de charger du code JavaScript depuis un site
   externe (CDN). Tous les fichiers JavaScript chargés dans CryptPad
   doivent être hébergés sur le domaine représenté par le champ
   ``httpUnsafeOrigin`` du fichier de configuration.
-  Il est impossible d’exécuter du JavaScript “inline”, c’est-à-dire en
   utilisant des attributs HTML du type
   ``<span onclick="alert('test');">Click</span>``. Les gestionnaires
   d’évènements doivent être ajoutés depuis le code JavaScript
   directement : ``span.addEventListener('click', onClick);``.
-  Il est impossible d’évaluer une chaîne de caractère en tant que code
   avec la fonction JavaScript ``eval()``.

Enfin, au troisième niveau, si vraiment une faille “XSS” est présente et
que les règles CSP arrivent à être contournées, un dernier mécanisme
permet de protéger un compte CryptPad des utilisateurs malveillants.
CryptPad fonctionne avec un système de “sandbox” : toute l’interface est
ainsi créée dans une iframe ouverte sur une origine HTTP différente de
celle de l’onglet du navigateur, qui contient l’ensemble des données de
votre compte utilisateur. Dans une instance de développement, cette
séparation est effectuée en utilisant 2 ports différents :
``http://localhost:3000`` pour l’onglet principal et
``http://localhost:3001`` pour l’iframe sandbox. L’intégralité de
l’interface collaborative étant présente dans cette iframe, si du code
venait à être injecté par un autre utilisateur, il ne pourrait être
exécuté qu’à ce niveau. La différence d’origine entre la sandbox et le
reste du code protègerait le reste de votre compte d’être récupéré par
un utilisateur. **L’utilisateur malveillant ne pourrait donc récupérer
que les données présentes dans le document auquel il a déjà accès**.

Personnalisation
----------------

Lors de l’écriture de code pour CryptPad, il est important de se
souvenir qu’il existe de nombreuses instances de CryptPad et que les
administrateurs de celles-ci souhaitent parfois personnaliser des
éléments de l’interface ou le fonctionnement de certains outils.

Afin de faciliter la mise à jour vers une version plus récente de
CryptPad lorsque de telles modifications sont présentes, les éléments
estimés personnalisables sans risque par l’équipe de développement sont
stockés dans le dossier ``customize.dist``. Chaque fichier stocké dans
ce répertoire peut être modifié en créant un dossier ``customize`` et en
copiant le fichier d’origine. Si un fichier existe dans ``customize``,
il sera alors fourni aux utilisateurs à la place de son homonyme dans
``customize.dist``.

La plupart des images, logos et des fichiers de style LESS sont donc
placés dans ``customize.dist`` afin de pouvoir être facilement
modifiables. Les modifications locales effectuées dans ``customize``
sont ignorées par Git et ne peuvent donc pas être envoyées comme
contributions.

Règles du code
--------------

Plusieurs points important concernant le code sont à respecter au
maximum lors de contributions à CryptPad :

-  Tout le code JavaScript du client doit respecter les standards ES5
   (ECMAScript Edition 5).
-  Le code de style est écrit au format LESS.

   -  Rappel : aucune étape de build/compilation n’est requise durant le
      développement.

-  CryptPad utilise un système de sandbox (détaillé dans la suite de ce
   guide) pour contenir toute l’interface des outils collaboratifs.
   Lorsque du code doit toucher au contenu du drive, aux équipes, aux
   contacts ou à tout autre élément ne devant pas être accessible aux
   autres utilisateurs, ce code doit se trouver en dehors de la sandbox.
-  CryptPad utilise la technologie SharedWorker (quand le navigateur la
   supporte) pour partager un “thread” entre tous les onglets du
   navigateur ouvert sur la même instance CryptPad. Le code qui concerne
   toutes les applications de CryptPad peut être placé à ce niveau
   (détaillé dans la suite de ce guide) afin d’éviter de l’exécuter une
   fois dans chaque onglet.

Clés de traduction
------------------

CryptPad est traduit officiellement (par l’équipe de développement) en
anglais (langue par défaut) et en français. De nombreuses autres langues
sont disponibles, mais les traductions sont effectuées par la communauté
via notre plateforme `Weblate <https://weblate.cryptpad.fr>`__.

Les clés de traductions pouvant être traduites sur Weblate doivent être
ajoutées manuellement par l’équipe de développement. Pour faciliter
l’intégration des contributions, nous demandons de **ne pas ajouter
directement de clé de traduction dans le fihcier de traduction**. Les
clés de traduction à ajouter peuvent être indiquées soit dans le message
accompagnant la “pull request”, soit en commentaire dans le code
directement. Lorsqu’une telle clé doit être ajoutée, il est préférable
d’inclure (si possible) au moins soit une version anglaise, soit une
version française du texte.
