# Build Stage
FROM node:alpine3.20 AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

EXPOSE ${PORT}

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]