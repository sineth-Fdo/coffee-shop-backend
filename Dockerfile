FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm rebuild bcrypt --build-from-source
RUN npm run build
EXPOSE 8080
CMD ["node", "./dist/index.js"]
