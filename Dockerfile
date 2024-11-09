ARG NODE_ENV=production
ARG NODE_VERSION=20.11.1
ARG NODE_IMAGE_NAME=alpine
ARG CONTAINER_IMAGE=node:${NODE_VERSION}-${NODE_IMAGE_NAME}

FROM ${CONTAINER_IMAGE} as builder

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn prisma generate && yarn prisma migrate deploy && yarn build

FROM ${CONTAINER_IMAGE}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /app/node_modules/ ./node_modules
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/prisma/ ./prisma

