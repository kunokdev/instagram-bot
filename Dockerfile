FROM node:10
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn
COPY . .
RUN ["yarn", "build"]
CMD ["yarn","pm2","start","lib/index.js"]