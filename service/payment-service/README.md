# Payment Services Documentation

## Short Description

Payment services are used for core transaction purposes such as sending money from one account to another

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

- `POST` **/payment/send**: Send money from the logged in user's payment account to any registered payment account

## API Documentation

I provide documentation with postman that you can access [here](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)

If you already have the app running, you can access this to open the documentation with swagger

```bash
$ http://localhost/payment/docs
```
