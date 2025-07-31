# Étape de développement
FROM node:18-alpine
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 3000

# Commande par défaut (développement avec nodemon)
CMD ["npm", "run", "dev"]