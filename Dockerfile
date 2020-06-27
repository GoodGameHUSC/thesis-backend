FROM node:12 as build
LABEL stage=builder
WORKDIR /app
COPY package.json index.js ./
RUN npm install

FROM node:12-alpine

COPY --from=build /app /
EXPOSE 3001
CMD ["npm", "start"]
