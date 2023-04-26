FROM node

WORKDIR /app

COPY package.json .

RUN npm i --legacy-peer-deps

COPY . . 

RUN npx prisma generate

USER root 

ENTRYPOINT /bin/bash -c "npm run dev"