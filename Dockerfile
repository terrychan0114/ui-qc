FROM node:14.8.0-stretch-slim as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.2-alpine as prod-stage
COPY --from=build-step /app/dist/ui-qc /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]