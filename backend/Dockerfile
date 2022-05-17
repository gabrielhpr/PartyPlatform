FROM node:16

WORKDIR /usr/app
COPY nodemon.json package.json yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 5000
CMD ["yarn", "dev"]