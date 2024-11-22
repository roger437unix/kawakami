# Etapa de construção
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Construa o aplicativo
RUN npm run build

# Copiar todas as figuras para dentro do diretório gerado pelo build [dist]
RUN cp -r img dist

# Etapa de produção
FROM nginx:alpine

# Copie os arquivos de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie o arquivo de configuração do Nginx, se necessário
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
