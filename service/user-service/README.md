# User Services Documentation

## Short Description

User service is an api that will handle account creation (authentication),manage user data, including managing payment accounts and transaction history

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Postgresql
- Object Relational Mapping (ORM): Sequelize
- Message Broker : Rabbitmq
- Containerization: Docker

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2014.28.34.png?updatedAt=1715412537452)

## Testing

This service provides tests that you can run, but before you test it, make sure you first run the entire application and database with docker before testing it.

```bash
$ npm run test
```

This is the test result that I ran on my local computer

![Testing result](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2016.56.50.png?updatedAt=1715421424126)

## API Documentation

I provide documentation with postman that you can access [here](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)

If you already have the app running, you can access this to open the documentation with swagger

```bash
$ http://localhost/user/docs
```
