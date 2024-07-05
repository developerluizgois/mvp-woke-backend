# Utilizaremos uma imagem Node.js oficial como base
FROM node:22.2.0 AS builder

# Definimos o diretório de trabalho no contêiner
WORKDIR /app

# Copiamos os arquivos de configuração do NPM
COPY package*.json ./

# Instalamos as dependências, incluindo TypeScript
RUN npm install

# Copiamos o restante do código da aplicação
COPY . .

# Construímos a aplicação TypeScript
RUN npm run build

# Stage de produção
FROM node:22.2.0 AS production

WORKDIR /app

# Copiamos apenas os arquivos necessários para a produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalamos apenas as dependências de produção
RUN npm install --production

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]
