# API Skeleton

This project outlines a very basic API skeleton.
It features a filesystem DB for authenticating users.
Users may register themselves with the API.
Once registered they can access a list of other users in the DB.

## Developing

The API runs on NodeJS `13.x.x`.

### Installing Dependencies

To install all dependencies run `npm install` from the root of the project.

### Running Tests Locally

There are two sets of tests included in the project.
A set of unit tests can be found in `test` directory.
These tests can also be used to generate code coverage reports.

> To run the unit tests simply run `npm test`.

A second set of integration tests exist within the `test/integration` directory.
These tests are specific to the JetBrains suite of products.
The run in any recent IntelliJ Ultimate IDE and complete a suite of integration tests against a running server.

You can find more information about these tests in the [IDEA documentation](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html).

### Running the API Locally

To start a server locally run `npm start` from the root of the project.

## Additional Features

### Runtime Configuration

The server features a robust configuration implementation leveraging an npm package called `convict`
You can read more about how it works [here](https://www.npmjs.com/package/convict).

### Documentation

The server provides a Swagger UI at `/documentation` and a `swagger.json` at `/swagger.json`.
