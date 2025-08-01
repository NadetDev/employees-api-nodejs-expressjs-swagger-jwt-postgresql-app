# Employee API

API RESTful complète pour la gestion des employés avec système d'authentification.

## Fonctionnalités principales

- 🛡️ Authentification JWT sécurisée
- 👥 CRUD complet pour les employés
- 📚 Documentation API avec Swagger UI
- 🐳 Prêt pour le déploiement avec Docker
- 🔒 Validation des données et gestion des erreurs
- 🏗️ Architecture modulaire et maintenable

## Technologies utilisées

- **Backend**: Node.js, Express
- **Base de données**: PostgreSQL
- **Authentification**: JWT, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Conteneurisation**: Docker

## Configuration rapide

### 1. Avec Docker (recommandé)

```bash
# 1. Copier le fichier d'environnement
cp .env.example .env

# 2. Modifier les variables dans .env
nano .env

# 3. Démarrer les services
docker-compose up -d
```

### 2. Installation manuelle

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la base de données PostgreSQL
# (Créer la base de données selon vos paramètres .env)

# 3. Démarrer l'application
npm run dev
```

## Variables d'environnement

Créez un fichier `.env` à la racine avec ces variables :

```ini
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=employee_db
JWT_SECRET=votre_secret_jwt
JWT_EXPIRE=30d
ADMIN_ROLE=admin
USER_ROLE=user
```

## Structure du code

```
k8s/
├── app/
│   ├── deployment.yaml          # Config mise à jour avec probes
│   └── service.yaml             # NodePort 3000-32767
├── postgres/
│   ├── deployment.yaml          # PVC intégré
│   └── service.yaml             # Service "postgres"
├── secrets/
│   ├── db-secrets.yaml          # Secrets encodés en base64
│   └── pvc.yaml                 # Volume persistant 5Gi
└── ingress.yaml                 # Rules pour /api et /api-docs
│                
src/
├── config/        # Configuration
│   ├── db.js      # Connexion DB
│   └── swagger.js # Documentation API
├── controllers/   # Contrôleurs
├── middlewares/   # Middlewares
├── models/        # Modèles DB
├── routes/        # Routes
├── utils/         # Utilitaires
│   ├── apiResponse.js # Réponses standardisées
│   └── ErrorResponse.js # Gestion des erreurs
├── app.js         # Configuration Express
└── server.js      # Point d'entrée
```

## Utilisation

### Authentification

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "secret123",
  "role": "admin"
}
```

### Gestion des employés

```http
GET /api/employees
Authorization: Bearer [token]
```

## Documentation API

Accédez à la documentation interactive :
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur en développement |
| `docker-compose up -d` | Lance les containers |
| `docker-compose down` | Arrête les containers |
| `kubectl apply -f k8s/` | Déploie sur Kubernetes |
| `minikube service employee-api --url` | Affiche l'URL du service |

## Déploiement Kubernetes (Minikube)

```bash
# 1. Initialiser Minikube
minikube start --driver=docker
minikube addons enable ingress

# 2. Configurer l'environnement Docker
minikube docker-env | Invoke-Expression

# 3. Builder l'image
docker build -t employee-api .

# 4. Déployer
kubectl apply -f k8s/

# 5. Accéder à l'application
minikube service employee-api
```

## Workflow de développement

1. Après modifications du code :
```bash
docker build -t employee-api .
kubectl rollout restart deployment/employee-api
kubectl logs -f deployment/employee-api
```

2. Pour recréer complètement l'environnement :
```bash
kubectl delete -f k8s/
kubectl apply -f k8s/
```

## Dépannage

### Erreurs de connexion PostgreSQL
```bash
# Vérifier les logs
kubectl logs deployment/employee-api

# Tester la connexion à la DB
kubectl run pg-test --rm -it --image=postgres:17-alpine -- sh -c 'psql -h postgres -U postgres'
```

### Problèmes d'Ingress
```bash
# Réinitialiser la configuration
minikube addons disable ingress
minikube addons enable ingress
```

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
