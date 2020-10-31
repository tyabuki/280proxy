FROM node:14

EXPOSE 3000
WORKDIR /app
ADD . /app
RUN npm install --production

ENTRYPOINT ["npm", "start"]
