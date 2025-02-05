FROM node:alpine
WORKDIR /usr/src/openapi-ng-gen
COPY . /usr/src/openapi-ng-gen/
RUN npm install
RUN npm run release
ENTRYPOINT [ "node", "/usr/src/openapi-ngr/bin/index.js" ]
CMD "--help"
