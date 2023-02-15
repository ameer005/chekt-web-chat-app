FROM node:16-alpine3.16 AS deps

WORKDIR /app
COPY package.json ./
RUN npm install

# END DEPS IMAGE

FROM node:16-alpine3.16 AS BUILD_IMAGE

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

RUN rm -rf node_modules
RUN npm install --production --ignore-scripts --prefer-ofline

# This starts our application's run image - the final output of build.
FROM node:16-alpine3.16

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000

CMD [ "npm", "start" ]