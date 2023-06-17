# Define a imagem base
FROM node:16

# Configuração do diretório de trabalho
WORKDIR /app

# Copia os arquivos de código-fonte para o diretório de trabalho
COPY . .

COPY package.json ./

RUN npm install

# Define variáveis de ambiente

# Expõe a porta especificada para o servidor node
EXPOSE 8000

# Define o ponto de entrada do contêiner
ENTRYPOINT ["npm", "start"]

CMD ["npm", "start"]

# Define um rótulo para a imagem
LABEL version="1.0"
LABEL description="Sistema de Agendamentos - Salão na mão"