# Dokumentasi untuk tugas magang backend developer Dot Indonesia

## Deskripsi singkat

Ini adalah tugas sederhana untuk menggambarkan kemampuan coding untuk melamar kerja magang di dot indonesia

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Postgresql and Mongodb
- Object Relational Mapping (ORM): Sequelize and Mongoose
- Message Broker: Rabbitmq
- Gateway: Nginx
- Containerization: Docker & Docker Compose

## Instalasi dan cara penggunaan

Docker adalah cara termudah dan teraman untuk menjalankan aplikasi ini tanpa masalah konfigurasi apa pun. Jika Anda belum memiliki Docker, Anda dapat mengunduhnya dari situs resmi Docker.

1. Klon repositori ini dari GitHub

   ```bash
   git clone https://github.com/sarrahman-me/simple-finance.git
   ```

2. Buka terminal dan navigasikan ke direktori yang berisi file docker-compose.yml

   ```bash
   cd /simple-finance/service
   ```

3. Jalankan semua aplikasi dan database menggunakan docker

   ```bash
   docker-compose up
   ```

4. Pastikan semuanya berjalan dengan mencoba mengakses gateway api

   ```bash
   http://localhost
   ```

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2016.34.19.png?updatedAt=1715420092746)

## API Documentation

Aplikasi ini memiliki 2 service, service pengguna dan service pembayaran

Jika Anda ingin mendapatkan dokumentasi yang lebih jelas pada setiap service, Anda dapat membuka folder dari GitHub, saya telah menulis file readme.md untuk setiap service.

Saya juga menyiapkan dokumentasi postman untuk semua endpoint dari semua service [disini](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)
