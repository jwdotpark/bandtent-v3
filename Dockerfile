FROM node:16-alpine3.11

WORKDIR /demo-deploy

ENV PORT 80

COPY . /bandtent-v3

RUN yarn install

CMD ["yarn", "dev"]