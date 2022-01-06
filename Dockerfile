FROM node:14.16.0-alpine as build-stage

WORKDIR ./app

COPY package*.json ./

RUN npm install

RUN npm audit fix

COPY . /app

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY prod_nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]