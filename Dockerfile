# Base image
FROM node:16.15.1

# App file location
WORKDIR /opt/backend

# Install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Commnads
CMD ["npm", "start"]
