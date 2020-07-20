chainpad-crypto
^^^^^^^^^^^^^^^

``./www/bower_components/chainpad-crypto/crypto.js``

Ce module contient toutes les fonctions permettant d'obtenir les outils
de cryptographie utilisés dans CryptPad. Il permet de ne pas avoir à
ré-utiliser TweetNaCl directement dans le code pour effectuer les mêmes
opérations à plusieurs endroits.

-  ``Crypto.createEditCryptor`` et ``Crypto.createEditCryptor2``

   -  Permet d'obtenir toutes les clés nécessaires pour l'édition d'un
      document collaboratif. Ces clés sont soient générées
      aléatoirement, soit obtenues depuis une "seed" fournie en argument
      (afin de pouvoir retrouver les clés d'un pad existant).

-  ``Crypto.createViewCryptor`` et ``Crypto.createViewCryptor2``

   -  Permet d'obtenir toutes les clés nécessaires pour la lecture d'un
      document collaboratif. On peut également fournir une "seed" pour
      retrouver des clés.

-  ``Crypto.createEncryptor``

   -  Permet d'obtenir les fonctions ``encrypt`` et ``decrypt``
      nécessaires à CryptPad pour le chiffrement des documents. Ces
      fonctions effectuent le chiffrement, la signature et la conversion
      de format. Elles ont besoin d'une chaîne en entrée et fournissent
      une chaîne chiffrée ou déchiffrée en sortie.
   -  ``createEncryptor`` a besoin d'un ensemble de clés qui peuvent
      être obtenues avec ``createEditCryptor2``

-  ``Crypto.b64AddSlashes`` et ``Crypto.b64RemoveSlashes``

   -  Le format base64 utilisé pour stocker les données chiffrées ainsi
      que les "seeds" des clés de chiffrements permet de représenter des
      fichiers en n'utilisant que les caractères alphanumériques
      **a-z**, **A-Z**, **0-9** ainsi que **/** et **+** pour obtenir un
      total de 64 caractères différents. Lorsqu'il est utilisé pour
      stocker une "seed" dans l'URL d'un pad, les **/** présents sont en
      conflit avec les **/** de l'URL. Ces fonctions permettent de
      remplacer les **/** d'une chaîne en base64 par des **-** et
      inversement.

De la même manière, des fonctions similaires existent pour chaque type
de cryptographie utilisée dans CryptPad.

-  ``Crypto.Curve.deriveKeys`` et ``Crypto.Curve.createEncryptor``

   -  Permettent respectivement de récupérer les clés nécessaires et
      d'obtenir les fonctions ``encrypt`` et ``decrypt`` dans le cas du
      chiffrement pour le chat avec les contacts

-  ``Crypto.Mailbox.createEncryptor``

   -  Permet d'obtenir les fonctions ``encrypt`` et ``decrypt``
      utilisées pour le chiffrement des mailbox (centre de notifications
      et support)

-  ``Crypto.Team.createSeed`` et ``Crypto.Team.deriveMemberKeys``

   -  Permettent respectivement de créer une seed et de récupérer les
      clés à partir d'une seed pour le chiffrement du système de droits
      dans les équipes (appelé **roster**).

-  ``Crypto.Team.createEncryptor``

   -  Permet d'obtenir les fonctions ``encrypt`` et ``decrypt``
      utilisées pour le chiffrement du roster.
