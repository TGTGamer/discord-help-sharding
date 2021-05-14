# Setup building container
FROM mhart/alpine-node:15.8
WORKDIR /app

# Copy source into working directory
COPY . .

# Install and build dependencies
RUN apk add --no-cache git ffmpeg
RUN yarn install --frozen-lockfile

# Install init service for signal handling
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Initalise bot
CMD ["yarn", "dev:start"]
