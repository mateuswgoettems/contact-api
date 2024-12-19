# ---- Base Node ----
FROM node:20-alpine3.17 AS base
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies
RUN mkdir -p src/database/
COPY src/database/schema.prisma src/database/schema.prisma
RUN yarn install --production

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm i -g @nestjs/cli
RUN yarn build

# ---- Release ----
FROM base AS release
# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=dependencies /usr/src/app/src/database/schema.prisma ./dist/database/
COPY src/database/schema.prisma ./database/schema.prisma
COPY src/database/migrations ./database/migrations

# Add user node and create necessary directories
RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /usr/src/app
USER app

CMD ["node", "dist/main"]