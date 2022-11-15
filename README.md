# About project

#### NestJS Architecture concept including
- Hexagonal - ports & adapters
- Domain Driven Design
- Event Driven Architecture
- CQRS

#### Persistence
- Postgresql
- Mongodb
- Redis

#### Message broker
- RabbitMQ

#### API
- REST 

#### Other

Error standard RFC7807 - Problem Details for HTTP APIs <br>
https://www.rfc-editor.org/rfc/rfc7807

#### What's next?
* Setup e2e test (init db, seed data, perform test) 
* Add another bounded context (another module in domain folder).
* Create integration between bounded context.
* Integration with Azure vie GitHub actions

# Installation

```bash
$ npm install

$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

