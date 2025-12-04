# 📄 Rapport de Projet - Chat'bruti (Nuit de l'Info 2025)

## 1. Introduction

Dans le cadre de la **Nuit de l'Info 2025**, notre équipe a relevé le défi de créer un chatbot unique en son genre. Loin des assistants virtuels serviables et polis, nous présentons **Chat'bruti**, un compagnon numérique délibérément "inutile", sarcastique et doté d'une personnalité forte.

L'objectif était de concevoir une application web interactive qui divertit l'utilisateur par ses réponses absurdes, ses moqueries gentilles (notamment sur les systèmes d'exploitation) et son interface visuelle soignée, tout en respectant les contraintes techniques du défi.

---

## 2. Conception

### Architecture Technique
Le projet repose sur une architecture moderne et performante :
- **Frontend** : Next.js (React) pour une interface utilisateur réactive et fluide.
- **Backend** : API Routes de Next.js pour gérer la logique serveur et les appels à l'IA.
- **Intelligence Artificielle** : Intégration de l'API Groq (modèle Llama 3) pour générer des réponses rapides et contextuelles.
- **Styling** : CSS pur avec une approche "Glassmorphism" pour un design premium et futuriste.

### Design et Identité Visuelle
L'identité de Chat'bruti est marquée par :
- **Thème Sombre** : Un fond "deep space" avec des gradients violets et roses.
- **Effet Glitch** : Un logo 404 animé et des éléments visuels rappelant les erreurs informatiques.
- **Glassmorphism** : Utilisation de la transparence et du flou pour créer de la profondeur.

### Persona (Personnalité du Bot)
Chat'bruti a été conçu avec des règles strictes :
- **Inutilité** : Il ne donne jamais de réponse directe ou utile.
- **Sarcasme** : Il se moque des choix de l'utilisateur (OS, questions).
- **Multilinguisme** : Il parle Français, Anglais et Arabe, en s'adaptant strictement à la langue de l'utilisateur.

---

## 3. Fonctionnement

### Flux de Données
1. **Entrée Utilisateur** : L'utilisateur tape un message dans l'interface.
2. **Traitement Backend** : La requête est envoyée à `/api/chat`.
3. **Analyse** : Le système vérifie la présence de mots-clés (ex: "Windows", "Mac", "comparer").
4. **Génération de Réponse** :
   - Si un mot-clé spécifique est détecté, une réponse scriptée ou guidée est générée.
   - Sinon, l'IA génère une réponse basée sur le `SYSTEM_PERSONA` qui impose le ton sarcastique.
5. **Affichage** : La réponse est affichée avec une animation de frappe.

### Fonctionnalités Clés
- **Détection d'OS** : Le bot demande et réagit au système d'exploitation de l'utilisateur.
- **Comparaisons** : Si l'utilisateur demande de comparer deux OS (ex: "Linux vs Mac"), le bot se moque des deux et en suggère un troisième absurde.
- **Mode "Glitch"** : Des réponses parfois cryptiques ou purement humoristiques.

---

## 4. Qualité et Test

### Stratégie de Test
Nous avons adopté une approche de test manuel rigoureuse pour valider le comportement du bot :

1. **Tests de Personnalité** : Vérification que le bot reste "inutile" et ne devient jamais serviable.
2. **Tests Multilingues** :
   - **Français** : Validation de l'humour et des références culturelles.
   - **Anglais** : Vérification de la fluidité et du sarcasme.
   - **Arabe** : Test de l'affichage RTL et de la pertinence des réponses.
3. **Tests de Robustesse** : Envoi de requêtes absurdes ou vides pour voir la réaction du bot.
4. **Tests d'Interface** : Vérification du responsive design sur mobile et desktop.

### Métriques de Qualité
- **Temps de Réponse** : < 2 secondes grâce à l'API Groq.
- **Stabilité** : Gestion des erreurs API avec des messages de fallback humoristiques ("Je suis cassé, revenez plus tard").
- **Accessibilité** : Contraste suffisant et navigation au clavier.

---

## 5. Résultats

Le projet aboutit à une application web **pleinement fonctionnelle** et déployable.

- **Engagement** : Les premiers tests montrent que les utilisateurs passent du temps à essayer de "piéger" le bot ou à découvrir ses réponses cachées.
- **Esthétique** : L'interface est jugée "premium" et immersive, contrastant avec l'inutilité du service.
- **Objectif Atteint** : Le défi de créer un chatbot "inutile mais charmant" est validé à 100%.

### Exemple d'Interaction
> **Utilisateur** : "Quelle heure est-il ?"
> **Chat'bruti** : "Il est l'heure d'acheter une montre. Je ne suis pas une horloge publique. 🕰️"

---

## 6. Conclusion

Chat'bruti est plus qu'un simple chatbot ; c'est une expérience interactive qui joue avec les attentes de l'utilisateur. En détournant les codes des assistants IA classiques, nous avons créé un projet ludique, techniquement solide et visuellement abouti pour la Nuit de l'Info 2025.

Les perspectives d'évolution incluent l'ajout d'un mode vocal (pour qu'il puisse soupirer auditivement) et une intégration plus poussée avec des API externes pour donner de fausses informations météo en temps réel.
