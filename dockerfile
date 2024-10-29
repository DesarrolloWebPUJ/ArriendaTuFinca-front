# Etapa de construcción
FROM node:14 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar archivos de la etapa de construcción
COPY --from=build /app/dist/arriendatufinca-front /usr/share/nginx/html

# Exponer el puerto en el que Nginx está escuchando
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
