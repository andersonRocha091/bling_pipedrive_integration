# Link api challenge

This project it's an backend API for an Pipedrive and Bling integration. It was built in NodeJS 12.8, and it comes with Hapi.js, base unit test, pm2 monitoring, and the all infra-structure already dockerized for local tests.

## Pre-requirements

> - **Docker** version 19.03 or above
> - **Docker-machine** version 0.16.0, or above
> - **Docker-compose** version 1.26.0, or above
> - **Node** version 12.8, or above - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **NPM** version 6.14.4, or above- [Npm Donwload](https://www.npmjs.com/package/download)

## Installing

> Clone this project in you machine using the command below:
> ```
> 	git clone https://github.com/andersonRocha091/likapichallenge.git
> ```
> Go to the project folder at your terminal:
> ```
> 	cd linkapichallenge
> ```
> Create a .env (Settigns for mongoDB and mongocliente) file with the following params for setting your environment:
> ```
> MONGO_HOST=<mongo host>
> MONGO_PORT=<mongo port>
> MONGO_INITDB_DATABASE=<mongo database>
> MONGO_INITDB_ROOT_USERNAME=<rootunsername>
> MONGO_INITDB_ROOT_PASSWORD=<rootpassword>
> DATABASE_USER=<user>
> DATABASE_PASSWORD=<password>
> DATABASE_NAME=<databasename>
> ```
> Inside the aplication folder src/config, change the params in .env.dev, and .env.prod :
> ```
> 
> PORT=<aplication port>
> MONGODB_URL=mongodb://<user>:<password>@<host adress | localhost(dev)>:27017/revenues
> PIPEDRIVE_TOKEN=<pipedrive token>
> PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/deals
> BLING_API_TOKEN=<bling api token>
> BLING_API_URL=https://bling.com.br/Api/v2/pedido/json/
> ```
>
> In terminal, inside likapichallenge start the local infrastructure:
> ```
> docker-compose up -d --build
>
> ```
> Finally, install the dependencies:
>```
> npm i
>```

## Execution

> After setting up the .env's files you can run the api in production or in development mode. 
> ```
>  npm run (dev|prod)
> ```
> you would be able to access the aplication endpoints by accessing localhost:port/route
>
> OBS: There's also a mongoClient available for local mongodb management by default set in localhost:3000. (Feel free to use compass, or anything else which better suit for you)

## Endpoints

> Available endpoints:
> - POST / - header{Authorization:<receivedToken>} body:{name:<heroName>, power:<heroPower>} (insert new hero at mongo's database)
> - GET /heroes -  header{Authorization:<receivedToken>} (retrieves all heroes)
> - GET /heroes?skip=<desiredSkip>&limit=<desiredLimit> header{Authorization:<receivedToken>} (heroes with pagination)
> - GET /heroes?skip=<desiredSkip>&limit=<desiredLimit>&name=<Hero Name> header{Authorization:<receivedToken>} (heroes by name)
> - PATCH /heroes/:id header{Authorization:<receivedToken>} body:{field1:value1, field2:value2, ...} (Update a hero property)
> - DELETE /heroes/:id header{Authorization:<receivedToken>} (delete a hero)

## Testing

The API was build using TDD and it is fully covered by unit tests. In order to run the TDD tests, just use the following command:
>```
> npm run test
>```

## Author

> - **Anderson Souza Rocha** - Full-stack developer - [Github](https://github.com/andersonRocha091) 


## License 

> MIT License (MIT)

---
Author ❤ Anderson Souza Rocha
