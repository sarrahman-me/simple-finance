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

## Endpoint Api

### Auth

- `POST` **/user/auth/register**: New user registration
- `POST` **/user/auth/login**: Sign in for existing users
- `GET` **/user/auth/profile**: Get the data of the currently logged in user

### User

- `GET` **/user**: Get all user data
- `GET` **/user/:username**: Get user data based on username
- `PATCH` **/user/:username**: Updating user data based on username
- `DELETE` **/user/:username**: Deleting user data based on username

### Payment Account

- `GET` **/user/payment-account**: Get all payment account data owned by the logged in user (can't see other users' payment accounts)
- `GET` **/user/payment-account/:account_number**: Get details of a payment account (can't see other users' payment accounts)
- `GET` **/user/payment-account/check/:account_number**: Check payment account details and can view other users' payment accounts
- `POST` **/user/payment-account**: Creates a new payment account for the currently logged in user
- `PATCH` **/user/payment-account/:account_number**: Edit a user's payment account by account number
- `DELETE` **/user/payment-account/:account_number**: Delete a user's payment account by account number

### Payment History

- `GET` **/user/payment-history/:account_number**: Get all transaction history based on a specific account number
- `GET` **/user/payment-history/:id**: Get details of a transaction history based on a specific id

  > There is no endpoint to add history data because history data is automatically sent with rabbitmq when the transaction is successful

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
