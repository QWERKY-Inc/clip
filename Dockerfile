FROM node:12.18-alpine
RUN apk update && apk add python make g++
ENV NODE_ENV=production
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
