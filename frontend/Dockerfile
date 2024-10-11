# First stage: build the frontend application
FROM node AS builder

WORKDIR /app

COPY package*.json ./

# Vite는 package.json에 이미 명시되어 있으므로 따로 설치할 필요 없음
RUN npm install

COPY . .

# 빌드 단계에서 오류 발생 시 로그가 나올 수 있게 설정
RUN npm run build

# Second stage: serve the application with nginx
FROM nginx:alpine

EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /app/dist  /usr/share/nginx/html

