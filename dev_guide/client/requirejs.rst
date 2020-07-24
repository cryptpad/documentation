RequireJS
=========

CryptPad charge le code JavaScript du client via RequireJS. Cet outil
permet à chaque fichier JavaScript de charger ses dépendances avant
d’être exécuté. C’est un outil vieillissant qui est toutefois adapté au
fonctionnement “sans build” de CryptPad.

Des guides très complets peuvent être trouvés sur l’utilisation de
RequireJS, seuls quelques points importants seront donc abordés ici.

Utilisation
-----------

RequireJS peut être utilisé de 2 manières différentes. Il est possible
de charger du code JavaScript et il est possible de créer un “module”
RequireJS qui peut être chargé pas d’autres parties.

Un module RequireJS peut être créé grâce à la fonction ``define``
disponible de manière globale une fois RequireJS chargé. C’est le cas de
la plupart des fichiers JavaScript de CryptPad qui sont créés en tant
que module afin de pouvoir être chargés ailleurs. ``define`` prend une
liste de dépendances en 1er argument, et un callback avec chaque
dépendance disponible comme second argument. Une fois toutes les
dépendances chargées, le callback est appelé. ``define`` ne peut être
utilisée qu’une seule fois par fichier JavaScript, et elle doit être
appelée de manière synchrone par rapport au fichier lui-même. Cette
fonction englobe tout le fichier et s’utilise de la manière suivante :

.. code:: javascript

   define([
     'jquery',
     '/common/common-interface.js' // dependency
   ], function (jQuery, Interface) {

     // All your code here
     var div = jQuery('<div>');
     div.text("Hello world");
     
     // Create a modal containing our div
     var modal = Interface.dialog.customModal(div);
     
     
     // Open the modal
     var open = function () {
       Interface.openCustomModal(modal);
     };
     
     return {
       openModal: open
     };
   });

Le 2ème fonctionnement de RequireJS permet de charger du code ou un
module depuis n’importe où dans le code. Il s’utilise avec la fonction
``require`` disponible également de manière globale, qui s’utilise de la
même manière que ``define``, mais avec la particularité de pouvoir être
utilisée n’importe où dans le code. Elle peut être utilisée plusieurs
fois dans un fichier et de manière asynchrone si nécessaire et ne pemret
donc pas de créer de module.

Lorsqu’un module est créé avec ``define``, il peut être chargé avec
``define`` ou ``require`` dans le reste du code. L’objet récupéré
lorsque ce module est chargé correspond à la valeur retournée par le
callback définissant le module. Dans l’exemple précédent, la méthode
``openModal`` est disponible. Un module peut retourner n’importe quel
type de données, un objet, un Array ou même une fonction directement.

Il est possible de charger n’importe quel fichier JavaScript avec les 2
méthodes, même si ce fichier ne représente pas un module RequireJS. Ce
fichier est alors exécuté directement et ne fournit rien d’exploitable
dans le callback. Certaines librairies utilisées dans CryptPad ne sont
pas définies en tant que module mais exportent à la place leur code dans
l’objet ``window`` directement, qui est partagé entre tous les modules.

Cache
-----

RequireJS possède un cache interne qui permet de ne charger chaque
fichier qu’une seule fois. Un module “chargé” à plusieurs endroits du
code de CryptPad ne sera donc exécuté qu’une seule fois et **le même
objet de retour** sera fourni à tous les ``require`` ou ``define`` en
ayant besoin. Cela permet de gagner des ressources réseau, mémoire et
processeur mais il est important de se souvenir que les valeurs de
retour sont partagées. Si deux parties du code font appel au même
fichier “interface.js” et que l’une d’elles modifie la fonction
“Interface.openModal” obtenue, cette fonction sera aussi modifiée pour
la seconde partie.

Config
------

Une fois chargé, RequireJS est disponible de manière globale dans la
fenêtre. Il suffit donc de le charger une fois par “niveau” dans
CryptPad (inner, outer et worker). Des paramètres de configuration
peuvent lui être fourni afin d’effectuer certains réglages. Dans
CryptPad, la configuration fournie à RequireJS doit l’être dans les
différents niveaux du code client, et cette configuration est donc
disponible dans un fichier ``www/common/requireconfig.js``.

Tout d’abord, les fichiers chargés avec RequireJS dans CryptPad
utilisent tous un chemin relatif. Une option ``baseUrl`` de la
configuration force le chargement de tous les fichiers (avec un chemin
relatif) sur le domaine principal (appelé “unsafe”) afin de profiter du
cache du navigateur. L’objectif est de ne pas charger les fichiers
communs aux différents niveaux de CryptPad 2 fois : sur le domaine
“unsafe” et sur le domaine “safe”. L’origine du fichier n’a pas d’impact
sur la sécurité du code puisque, dans l’iframe “inner”, ils seront
**exécutés dans le contexte “safe”**.

Toujours en rapport avec le cache, une option ``urlArgs`` permet
d’ajouter un suffixe d’arguments à l’URL des fichiers chargés. Cette
option nous permet alors d’ajouter la version de CryptPad dans l’URL de
chaque fichier, ce qui nous assure que le fichier sera à nouveau
téléchargé du serveur lors d’une mise à jour du code et non pas récupéré
dans le cache du navigateur. Par exemple, écrire
``/common/common-interface.js`` dans la liste des dépendances revient
donc à charger le fichier
``https://cryptpad.fr/common/common-interface.js?ver=3.20.0``. Le numéro
de version à ajouter ici est fourni par le serveur et c’est ce qui
permet le fonctionnement du serveur en mode “développeur” où aucun
fichier n’est récupéré depuis un cache.

D’autres options sont disponibles comme le délai de “timeout” si un
fichier n’arrive pas à être chargé ou des “raccourcis” pour des modules
particuliers comme jQuery (qui est chargé avec “jquery” au lieu du
chemin de son fichier .js). Le détail peut être obtenu dans le fichier
de configuration de CryptPad ainsi que la `documentation
RequireJS <https://requirejs.org/>`__.

RequireCSS, RequireLess
-----------------------

RequireJS existe à la base pour charger le code JavaScript. Des
extensions sont toutefois disponibles pour charger d’autres types de
code. Dans CryptPad, il est ainsi possible de charger des fichiers CSS
et des fichiers LESS directement avec RequireJS. Les fichiers CSS sont
simplement ajoutés à la page dans une balise ``<style>`` et fonctionnent
avec le cache natif du navigateur. Les fichiers LESS utilisent un
système personnalisé pour CryptPad et plus complexe. Ils sont d’abord
compilés en CSS grâce à un moteur LESS complet. Le CSS obtenu est
également injecté dans la page avec une balise ``<style>`` mais il est
aussi stocké dans le localStorage du domaine principal (“unsafe”).
Stocker le CSS compilé dans le localStorage permet de n’avoir à le
compiler qu’une seule fois par version de CryptPad. Tant que la version
reste la même, le résultat est récupéré directement du localStorage si
disponible.

