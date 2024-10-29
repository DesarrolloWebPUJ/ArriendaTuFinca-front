# Etapa de construcción
FROM node:20 AS build

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

# Elimina el archivo de configuración por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar archivos de la etapa de construcción
COPY --from=build /app/dist/arriendatufinca-front /usr/share/nginx/html

# Copiar archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/conf.d

# Exponer el puerto en el que Nginx está escuchando
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]