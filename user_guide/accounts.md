# Compte Utilisateur

CryptPad chiffre vos données, elles ne sont lisibles que par vous et vos collaborateurs. Pour cette raison **les administrateurs du service ne peuvent pas voir ou changer votre mot de passe**. Il est donc important de le sauvegarder dans un endroit sécurisé. 

CryptPad utilise la combinaison de votre nom d'utilsateur et de votre mot de passe pour vous identifier. Les noms d'utilisateurs ne sont pas uniques sur CryptPad, il est possible de créer plusieurs comptes avec le même nom d'utilisateur et des mots de passe différents.

## Types de comptes

Il existe trois types d'utilisateurs sur cryptpad :

### Utilisateur anonyme


Les utilisateurs anonymes sont identifiés par cet avatar : <i style="font-size:2em" class="fa fa-user-secret"></i>

Aucune information personelle ne vous est demandée pour utiliser CryptPad de manière anonyme. La fonctionalité est cependant réduite : 

- Accès à toutes les applications.
- Collaboration et partage de documents.
- Une durée de stockage limitée à 3 mois d'inactivité (pour chaque document). 


### Utilisateur enregistré

Les utilisateurs enregistrés ont comme avatar leur photo de profil ou la première lettre de leur nom d'utilisateur.

Enregistrer un compte ne nécessite pas de données personnelles, seulement un nom d'utilisateur et un mot de passe vous sont demandés. Les fonctionnalités  sont les suivants : 

  - Accès à un espace de stockage personnel et permanent pour vos documents.
  
  - Gestion de vos documents plus complète en tant que [propriétaire]: ajout d'un [mot de passe], d'une [durée de vie] et [liste d'accès].
  
  - Organisation de vos documents en [dossiers], [dossiers partagés], en leur assignant des [mots-clés] ou en sauvegardant des [modèles]. 
  
  - Création d'[équipes] ou Drives partagés. 
  
  - Personnalisation de votre profil et ajout de contacts pour le [partage de documents] et  [tchat]. Notifications pour les interactions avec vos contacts. 


### Utilisateur abonné 

(uniquement sur cryptpad.fr)

  - Augmentation de l'espace de stockage.
  - Aide plus rapide en cas de question ou de problème.
  - Soutient au déveloplement et à la pérénité de CryptPad.
  

## Gestion du compte

### Inscription

`[screenshot: register screen FR]`

Pour vous inscrire, lisez les [avertissements] et rendez-vous sur la page [d'inscription] pour remplir les informations suivantes :

- Nom d'utilisateur : Le nom utilisé pour vous connecter sur votre compte. Il ne peut pas être changé par la suite (différent du "Nom Affiché" visible par les autres utilisateurs qui est modifiable).

- Mot de passe : Mot de passe utilisé pour vous connecter sur votre compte. Il est conseillé d'utiliser un mot de passe complexe [XXX: link to guideline?]. Le mot de passe peut être changé dans les [réglages]. 

- Conditions d'utilisation : Accepter les conditions d'utilisation du service.

Optionel : 

- Pads anonymes : Si vous avez créé des documents lors d'une session anonyme, vous pouvez les importer dans votre compte.



### Connexion

`[screenshot: login screen FR]`

Pour vous connecter sur votre compte, rendez vous sur la page de [connexion] et remplissez les informations suivantes :

- Nom d'utilisateur : Nom utilisé lors de votre inscription.

- Mot de passe : Mot de passe utilisé lors de votre inscription ou que vous avez changé dans vos paramètres.

Optionel : 

- Pads anonymes : Si vous avez créé des documents lors d'une session anonyme, vous pouvez les importer dans votre compte.



### Préférences

Les réglages de votre compte sont accessibles en cliquant sur votre avatar en haut à droite puis <i class="fa fa-gear"></i> **Préférences**.


#### <i class="fa fa-user-o"></i> Compte

Utilisateurs connectés : 

- Nom d'utilisateur : Nom utilisé lors de votre inscription. {**utilisateur connecté**}

- Clé publique de signature : Clé utilisée pour vous identifier et permettre à vos amis de vous ajouter dans leur contacts. {**utilisateur connecté**} <!-- XXX --> 

- Nom affiché : Nom affiché aux autres utilisateurs, par exemple lorsque vous collaborez sur un document. Pour modifier ce nom tapez le nouveau nom et cliquez sur `Sauver`. {**utilisateur connecté**}

- Langue : Modifie la langue d'affichage de CryptPad.

- Astuces : Rétablit les messages d'aide dans l'interface CryptPad si ceux-ci ont été fermés.

- Changer de mot de passe : Pour modifier le mot de passe de votre compte utilisateur, entrez votre mot de passe actuel et confirmez le nouveau mot de passe en la tapant deux fois. {**utilisateur connecté**}

- Suppression du compte : Supprime définitivement votre  compte et ses documents. {**utilisateur connecté**}


#### <i class="fa fa-lock"></i> Confidentialité 

- Fermer les autres sessions : Vous déconnecte de toutes les autres session où vous êtes connecté sauf celui où vous avez activer cette fonctionnalité. {**utilisateur connecté**}

- Stockage des pads dans CryptDrive : Gère si les documents que vous visitez sont automatiquement ajoutés à votre CryptDrive. Si personne n'est [propriétaire] d'un pad que vous ajoutez à votre CryptDrive, il compte alors dans votre espace de stockage. 

  - **Automatique** : sauvegarder tous les pads que vous visitez dans votre CryptDrive, sans action de votre part.
  - **Manuel (toujours demander)** : ne pas sauvergarder et afficher un message pour  sauvegarder ou non chaque document. 
  - **Manuel (ne pas demander)** : ne pas sauvegarder et ne pas afficher de message. <!-- XXX Option cachée ? -->

- Liens Sécurisés : Cette fonction est activée par défaut. Nous recommandons vivement de la laisser activée et d'utiliser le menu <i class="fa fa-shhare-alt"></i> **Partager** pour copier les liens de vos documents. Quand cette option est activée le lien dans la barre d'adresse de votre navigateur ne donne pas accès au pad si le destinataire ne l'a pas déja dans son CryptDrive. 

CryptPad inclut dans ses liens les clés permettant de déchiffrer vos pads. Toute personne ayant accès à votre historique de navigation peut potentiellement lire vos données. Cela inclut les extensions de navigateur intrusives et les navigateurs qui synchronisent votre historique entre les appareils. L'activation des "liens sécurisés" empêche les clés d'entrer dans votre historique de navigation ou d'être affichées dans votre barre d'adresse quand cela est possible. 


- Retour d'expérience : Cette otion est désactivée par défaut. CryptPad peut envoyer des retours d'expérience très limités vers le serveur, de manière à nous permettre d'améliorer l'expérience des utilisateurs. Le contenu de vos pads et les clés de déchiffrement ne seront jamais partagés avec le serveur.


#### <i class="fa fa-hdd-o"></i> CryptDrive

- Doublons des pads dont vous êtes propriétaire : Quand vous déplacez un pad dont vous êtes le propriétaire dans un dossier partagé, une copie est créée dans votre CryptDrive pour s'assurer que vous puissiez garder le contrôle de ce pad. Vous pouvez choisir de cacher ces doublons. Seules les versions partagées seront affichées, jusqu'à leur suppression, dans quels cas la version dans votre CryptDrive redeviendra visible. {**utilisateur connecté**}

- Miniatures : Pour aider à la navigation en mode [grille], CryptPad peut créer des miniatures de vos documents et les stocker dans votre navigateur. Cette option est désactivée par défaut car elle peut ralentir le navigateur si il y a un nombre important de miniatures. Il est également possible de nettoyer les miniatures existantes avec le bouton **NETTOYER*.

<!-- UNTIL HERE --> 

- Sauvegarde : Deux types de sauvegarde sont disponibles
  - **SAUVEGARDER** ne concerne uniquement les clés de votre CryptDrive, pas le contenu. Cette option permet de sauvegarder l'accès à vos documents et de les **RESTAURER** dans une autre session. 
  - **TÉLÉCHARGER MON CRYPDRIVE** sauvegarde le contenu de tous vos documents. Quand cela est possible des fichiers lisibles par d'autres logiciels sont téléchargés. Certaines applications ne produisent des fichiers qui ne sont lisibles que par CryptPad. 

- Importer : Si vous avez créé des documents lors d'une session anonyme, vous pouvez les importer dans votre CryptDrive. {**utilisateur connecté**}

- Effacer l'Historique : Économisez de l'espace de stockage en supprimant l'[historique] de votre disque et de vos notifications. Cela n'affectera pas l'historique de vos documents. Vous pouvez supprimer l'historique des pads dans leur dialogue de [propriétés].


#### <i class="fa fa-i-cursor"></i> Curseur

- Couleur du curseur : Change la couleur de votre curseur. Celle ci vous identifie dans les sessions collaboratives. Elle détermine la couleur de votre texte quand [Couleurs par auteurs] est activé dans les documents Code.

- Partager la position de mon curseur : Afficher ou cacher la position exacte de votre curseur aux autres utilisateurs

- Afficher les curseurs des autres utilisateurs (BETA) : Afficher ou cacher la position des curseurs des autres utilisateurs. 


#### <i class="fa fa-file-word-o"></i> Documents texte

- Largeur de l'éditeur de texte : Passez du mode page (par défaut) qui limite la largeur de l'éditeur de texte, au mode plein-écran qui utilise toute la largeur de l'écran.

- Vérification orthographique : Cette option vous permet d'activer la vérification orthographique dans l'éditeur de Texte. Les fautes seront soulignées et des propositions correctes seront disponibles en effectuant un clic-droit avec la touche Ctrl ou Meta enfoncée.

- Notifications de commentaires : Désactive les notifications lorsqu'un utilisateur répond à vos commentaires.

#### <i class="fa fa-file-code-o"></i> Code

- Indentation dans l'éditeur de code (nombre d'espaces) : Options qui permet de choisir le nombre d'espaces effectués quand on appuie sur la touche tabulation.

- Utiliser des tabulations au lieu d'espaces -> Ne considère plus la touche de tabulation comme une barre d'espace personnalisable.

- Fermer automatiquement les parenthèses -> Ferme automatiquement une parenthèse quand on en ouvre une.

- Taille de la police dans l'éditeur de code (px) -> Permet de régler la taille du texte dans l'éditeur de code.

- Vérification orthographique -> Cette option souligne les fautes d’orthographes et vous propose des corrections.

#### <i class="fa fa-star-o"></i> Abonnement

(uniquement sur cryptpad.fr)

- Vous redirige vers la page d'abonnement.



## Support

Les tickets de support permettent de communiquer de manière séecurisée avec les administrateurs de votre instance. Accédez à la page **Support** depuis votre avatar (en haut à droite) puis <i class="fa fa-life-ring"></i> **Support**. 

### <i class="fa fa-envelope-o"></i> Tickets Existants

Suivi de vos tickets en cours. Vous pouvez **Répondre** à un ticket, le **Fermer** si votre problème est résolu, et **Supprimer** les tickets fermés. 

### <i class="fa fa-life-ring"></i> Nouveau Ticket

Envoi d'un nouveau ticket. Renseignez un titre et le détail de votre problème ou question dans les champs prévus à cet effet puis cliquez sur **Envoyer**. 


## Notifications
{**utilisateur connecté**}

CryptPad vous notifie lorsque vos contacts interagissent avec vous. Vos notifications sont affichées par la cloche <i class="fa fa-bell-o"></i> à coté de votre avatar (en haut à droite). Si vous avez des notifiactions non lues, la cloche est pleine <i class="fa fa-bell"></i> et un compte est affiché. 

Vous pouvez consulter vos notifications non lues dans le menu déroulant en cliquant sur la cloche <i class="fa fa-bell"></i>.

Cliquez sur <i class="fa fa-times"></i> pour supprimer une notification.

<i class="fa fa-bell-o"></i> Cloche > **Ouvrir le panneau de notifications** permet de consulter toutes les notifications et l'historique des notifications recues. 

La corbeille <i class="fa fa-trash"></i> supprime l'ensemble des notifications d'un certain type (*Demandes de contact* ou *Partagé avec moi*)
<!--- XXX Does the trash delete notifications or "hide" them and they are still in the history? --->


<!--- 

excluding accounts from the docs for now as it not part of the platform

## Abonnement

- <i class="fa fa-times"></i> -> Supprime l'abonnement actuel définitivement. {**utilisateur connecté**}

- Montrer uniquement les abonnements actifs -> Cache vos abonnement qui ne sont plus à jours. {**utilisateur connecté**}

- {**Obligatoire**} Clé du bénéficiaire -> Clé publique de votre contact à mettre afin qu'il reçoive votre abonnement, il peut le copier dans son profil. {**utilisateur connecté**}

- {**Optionnels**} Message (optionnel) -> Message que vous pouvez adresser à votre contact au moment de l'envoie de son abonnement. {**utilisateur connecté**}

- Apparaître dans la liste des contributeurs -> Fait apparaître votre nom dans la liste des personnes ayant fait un don à CryptPad.

- {**Optionnels**} Ajouté un message personnalisé -> Permet d'envoyer un message pour l'équipe de CryptPad :)

--->
