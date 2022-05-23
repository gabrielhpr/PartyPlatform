# our base image
FROM node:14

# User user as root
USER gabhenr

# Create App
RUN mkdir /app

RUN apt-get update && apt upgrade -y

RUN npm install -g yarn
RUN yarn add -g pm2
RUN pm2 install pm2-logrotate

#Set working directory to /app
WORKDIR /app

#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

#Copy package.json in the image
COPY package.json ./

#Install Packages
RUN yarn install 

#Copy the app
COPY . ./

#Expose application port
EXPOSE 5000

#Start the app
CMD ["ts-node", "index.ts"]

# specify the port number the container should expose
# EXPOSE 5000

# # User user as root
# USER root

# # Create App
# RUN mkdir /app

# # Update Linux Packages
# RUN apt-get update && apt upgrade -y
# #RUN apt-get install utils -y
# #RUN apt-get install mysql-server -y

# # Run update and Strongloop install
# RUN npm install -g npm
# RUN npm install -g pm2
# RUN pm2 install pm2-logrotate
