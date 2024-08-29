FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Create directories for input and output files
RUN mkdir -p /usr/src/app/input /usr/src/app/output

CMD [ "npm", "start" ]