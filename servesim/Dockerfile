FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Create a directory for input files if it doesn't exist
RUN mkdir -p /usr/src/app/input

CMD [ "npm", "start" ]