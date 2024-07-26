# User Services Documentation

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Postgresql
- Object Relational Mapping (ORM): Sequelize
- Message Broker : Rabbitmq
- Containerization: Docker

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2014.28.34.png?updatedAt=1715412537452)

## Endpoint Api

### Auth

- `POST` **/user/auth/register**: Pendaftaran pengguna baru
- `POST` **/user/auth/login**: Masuk untuk pengguna yang sudah ada
- `GET` **/user/auth/profile**: Dapatkan data pengguna yang sedang login

### User

- `GET` **/user**: Dapatkan semua data pengguna
- `GET` **/user/:username**: Dapatkan data pengguna berdasarkan nama pengguna
- `PATCH` **/user/:username**: Memperbarui data pengguna berdasarkan nama pengguna
- `DELETE` **/user/:username**: Menghapus data pengguna berdasarkan nama pengguna

### Payment Account

- `GET` **/user/payment-account**: Dapatkan semua data akun pembayaran yang dimiliki oleh pengguna yang masuk (tidak dapat melihat akun pembayaran pengguna lain)
- `GET` **/user/payment-account/:account_number**: Dapatkan detail akun pembayaran (tidak dapat melihat akun pembayaran pengguna lain)
- `GET` **/user/payment-account/check/:account_number**: Periksa detail akun pembayaran dan dapat melihat akun pembayaran pengguna lain
- `POST` **/user/payment-account**: Membuat akun pembayaran baru untuk pengguna yang saat ini masuk
- `PATCH` **/user/payment-account/:account_number**: Edit akun pembayaran pengguna berdasarkan nomor akun
- `DELETE` **/user/payment-account/:account_number**: Hapus akun pembayaran pengguna berdasarkan nomor akun

### Payment History

- `GET` **/user/payment-history/:account_number**: Dapatkan semua riwayat transaksi berdasarkan nomor akun tertentu
- `GET` **/user/payment-history/:id**: Dapatkan detail riwayat transaksi berdasarkan id tertentu

  > There is no endpoint to add history data because history data is automatically sent with rabbitmq when the transaction is successful

## Testing

Service ini menyediakan pengujian yang dapat Anda jalankan, tetapi sebelum mengujinya, pastikan Anda terlebih dahulu menjalankan seluruh aplikasi dan basis data dengan docker sebelum mengujinya.

```bash
$ npm run test
```

Ini adalah hasil tes yang saya jalankan di komputer lokal saya

![Testing result](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2016.56.50.png?updatedAt=1715421424126)

## API Documentation

Saya menyediakan dokumentasi dengan postman yang dapat Anda akses [disini](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)

Jika Anda sudah menjalankan aplikasi, Anda dapat mengaksesnya untuk membuka dokumentasi dengan swagger

```bash
$ http://localhost/user/docs
```
