## Setting up the environment

Import the application as maven app
pom.xml for that is located at `backend\artifact\pom.xml`

Set the `backend\artifact\src\main\java` folder as Sources Root
and `backend\artifact\src\test\java` folder as Test Sources Root

Set up frontend by installing dependencies, run `npm install` in the `fe\` folder

## Running the application

main() method and entry point to run the (SpringBoot) backend is located in
`backend\artifact\src\main\java\hwcrud\artifact\ArtifactApplication.java`
class

after starting the backend run frontend with `npm start` in the `fe\` folder

The application will start in on `http://localhost:3000`