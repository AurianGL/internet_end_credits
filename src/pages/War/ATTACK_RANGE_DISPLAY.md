# Affichage de la Portée d'Attaque

## 🎯 **Nouvelle Fonctionnalité Ajoutée**

Pendant la **Phase de Combat**, lorsqu'une unité est sélectionnée, sa portée d'attaque complète est maintenant visualisée sur le plateau de jeu.

## 🎨 **Code Couleur Visuel**

### **Couleurs d'Indication sur le Plateau**

| Couleur | Code | Signification | Utilisation |
|---------|------|---------------|-------------|
| 🟡 **Jaune Clair** | `bg-yellow-200` | **Zone de portée** | Toutes les cases dans la portée d'attaque de l'unité |
| 🔴 **Rouge Vif** | `bg-red-400` | **Cible attaquable** | Unités ennemies à portée pouvant être attaquées |
| 🟠 **Orange** | `bg-orange-300` | **Ennemi hors portée** | Unités ennemies présentes mais hors de portée |
| ⚫ **Gris** | `bg-gray-300` | **Cases inutiles** | Cases vides hors de portée (aucune action possible) |

### **Légende Interactive**

Une légende apparaît automatiquement en haut du plateau pendant la phase de combat, montrant :
- 🟡 **Portée** : Zone d'attaque de l'unité
- 🔴 **Cible** : Ennemis attaquables  
- 🟠 **Hors portée** : Ennemis non attaquables

## ⚔️ **Portées d'Attaque par Type d'Unité**

| Type d'Unité | Symbole | Portée | Description |
|--------------|---------|---------|-------------|
| **Infanterie** | ♟ | **1 case** | Combat rapproché uniquement |
| **Cavalerie** | ♞ | **1 case** | Charge au corps à corps |
| **Artillerie** | ♜ | **3 cases** | Tir à distance - portée étendue |
| **Général** | ♔ | **1 case** | Combat de commandement |
| **Drapeau** | ⚑ | **0 case** | Aucune capacité d'attaque |

## 🎮 **Comment Utiliser cette Fonctionnalité**

### **Étape 1 : Sélection d'Unité en Phase Combat**
1. Assurez-vous d'être en **Phase de Combat** (indicateur rouge ⚔️)
2. Cliquez sur une de vos unités pour la sélectionner
3. La portée d'attaque s'affiche automatiquement

### **Étape 2 : Lecture du Plateau**
- **Zone jaune** = Toute la zone de danger de votre unité
- **Cases rouges** = Cibles ennemies que vous pouvez attaquer
- **Cases orange** = Ennemis visibles mais hors de portée
- **Cases grises** = Zones sans intérêt tactique

### **Étape 3 : Planification Tactique**
- Visualisez votre **zone de contrôle**
- Identifiez les **cibles prioritaires** (rouge)
- Anticipez les **menaces futures** (orange)
- Planifiez vos **mouvements futurs**

## 📊 **Avantages Tactiques**

### **Pour la Planification**
- **Vision claire** de votre zone d'influence
- **Identification immédiate** des cibles disponibles
- **Anticipation** des mouvements ennemis nécessaires
- **Optimisation** du positionnement tactique

### **Pour l'Apprentissage**
- **Compréhension** des capacités de chaque unité
- **Mémorisation** des portées d'attaque
- **Développement** de l'intuition tactique
- **Réduction** des erreurs de débutant

## 🔄 **Intégration avec les Phases**

### **Phase Mouvement**
- Aucun affichage de portée d'attaque
- Focus sur les déplacements possibles (vert)
- Cases ennemies marquées comme interdites (orange)

### **Phase Combat**
- **Affichage complet** de la portée d'attaque
- **Distinction claire** entre cibles et zones de contrôle
- **Légende interactive** pour guidance

### **Phase Fin**
- Aucun affichage spécial
- Focus sur les contrôles de fin de tour

## 💡 **Conseils Tactiques**

### **Utilisation de l'Artillerie**
- **Portée de 3 cases** = zone de contrôle étendue
- Positionnez-vous pour **couvrir plusieurs cibles**
- Utilisez la **portée supérieure** pour harceler

### **Combat d'Infanterie/Cavalerie**
- **Portée de 1 case** = combat rapproché
- Nécessite un **positionnement précis**
- Planifiez vos **mouvements d'approche**

### **Protection du Drapeau**
- **Aucune portée d'attaque** = très vulnérable
- Maintenez toujours une **protection rapprochée**
- Évitez l'**exposition directe**

## 🎯 **Impact sur le Gameplay**

Cette fonctionnalité transforme la phase de combat en offrant :
- **Clarté tactique** immédiate
- **Prise de décision** plus rapide
- **Apprentissage** accéléré des mécaniques
- **Expérience** plus fluide et intuitive

**L'affichage de la portée d'attaque rend le jeu plus accessible tout en préservant sa profondeur tactique !** ⚔️🎯 