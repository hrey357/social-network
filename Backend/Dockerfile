FROM node:alpine3.20

WORKDIR /app
EXPOSE ${PORT}

COPY package.json . 
COPY package-lock.json .
COPY tsconfig.json .
COPY jest.config.js .
COPY src/ /app/src

RUN npm ci
RUN chmod -R 755 /app/src 

CMD [ "sh", "-c", "npm run $SERVICE" ]