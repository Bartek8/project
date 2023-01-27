# Development stage
FROM node:18-slim as development

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies (clean install)
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Production stage
FROM node:18-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . . 

COPY --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]
