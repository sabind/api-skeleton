# API Skeleton

This project outlines a very basic API skeleton.
The API relies on strong input validation (in [`validations`](validations)) to maintain data integrity in the DB.
The API funcationallity can be extended by adding more [`routes`](routes) and [`controllers`](controllers).

It features the following :

- Basic Authentication to protect unwanted access to some routes
- API versioning implemented as a path parameter
- A user repository
- A health route 
- Swagger Documentation
- Integration Tests (for IntelliJ Users)
- Unit Tests
- A configuration system that supports `<env>.json`, `args` and `ENV_VARS` to manage start up parameters.
The available options should work with all deployment environments as well as providing secure ways to configure the application for production deploys.

## Using the API Skeleton

The API is verified to run on NodeJS `13.x.x` but likely supports NodeJS `10.x.x` as well as `12.x.x` 

### Installing Dependencies

To install all dependencies run `npm install` from the root of the project.

### Running Tests Locally

There are two sets of tests included in the project.
A set of unit tests can be found in the `test/unit` directory.
These tests can also be used to generate code coverage reports.

> To run the unit tests simply run `npm test`.

A second set of integration tests exist within the `test/integration` directory.
These tests are specific to the JetBrains suite of products.
The tests run in any recent IntelliJ Ultimate IDE and complete a suite of integration tests against a running instance.

> You can find more information about these tests in the [IDEA documentation](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html).

### Running the API Locally

To start a server locally run `npm start` from the root of the project.

### Runtime Configuration

The server features a robust configuration implementation leveraging an npm package called `convict`
You can read more about how it works [here](https://www.npmjs.com/package/convict).
The configuration is docmented in the [`config/index.js`](config/index.js) file.

### Documentation

The server provides a Swagger UI at `/documentation` and a `swagger.json` at `/swagger.json`.
