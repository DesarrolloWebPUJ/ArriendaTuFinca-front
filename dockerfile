# Utiliza una imagen de Node.js como base
# FROM node:21 AS builder

# Establece el directorio de trabajo en /app
# WORKDIR /app

# Copia los archivos de la aplicación al contenedor
#COPY ./ /app

# Instala las dependencias y construye la aplicación
# RUN nvm use 18.16.1
#RUN nvm use 18.16.1
#RUN npm install
#RUN npm install -g @angular/cli
#RUN ng build



# Etapa de construcción
# Utiliza una imagen de Node.js como base para construir la aplicación
FROM node:18.19.0 AS builder

# Instalar nvm y Node.js 18.16.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install 18.16.1 \
    && nvm use 18.16.1 \
    && nvm alias default 18.16.1 \
    && node -v \
    && npm -v

# Añadir nvm al PATH para que esté disponible en futuras etapas de RUN
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.16.1
ENV NVM_BIN=$NVM_DIR/versions/node/v$NODE_VERSION/bin
ENV PATH=$NVM_BIN:$PATH

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY ./ /app

# Instalar dependencias y construir la aplicación
RUN npm install --legacy-peer-deps \
    && npm install -g @angular/cli \
    && ng build




# Usa una imagen ligera de Nginx para servir la aplicación construida prueba
# FROM nginx:alpine

# Copia los archivos construidos de la etapa anterior al directorio de trabajo de Nginx
# COPY --from=builder /app/dist/adminpro/* /usr/share/nginx/html/

# Expone el puerto 80 para acceder a la aplicación
# EXPOSE 80

# Comando para arrancar el servidor Nginx
# CMD ["nginx", "-g", "daemon off;"]

FROM httpd:2.4

# Copiar los archivos construidos de la aplicación desde la imagen de construcción
# RUN mkdir /usr/local/apache2/htdocs/facturacion
RUN mkdir /usr/local/apache2/htdocs/gescon
COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./k8s/.htaccess /usr/local/apache2/htdocs/gescon


# CMD ["restart-apache.sh"]

# COPY my-httpd.conf /usr/local/apache2/conf/httpd.conf
# RUN sed -i '/#LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
# RUN echo "Include /usr/local/apache2/conf/my_custom_config.conf" >> /usr/local/apache2/conf/httpd.conf

# COPY ./k8s/.htaccess /usr/local/apache2/htdocs/facturacion
COPY --from=builder /app/dist/arriendatufinca-front /usr/local/apache2/htdocs/gescon

# CMD ["httpd-foreground"]


EXPOSE 80

# Comando para iniciar Apache
CMD ["httpd", "-D", "FOREGROUND"]
