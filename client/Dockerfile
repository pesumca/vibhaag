# Build in this container
FROM node:alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package* /usr/src/app
COPY package-lock* /usr/src/app

# Set production flag so dev dependencies aren't installed
RUN npm install --production=true

COPY . /usr/src/app

# Build the production build
RUN npm build

# Start and nginx container
FROM nginx

# Set our custom nginx.conf in the container
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the react build from the build container
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Set permissions so nginx can serve it
RUN chown nginx.nginx /usr/share/nginx/html/ -R

EXPOSE 80