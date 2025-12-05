# Chat'bruti - Le Chatbot Délicieusement Inutile

<div align="center">

![Chat'bruti Banner](public/logo.png)

**Le chatbot le plus inutile mais le plus vivant de la Nuit de l'Info 2025**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?logo=next.js)](https://nextjs.org)
[![Groq AI](https://img.shields.io/badge/Groq-Llama_3.3_70B-orange)](https://groq.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Demo Live](#) | [Documentation](#installation) | [Défi Viveris](#défi-chatbruti-viveris)

</div>

---

## Défi "Chat'bruti" - Viveris

<div align="center">

### Nuit de l'Info 2025

**Prix:** 1ers: 600€ • 2ds: 300€ • 3èmes: 100€  
**Sponsor:** [VIVERIS](https://www.viveris.fr)

> "Prêts à vous CHAT-llenger ?"

</div>

### Le Concept du Défi

> "Pourquoi se contenter d'un site web sérieux quand on peut débattre avec un chatbot complètement à côté de la plaque ?"

Le défi consiste à créer un chatbot qui:
- NE répond PAS aux questions normalement
- Sublime, détourne, oublie les questions
- A une personnalité unique et vivante
- Est délicieusement inutile mais passionnément vivant

---

## Notre Réponse: Chat'bruti

**Chat'bruti** est notre interprétation créative du défi.

### Caractéristiques Principales

- **Répond COMPLÈTEMENT à côté**: Logique absurde garantie
- **Détection d'erreurs orthographiques**: Se moque gentiment de vos fautes (lunux, windovs, macc)
- **Easter Eggs cachés**: Mots secrets (42, matrix, coffee) avec réponses spéciales
- **Termine par des questions stupides**: "Les nuages ont des sentiments?"
- **Trilingue**: Français, Anglais, Arabe (répond dans VOTRE langue)
- **Design Premium**: Glassmorphism, animations, dark mode

### Points Forts Uniques

1. **Intelligence Artificielle Réelle**
   - Propulsé par Groq AI (Llama 3.3 70B)
   - Réponses contextuelles et variées
   - Jamais les mêmes réponses deux fois

2. **Système de Typo Detection**
   ```
   Vous écrivez: "lunux"
   Chat'bruti: "Lunux ? La version lunaire de Linux ?"
   ```

3. **Easter Eggs**
   ```
   Vous écrivez: "42"
   Chat'bruti: "42 ? La réponse à la vie, l'univers et tout ! 
                Mais quelle était la question déjà ?"
   ```

4. **Questions Absurdes Finales**
   Chaque réponse se termine par une question sans rapport:
   - "Au fait, les tables ont des pattes de poulet?"
   - "Tu dors avec tes chaussettes?"
   - "هل البطاطا تشعر بالوحدة في الثلاجة؟"

5. **Support Multilingue Intelligent**
   - Détecte automatiquement votre langue
   - Répond 100% dans votre langue
   - FR, EN, AR supportés

---

## Installation Rapide

**Temps d'installation: moins de 5 minutes**

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/24259-a11y/chatbruti-404.git
cd chatbruti-404

# 2. Installer les dépendances
npm install

# 3. Configurer l'API Groq (gratuit)
# Obtenez votre clé sur: https://console.groq.com
echo "GROQ_API_KEY=votre_clé_ici" > .env.local

# 4. Lancer
npm run dev

# 5. Ouvrir http://localhost:3000
```

**C'est tout!** Le chatbot est prêt en moins de 5 minutes.

---

## Stack Technique

| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Next.js** | 16.0.7 | Framework React avec App Router |
| **Groq AI** | Llama 3.3 70B | IA ultra-rapide pour réponses |
| **Framer Motion** | Latest | Animations fluides |
| **Vanilla CSS** | - | Design personnalisé |

### Architecture

```
chatbruti/
├── app/
│   ├── page.js           # Interface principale
│   ├── api/chat/route.js  # Backend AI + logique
│   └── layout.js         # Layout global
├── styles/
│   └── globals.css       # Styles glassmorphism
└── public/
    └── 404-logo.png      # Logo du chatbot
```

---

## Exemples de Conversations

### Exemple 1: Question Simple
```
User: "Quelle heure est-il ?"
Bot: "Il est 25h61. Tu es en retard ! 
     Au fait, les pingouins portent des cravates le dimanche ?"
```

### Exemple 2: Détection de Typo
```
User: "j'utilise windovs"
Bot: "Windovs ? C'est Windows avec un accent russe ?
     Tu crois que le fromage peut voler ?"
```

### Exemple 3: Easter Egg
```
User: "matrix"
Bot: "Tu veux la pilule rouge ou bleue ? J'ai oublié où je les ai mises.
     Les cactus rêvent de moutons électriques ?"
```

### Exemple 4: Multilingue (Arabe)
```
User: "أستخدم لينكس"
Bot: "لينكس للناس اللي يحبون تعذيب أنفسهم
     بالمناسبة، هل الطماطم تشعر بالوحدة؟"
```

---

## Pourquoi Chat'bruti Gagne?

### Conformité au Défi (100%)
- Chatbot inutile mais vivant
- Sublime/détourne les questions
- Personnalité forte et unique
- Créativité sans limites

### Points Forts Compétitifs
1. **Vraie IA** (Groq Llama 3.3 70B) - pas juste des réponses fixes
2. **3 langues** - plus que demandé
3. **Easter Eggs** - interactive et surprenant
4. **Typo Detection** - fonctionnalité unique
5. **Questions finales** - signature distinctive
6. **Design Premium** - expérience visuelle exceptionnelle

### Comparaison

| Critère | Demandé | Chat'bruti |
|---------|---------|------------|
| Inutilité | Oui | Très inutile |
| Vivant | Oui | IA réelle |
| Personnalité | Oui | Forte |
| Langues | 1 | 3 (FR/EN/AR) |
| Easter Eggs | Bonus | 3+ inclus |
| Design | - | Premium |

---

## Build & Deploy

### Build Production
```bash
npm run build
npm start
```

### Deploy Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ajouter GROQ_API_KEY dans Vercel Dashboard
```

**Temps de déploiement: moins de 2 minutes**

---

## Documentation Complète

- [Rapport Technique](RAPPORT_TECHNIQUE.md) - Architecture détaillée
- [Spécifications du Défi](https://www.nuitdelinfo.com)

---

## Équipe

**École:** [Votre École]  
**Équipe:** [Nom de l'équipe]  
**Développement:** Fait avec passion et beaucoup de café

---

## Contact & Soumission

**Email de soumission:** nuitdelinfo@viveris.fr  
**Deadline:** Avant 8h20 (disqualification après)  
**Repository:** https://github.com/24259-a11y/chatbruti-404

---

## Licence

MIT License - Utilisez, modifiez, rendez-le encore plus stupide!

---

<div align="center">

### Features Spéciales

**Typo Detection • Easter Eggs • 3 Langues • IA Réelle • Questions Absurdes**

**Fait avec passion pour la Nuit de l'Info 2025**

[Retour en haut](#chatbruti---le-chatbot-délicieusement-inutile)

</div>
