FROM node:14

WORKDIR /client

COPY . /client

ENV REACT_APP_API_URL=https://api-vltl.hieugiaynhuy.com
ENV REACT_APP_PORT=3004

RUN npm install

RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "3004"]