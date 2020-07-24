ChainPad et Listmap
===================

Dans la base de données, les document collaboratifs (c’est-à-dire les
documents qui ne sont pas des fichiers statiques uploadés par
l’utilisateur) sont stockés sous forme de “patchs” chiffrés qui
permettent de reconstruire le document depuis un point de départ. Cette
gestion des patchs est effectuée grâce à notre librairie
`ChainPad <https://github.com/xwiki-contrib/chainpad>`__.

ChainPad
--------

ChainPad est ce qu’on pourrait appeler la base du “moteur temps-réel” de
CryptPad. En partant d’un même point de départ fixe (qui peut être
vide), plusieurs utilisateurs peuvent ouvrir un même document. ChainPad
travaille exclusivement avec des documents au format “texte” en théorie,
mais des solutions existent en pratique pour d’autres formats de données
JavaScript.

Chaque utilisateur initialise donc un “objet” chainpad local, auquel on
fournit tout l’historique des patchs de la base de données depuis un
point de départ donné. Les patchs contiennent un ensemble d’opérations
simples à effectuer sur le document (retirer X caractères et ajouter les
caractères “abc” à la position Y) ainsi qu’un “parent”. Stocker un
identifiant de parent dans le patch permet de toujours reconstruire le
document avec les patchs dans le bon ordre. L’ensemble des patchs depuis
un point de départ (chaîne vide en général) permet alors d’obtenir la
dernière version du document.

Une fois le document restauré grâce à l’historique, CryptPad va détecter
chaque changement effectué dans l’application afin de générer une
nouvelle version “locale” du document et va fournir cette version à
ChainPad. ChainPad va alors l’analyser afin de trouver les “différences”
entre la nouvelle version et la version précédente. Ces différences vont
permettre de **créer un nouveau “patch”** qui va être chiffré par
CryptPad et envoyé aux autres utilisateurs et stocké dans la base de
données.

Lors de la **réception d’un patch** en temps-réel d’un autre
utilisateur, ChainPad va essayer de l’intégrer au document courant. Si
des modifications non-sauvegardées (patch pas encore créé) sont en cours
par l’utilisateur actuel, ChainPad va d’abord fusionner les changements
locaux avec le patch distant avant d’insérer le contenu à jour dans
l’interface. Cette fusion permet aux utilisateurs de pouvoir effectuer
de nombreuses modifications en simultané sans perdre de caractères dans
le contenu.

ChainPad possède aussi des outils permettant de **gérer les conflits**.
Il connaît l’ordre des patchs grâce au parent mais, à cause du temps
nécessaire pour que les autres utilisateurs reçoivent un message, cela
n’empêche pas que deux patchs soient envoyés en même temps par deux
utilisateurs différents. Ces 2 patchs auront le même “patch” parent et
vont donc créer une “branche” dans l’arborescence des patchs. Comme les
patchs sont chiffrés, le serveur ne peut décider par lui-même comment
résoudre ces conflits, c’est donc ChainPad qui va devoir s’en occuper
dans le navigateur de chaque utilisateur. Il faut alors s’assurer que le
résultat obtenu en “fusionnant” ces 2 patchs soient identiques chez tous
les clients. Pour cela, ChainPad se base notamment sur l’ordre des
messages reçus par le serveur. Deux patchs peuvent avoir le même parent
mais cela n’empêche pas que l’un des deux arrivera forcément en premier
au niveau du serveur. La technologie WebSocket garantit que les messages
transmis par le serveur aux différents clients arrivent dans l’ordre
dans lequel le serveur les a envoyés. Les ChainPad de tous les
utilisateurs connaissent donc les patchs ayant le même parent et l’ordre
dans lequel les traiter, ce qui est suffisant pour obtenir le même
résultat partout.

Tous ces systèmes sont gérés automatiquement en interne, mais il est
important de les connaître un minimum afin de pouvoir utiliser ChainPad
de manière optimale. Les intéractions entre CryptPad et ChainPad sont
résumées en :

-  Fournir des patchs distants à ChainPad
-  Indiquer à ChainPad tous les changements effectués localement
-  Recevoir de ChainPad des patchs liés aux changements locaux
-  Récupérer l’état actuel du document ChainPad

   -  État commun à tous les utilisateurs, appelé “authDoc”
   -  État local (pas encore sauvé/envoyé), appelé “userDoc”

Checkpoints
-----------

Afin de ne pas avoir à synchroniser l’historique complet du document
depuis sa création à chaque chargement d’un document collaboratif,
ChainPad utilise un système de “checkpoints”. Tous les 50 patchs stockés
dans la base de données, l’utilisateur créant le patch va en réalité
créer un patch spécial appelé “checkpoint”. Ce patch est défini par une
unique opération qui efface tout le document et le réinsère en même
temps. Les checkpoints ont la particularité de pouvoir être utilisés
comme points de départ pour le système. Les checkpoints ont également un
marquage spécial ajouté après le chiffrement qui permet au serveur de
les identifier comme tel.

Lorsqu’un utilisateur charge un document existant et demande
l’historique, le serveur va ainsi uniquement envoyer tous les patchs en
partant de l’avant-dernier checkpoint (en théorie le dernier checkpoint
est suffisant, mais l’avant-dernier permet de résoudre plus facilement
certains problèmes). Ce système permet donc de gagner significativement
en temps de chargement pour les documents qui sont fortement utilisés
sur le long terme. Il permet également aux propriétaires des pads de
pouvoir supprimer l’historique ancien en ne gardant dans la base de
données que les messages à partir des 2 derniers checkpoints.

ChainPad avec des objets
------------------------

Comme indiqué précédemment, ChainPad fonctionne à la base sur des
documents texte. Cela signifie que les seules opérations qu’il peut
effectuer concerne l’ajout ou la suppression de caractères à une
position donnée par rapport au début du document. Il ne peut donc pas
travailler avec des objets ou des arrays directement, en utilisant par
exemple une opération demandant de changer le 3ème élément d’un Array.

Dans CryptPad, beaucoup d’applications nécessitent toutefois de
travailler avec des objets ou des arrays. Dans l’application “code”,
cela permet notamment de stocker le titre du document et son contenu en
même temps. Dans le drive, cela est plus flagrant car la structure même
du drive avec son organisation en dossiers peut être facilement
représentée sous forme d’arbre dans un objet JavaScript.

Une **solution basique** consisterait à dire qu’il suffit de travailler
dans ChainPad avec la représentation en chaine de caractères de l’objet
(avec ``JSON.stringify``) et de retransformer en objet une fois le
travail de ChainPad effectué (avec ``JSON.parse``). Le problème avec ce
genre de solution est que la gestion des conflits risque de détruire le
document !

Exemple : Le document est un array sous forme de chaîne
``[\"a\",\"b\",\"c\"]``. Un 1er utilisateur veut supprimer le 3ème
élement de l’array et un 2nd utilisateur veut remplacer cet élément par
“d”. Le premier patch va indiquer de supprimer ``,\"c\"`` et le second
de supprimer ``c`` et d’ajouter ``d``. Les deux opérations sont
incompatibles en tant qu’Array, mais en texte un résultat est évident,
il s’agit de supprimer tout ce qui a été supprimé par le premier
utilisateur et d’ajouter ``d`` à la place car les deux utilisateurs sont
d’accord pour supprimer ``c``. Le résultat final serait alors
``[\"a\",\"b\"d]``, ce qui ne pourrait plus être retransformer en array
avec ``JSON.parse``.

Pour résoudre ce problème, il est possible de fournir à une instance de
ChainPad (lors de son initialisation) un **algorithme spécifique pour
gérer les conflits**, ainsi qu’un **algorithme pour valider un patch**.
Lorsque l’on souhaite travailler avec un objet, pour qu’un patch soit
valide il faut que ``JSON.parse()`` ne génère pas d’erreur. Si ce n’est
pas le cas, le patch est tout simplement ignoré. De la même manière, un
algorithme de gestion des conflits spécifique a été créé pour travailler
avec des objets ou des arrays. Cet algorithme s’assurerait que l’exemple
précédent fournisse soit ``[\"a\",\"b\"]`` ou soit
``[\"a\",\"b\",\"d\"]`` afin de garder un résultat valide.

Chaque instance de ChainPad ne travaille qu’avec un seul document et il
convient donc de l’initialiser avec les bons algorithmes.

Chainpad-netflux
----------------

ChainPad permet donc de gérer des patchs, que ce soit pour les intégrer
au document local ou pour générer des patchs depuis le document local.
Pour fonctionner complètement dans un système temps-réel, il manque
alors la partie qui va chiffrer ces patchs, et surtout la partie qui va
communiquer avec le serveur pour transmettre ces patchs aux autres
utilisateurs. Pour cela, une librairie
`chainpad-netflux <https://github.com/xwiki-labs/chainpad-netflux/>`__ a
été créée.

Ce guide explique le protocole Netflux utilisé par CryptPad pour
communiquer avec le serveur. Une implémentation WebSocket client et
serveur a été réalisée. La librairie chainpad-netflux permet de
connecter une instance chainpad avec cette implémentation Netflux côté
client.

Chainpad-netflux est ainsi initialisée principalement avec un
“channelId” correspondant au document collaboratif souhaité, un module
“crypto” contenant une fonction pour chiffrer et une fonction pour
déchiffrer qui utilisent les clés correspondant au document souhaité, et
une adresse pour se connecter au serveur. Beaucoup d’autres options sont
possibles ou requises, elles sont détaillées sur la page Github de la
librairie et dans le code.

Cette librairie va alors automatiquement initialiser la connexion
Websocket avec le serveur. Elle va ensuite :

-  Rejoindre le “salon” correspondant au document souhaité (avec le
   channelId fourni)
-  Créer une instance ChainPad
-  Demander l’historique au serveur
-  Déchiffrer les messages de l’historique
-  Remplir ChainPad avec l’historique déchiffré

Les autres champs de configuration de chainpad-netflux permettent alors
d’intéragir avec l’instance chainpad et d’écouter des évènements
spécifiques. Chainpad-netflux envoie ainsi des évènements dés que des
patchs distants sont reçus, lors de changements dans la liste
d’utilisateurs ou lors d’une déconnexion au réseau. Elle donne accès à
l’instance ChainPad qui permet de récupérer l’état actuel du document et
d’indiquer tout changement effectué au document. Dés que ChainPad génère
un patch, celui-ci est chiffré par la librairie et envoyé au serveur
automatiquement.

Listmap
-------

Un cas d’utilisation de ChainPad qui est souvent utilisé dans CryptPad
correspond à la collaboration sur des données stockées dans un objet
JavaScript. Une librairie
`chainpad-listmap <https://github.com/xwiki-labs/chainpad-listmap/>`__ a
ainsi été développée pour répondre à ce besoin de manière très simple.
Celle-ci est basée sur l’utilisation de “Proxy” JavaScript.

Les “Proxy” sont une extension des objets et arrays classiques de
JavaScript qui permettent notamment d’écouter tous les changements
effectués sur l’objet (ajout, suppression ou modification d’un élément).
On peut en particulier exécuter du code à chaque changement effectué, ce
qui permet dans notre cas de lier notre Proxy à une instance ChainPad.
Chaque changement effectué sur l’objet va ainsi être rapporté à
ChainPad, qui va analyser les différences par rapport à la version
précédente et créer un patch.

Cette librairie intègre donc chainpad-netflux, détaillée précédemment,
qui permet d’obtenir une instance chainpad directement connectée au
serveur et qui gère le chiffrement. Pour utiliser chainpad-listmap, il
faut donc fournir une configuration similaire à celle de
chainpad-netflux : un “channelId” pour le document a récupérer, des
fonctions de chiffrement/déchiffrement pour le document et une adresse
de connexion au serveur. chainpad-listmap retourne alors directement un
Proxy. Le Proxy peut être utilisé comme n’importe quel objet JavaScript
et changer son contenu de n’importe quelle manière va automatiquement
propager ces changements aux autres utilisateurs. Des évènements sont
déclenchés sur cet objets afin de prévenir le code utilisant la
librairie de divers éléments : “ready” quand l’historique est
synchronisé, “change” quand un élément est ajouté ou modifié, “remove”
quand un élément est supprimé ainsi que “disconnect” et “reconnect” pour
les problèmes du réseau.

**Chainpad-listmap permet donc d’initialiser un objet JavaScript
synchronisé entre plusieurs utilisateurs.**

.. note:: Le **compte utilisateur** (contenant le drive), les **dossiers partagés** et les **équipes** sont tous utilisés et stockés sous forme de document chainpad-listmap.

