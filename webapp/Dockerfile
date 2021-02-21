# ----- Build -----

FROM node as builder

RUN mkdir -p /app/webapp

WORKDIR /app/webapp

RUN npm install
COPY . .

RUN npm rebuild node-sass --force
RUN npm run build


# ----- Run -----

FROM nginx:alpine

COPY --from=builder /app/webapp/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]