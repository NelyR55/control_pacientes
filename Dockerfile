FROM node:18

WORKDIR /app

COPY package*.json ./

# Clean install dependencies and rebuild bcrypt
RUN npm ci && npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 5000

CMD ["npm", "start"]