FROM node:16-alpine AS build

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx:stable-alpine

# Install dependencies
RUN apk add --no-cache curl

# Set a timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build dist/ /usr/share/nginx/html/

HEALTHCHECK --interval=15s --timeout=30s --retries=50 \
  CMD curl -f localhost:80 || exit 1
