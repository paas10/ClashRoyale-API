# pull official base image
FROM node:12.18.3-alpine

# set working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]