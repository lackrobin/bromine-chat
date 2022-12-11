FROM node:alpine as build
WORKDIR /my-project
COPY . .
RUN npm ci --development --silent

FROM node:alpine as prod
COPY ./package*.json ./
RUN npm ci --production --silent --ignore-scripts
COPY --from=build /my-project/build ./build
COPY --from=build /my-project/docker-startup.sh ./build
EXPOSE 3000
USER node
CMD [ "/bin/sh", "build/docker-startup.sh" ]