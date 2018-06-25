
![db](https://d1qb2nb5cznatu.cloudfront.net/startups/i/1170778-c5d7234dec3f20cd7f8c9a806ad31bd2-medium_jpg.jpg)

### FreightHub Software Code Challenge

Orginal link: https://github.com/freight-hub/freighthub-code-challenge

### About project

Database design:
![db](http://svgur.com/i/77s.svg)

My OS: Ubuntu
Node version: 10.4.0

#Installation:

First add .env file in root and set this env variables inside:

```
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=test123
MYSQL_DATABASE=scrape

MYSQL_HOST_TEST=localhost
MYSQL_PORT_TEST=3306
MYSQL_USER_TEST=root
MYSQL_PASSWORD_TEST=test123
MYSQL_DATABASE_TEST=scrape-test
```

It is necessary to have 2 databases created scrape and scrape-test

Run `npm install`

For dev mode:
`npm run dev`

For production:
`npm start`

### Usage

It has API route which can be used to schedule new website scraping:

```
POST http://localhost:3000/api/schedule/commands/add
body:
{
 "time": "* * * * * *",
 "active": true,
 "urls": ["https://facebook.com", "https://google.com"]
}
```
I used this lib: https://github.com/kelektiv/node-cron for cron jobs, so you can check there what values you can put inside "time" body value.

Also each time after reruning application saved schedules will run. Evrything will be logged and in console you will be able to see next dates for particuler website scraping.


Used domain driven design(DDD). Maybe it is over engineered because it is not big project but there was also option to use MVC for this.

Also there are few other design patterns like: module pattern, repository patterns, factory pattern, singleton pattern and followed SOLID, DRY and KISS principles.

## Grading Criteria

1. Does your app do the bare minimum described?

Yes.

1. Is your app production-ready? (deployable, has logging, stats tracking, reasonable build processes)

deployable: 
Yes.
linting, testing, complexity and circular showing no errors.
But it still need Docker file for circleci.

has logging, stats tracking:
Yes.
I used winston logger to log thing in console and inside file error.log and combined.log which will be generated.

reasonable build processes:
Yes.
It builds fast.

1. Are there good tests?

Yes. I used dependency inversion principle from SOLID to make app easy to test.

1. How are you saving the artifacts from polling a web request?

To MySQL database, used typeorm driver, anyway I think it is better to use NoSQL db for this.

1. How are you requesting website endpoints?

Axios pkg and sending http request to sites.

1. How do you deal with failures?

Everything is logged and if server crash it is possible to rerun instance, if you mean on that type of failures.

1. Does it scale?

There is also multiple types of scalability, but I assume you think on application itself.
It can scale well it is possible to run multiple instnces of app, if it is not enough you can add clustering and fork cron porcess and if it also not enough you can extract task and cron in separate microservice(use some message brocker(rabbitmq) to communicate between or some microservice framework)

1. How maintainable is the code?

Very good, SOLID principles used. It is easy to extend software as I follwed Open/Close and Liskov substitution principle. It is possible to perform diffrent task in one cronjob run and also it is easy to add new task with creating just new class(for example you can extend current task with new class which will take just title of sites and add it to cron or you can add totally diffrent task). DI used as well so abstraction is created, it means each part in software can be replaced easily.

1. How readable is the code?

It is readable as well single responsibility principle followed. When you look into src/presentation/schedule-website-scrape.controller.ts
it is easy to understand the flow.

1. Write a description explaining the direction you took and document your
   deliberate choices so a reviewer can understand your decisions.

Explained above.

1. How does your application receive criteria for web requests?

It get source code which I serialize with one package and then send it to dababase.

1. Do you use TypeScript correctly?

Yes.

1. What packages do you use? Why?

cron -> to schedule cron job
express -> as web server
inversify-express-utils -> to have cool decorators with express
@momothepug/tsmodule-alias -> for alies so I can have imports like this import { Website } from '@domain/task'; in node
mocha, chai, nyc -> for testing
mysql, typeorm -> for database
joi -> for validation
sanitize-html -> to escape html tags when saving sc to db
winston -> for logging
inversify -> Support SOLID, have composition over inheritance, dependency inversion...
axios -> http request
dotenv -> for loading env variables in dev env
nodemon, ts-node -> to run app in dev

