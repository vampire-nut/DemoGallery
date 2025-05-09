ARG NODE_OPTIONS=--max-old-space-size=8192
## stage 1 install library
FROM --platform=linux/amd64 node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# COPY
COPY package.json ./
COPY yarn.lock ./

# RUN npm install
RUN npm cache clear --force
RUN npm config rm proxy
RUN npm config rm https-proxy

# RUN yarn config 
RUN yarn config set registry https://registry.yarnpkg.com/
RUN yarn config set network-timeout 5000000 -g
RUN yarn install --production --ignore-engines && yarn cache clean

# stage 2 copy node_mobiles and set environment 
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# stage 3 copy dependencies build file and deploy
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

ARG NODE_OPTIONS
ENV NODE_ENV production
ENV NODE_OPTIONS $NODE_OPTIONS

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
