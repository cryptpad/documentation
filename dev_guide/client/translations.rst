Utiliser les clés de traduction
===============================

L’interface de CryptPad est officiellement disponible en anglais et en
français. Elle est également traduite (intégralement ou partiellement)
par la communauté en de nombreuses autres langues, notamment en
allemand. Cette gestion des différentes langues fonctionne avec un
système de clés de traduction à utiliser dans le code. A l’exception de
quelques rares cas, aucun texte affiché à l’écran n’est écrit de manière
brut dans le code. Une clé est utilisée à la place et la texte associé à
cette clé est récupérée dans un fichier séparé. Bien qu’utilisable de
manière simple, ce système possède une structure très complexe.

Utilisation
-----------

Afin d’utiliser les clés de traduction dans une partie du code, il
suffit de charger le module “Messages” avec RequireJS. Ce module est
disponible au chemin ``/customize/messages.js`` et fonctionne
automatiquement avec la langue choisie par l’utilisateur.

Une fois le module chargé, “Messages” représente un objet contenant
toutes les clés de traduction et peut donc être utilisé dans le code
avec “Messages.cleDeTraduction” qui fera référence au texte de la clé
“cleDeTraduction” dans la langue de l’utilisateur.

Structure
---------

Un des points fondamentaux mentionné au début de ce guide concernait la
“personnalisation”. Chaque instance de CryptPad peut être personnalisée,
notamment au niveau des images, logos, styles et pages statiques. Les
clés de traduction sont également des éléments personnalisables, ce qui
rend la structure du système assez complexe.

Les clés sont d’abord créées et traduites dans des fichiers JSON obtenus
avec `Weblate <https://weblate.cryptpad.fr>`__. Ces fichiers sont
disponibles dans le dossier ``www/common/translations/``. On y trouve
par exemple ``www/common/translations/messages.json`` (version anglaise
de base) ou ``www/common/translations/messages.fr.json`` (version
française). Ces fichiers sont liés à Weblate et représentent la base des
traductions. Ils ne peuvent pas être personnalisés directement car il
serait alors très compliqué pour les administrateurs d’instance de les
maintenir à jour à chaque nouvelle version de CryptPad (la moindre clé
manquante dans les traductions peut dans certains cas rendre des
fonctionnalités inutilisable).

Afin de pouvoir ajouter une étape de personnalisation, ces fichiers sont
chargés dans des **modules de langues** présents dans le dossier
``customize.dist/translations/`` (dossier contenant tous les fichiers
pouvant être personnalisés). On y retrouve ainsi
``customize.dist/translations/messsages.js`` et
``customize.dist/translations/messages.fr.js``. Ces modules de langue
charge leur fichier JSON correspondant et permettent de l’étendre ou de
le modifier. Pour personnaliser un fichier présent dans
``customize.dist``, il suffit d’en faire une copie dans un dossier
``customize``. Dans notre cas, les administrateurs souhaitant
personnaliser les traductions peuvent donc copier ``messages.xx.js``
dans ``customize/translations/messages.js``. Ils ont alors accès à
l’objet “Messages” correspond à la langue choisie et peuvent directement
ajouter, supprimer ou modifier des clés existantes avec
``Messages.key = "Text";``.

Enfin, le fichier ``customize.dist/messages.js`` va récupérer le
**module de langue** correspondant à la langue de l’utilisateur (anglais
par défaut) et definir un module RequireJS avec cette langue. Si une
chaîne n’est pas traduite dans la langue choisie, la version anglais
sera utilisée à la place pour cette chaîne.

.. image:: /images/dev/translations.png
   :class: screenshot

