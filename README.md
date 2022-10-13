# Backend of the graduation project

## Server operation is implemented:
- registration and authorization of users;
- token verification;
- create and delete movie cards.

## Technologies
`Express.js` `Mongo DB`

## Directories
`/models` — folder with files describing the user's and cards schemes;  
`/controllers` — folder with the files of the user's and the card controllers;  
`/routes` — folder with router files;  
`/middleware` — folder with middleware: auth, cors, limiter, logger, validate;  
`/errors` — folder with error classes.  

## Routes
`POST /signup` — creates a user with the email, password and name passed in the body;  
`POST /signin` — checks the mail and password passed in the body, and then returns JWT;  
`GET /users/me` — returns information about the user (email and name);  
`PATCH /users/me` — updates user information (email and name);  
`GET /movies` — returns all movies saved by the current user;  
`POST /movies` — creates a movie with the data transmitted in the body;  
`DELETE /movies/:movieID` — deletes the saved movie by id.  

## User authorization and registration
- There are mandatory email and password fields in the user schema;
- The email field is unique — there is an option unique: true;
- The password field is not limited in length, since the password is stored as a hash;
- In the createUser controller, the mail and password hash are written to the database;
- The login controller checks the email and password received in the request body;
- If the mail and password are correct, the login controller creates a JWT, in the payload of which the id-property with the user ID is written;
- The JWT token  is not given indefinitely, it is issued for a period of 7 days;
- In response to successful authorization, the login controller returns the created token to the client;
- In the file middlewares/auth.js middleware authorization for JWT verification;
- The user cannot delete a card that he did not create;
- The user cannot edit someone else's profile;
- The API does not return a password hash;
- All routers except /signin and /signup are protected by authorization.

## Data validation
- The user's email field is validated to match the mail pattern;
- Request bodies and, where necessary, request parameters and headers are validated according to certain schemes using celebrate;
- If the request does not match the scheme, processing is not transmitted to the controller, the client receives a validation error;

## Error handling in the application
If something goes wrong in any of the requests, the server returns an error response with the corresponding status:

`400` — incorrect data was transmitted to the methods of creating a card, user, or profile update;  
`401` — invalid username or password was passed. Also, the authorization middleware returns this error if an invalid JWT is passed;  
`403` — attempt to delete someone else's card;  
`404` — card or user not found or a non-existent router was requested;  
`409` — when registering, an email address is specified that already exists on the server;  
`500` — is the default error. It is accompanied by the message: "An error occurred on the server."  

When processing errors in the catch block, they are passed to a centralized error handler using next.

## Collecting logs
- All requests and responses are recorded in the request.log file;
- All errors are recorded in the error.log file;
- Log files are not added to the repository.

## Project launch
- Clone repository: `git clone https://github.com/uladzimirfilipau/movies-explorer-api.git `  
- Install dependencies in the root directory of the project using the command: `npm i` 
- Run the backend part of the application on port 3001: `npm start`
