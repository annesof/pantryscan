FROM arm64v8/alpine AS build-deps

COPY ./repositories /etc/apk/repositories

RUN apk add --no-cache tini yarn nodejs g++ make python2

WORKDIR /app

COPY . .

RUN rm package.json

RUN echo "test"

COPY .yarnrc .yarnrc

COPY .npmrc .npmrc

RUN yarn

COPY package.json package.json 

RUN yarn

RUN yarn build



FROM arm64v8/nginx

COPY --from=build-deps /app/build /usr/share/nginx/html


COPY certificate.crt /etc/ssl/certificate.crt

COPY certificate.key /etc/ssl/certificate.key

COPY default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
