# Task documentation from ConcreteAi

## Short Description

This is an assignment given to me from ConcreteAi to test my programming skills because I am applying for a job as a software engineer

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Postgresql and Mongodb
- Object Relational Mapping (ORM): Sequelize and Mongoose
- Message Broker: Rabbitmq
- Gateway: Nginx
- Containerization: Docker & Docker Compose

## Installation and usage guide

Docker is the easiest and most secure way to run these applications without any configuration issues. If you don't have Docker yet, you can download it from the official Docker site.

1. Clone this repository from GitHub

   ```bash
   $ git clone https://github.com/sarrahman-me/simple-finance.git
   ```

2. Open a terminal and navigate to the services directory containing the docker-compose.yml file

   ```bash
   $ cd /service
   ```

3. Run all applications and databases using docker

   ```bash
   $ docker-compose up
   ```

4. Make sure everything is running by trying to access the api gateway

   ```bash
   $ http://localhost
   ```

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-05-11%20at%2016.34.19.png?updatedAt=1715420092746)

## API Documentation

This application has 2 services, user-service and payment-service

If you want to get clearer documentation on each service, you can open the folder from GitHub, I have written a readme.md file for each service.

I also prepared postman documentation for all endpoints of all services [here](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)
