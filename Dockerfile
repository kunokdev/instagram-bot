FROM zenika/alpine-chrome:80-with-node
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DOCKER_BROWSER=true
USER root
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn
COPY . .
RUN ["yarn", "build"]
CMD ["yarn","start"]