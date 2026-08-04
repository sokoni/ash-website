FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Expose backend API port
EXPOSE 5000

ENV PORT=5000

CMD ["node", "index.js"]
