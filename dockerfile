# Use a imagem Node.js
FROM node:14

# Criação do diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para o diretório de trabalho
COPY package.json package-lock.json ./

# Instalação das dependências usando npm
RUN npm install

# Copia todos os arquivos restantes para o diretório de trabalho
COPY . .

# Expor a porta do servidor
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]