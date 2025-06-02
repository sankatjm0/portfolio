# Sử dụng image Node.js chính thức cho giai đoạn build
FROM node:20-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn frontend
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng image Nginx để phục vụ ứng dụng
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]