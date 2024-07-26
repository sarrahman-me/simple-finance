# Payment Services Documentation

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Mongodb
- Object Relational Mapping (ORM): Mongoose
- Message Broker : Rabbitmq
- Containerization: Docker

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2017.31.55.png?updatedAt=1715423532432)

## Endpoint Api

### Transaction

- `POST` **/payment/send**: Kirim uang dari akun pembayaran pengguna yang masuk ke akun pembayaran terdaftar mana pun

## Dokumentasi api

Saya menyediakan dokumentasi dengan postman yang dapat Anda akses [disini](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)

Jika Anda sudah menjalankan aplikasi, Anda dapat mengaksesnya untuk membuka dokumentasi dengan swagger

```bash
$ http://localhost/payment/docs
```
