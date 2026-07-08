# Dossier d'images pour Joyaux Précieux 🌸

Vous pouvez ajouter toutes vos images personnalisées dans ce dossier.

### Comment ajouter vos images :
1. Faites glisser et déposez vos fichiers d'images (format `.png`, `.jpg`, `.jpeg`, ou `.svg`) directement dans ce dossier depuis l'explorateur de fichiers sur le côté gauche de votre éditeur AI Studio.

### Comment les utiliser dans le code :
Dans vos composants React (par exemple pour changer les illustrations des cibles ou d'autres sections), vous pouvez les référencer de manière très simple par rapport à la racine :

```tsx
// Exemple d'utilisation :
const illustration = "/images/mon_image.jpg";
```

*Note : Pas besoin d'inclure `/public` dans le chemin d'accès lors de l'utilisation dans le code, car Vite distribue directement le contenu du dossier public à la racine du serveur.*
