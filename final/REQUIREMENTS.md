# Final Project Requirements

* Your project is submitted as PR to merge your branch 'final-project' into main
* Be sure to include the reviewer(s) on your PR
* Project is due on **Sun Apr 23, 11:59pm (PT)**

## Structural Requirements
* Projects are individual (no groups)
* Project must be based in this directory
    * This directory must be able to run the startup commands
* The project must run with `npm install`, `npm run build`, `npm start`
    - Note the extra requirements about `npm start` below!
      - It should NOT start the create-react-app dev server
      - It should start your single server.js that will run both your static SPA and your REST services
    - You may define additional commands as options, but running the above commands only must work
* Any `package.json` files you write should be well organized and complete
    * Fill in fields accurately
    * Use `dependencies` and `devDependencies` appropriately
    * Configure `scripts` appropriately
* Your project should use `npm`, not `yarn`
* Your project should NOT include files not appropriate
  - Do not commit `node_modules/` or `build/`, for example
* The project CANNOT use react-scripts/create-react-app to run with `npm start`
    * You may use create-react-app to create and develop your application
    * You will have to adjust the `scripts` section of `package.json` 
      * It is fine to move the existing `start` definition to a different name
    * Build the results of `npm build` and serve those as static files in the actual project
    * This is how the production use of your project would work

## Front End
* The project must use a React-based front end
* The project must be a SPA
* Your front end code must follow all the best practices as outlined in classes and in PR feedback
* Your front end code may include ONLY outside libs listed here, unless you get advance approval
    * react, create-react-app
    * eslint, babel, webpack (including the necessary modules for babel and/or webpack)
    * uuid
    * icon/image libraries that DO NOT use JS
    * jest, enzyme, mocha, chai, sinon 
* Advance approval will NOT be granted for:
    * SASS/less
    * CSS preprocessors
    * Bootstrap/Foundation/similar libraries
    * axios and other fetch() alternatives
    * jQuery or other non-react DOM manipulation

## Services
* Your backend/service code must use express-based NodeJS
* The project must involve calling REST-based service calls that you write
    * You may call outside services as well, but you must use some services you write
    * Your service calls (the ones you wrote) must include at least 3 different HTTP methods in a RESTful way
* Your backend code must follow the best practices as outlined in classes and in PR feedback 
* Your backend code may include ONLY outside libs listed here, unless you get advance approval
    * express
    * cookie-parser, uuid
    * nodemon (development only)
    * eslint, prettier, babel
    * jest, mocha, chai, sinon
* Advance approval will NOT be granted for:
    - react-router, react-router-dom, react-reach
    * SASS/less
    * CSS preprocessors
    * Bootstrap/Foundation/similar libraries
    * Database libraries
    * axios and other fetch() alternatives
    * jQuery or other non-react DOM manipulation

## Functionality and Creativity 
* Your project must do something useful and/or interesting
* Your project must be usable and attractive
* Your project must have some form of input validation (front end AND back end)
* Your project must have some form of helpful error reporting (to the user, on screen)
* Your project may be considered for the college to exhibit - projects that meet that criteria are scoring very well for functionality and creativity
* Because I am banning routing libraries like react-router, the app is NOT expected to handle the Back button or maintaining the current front-end state on page reload/refresh

## README
* You must include a README.md in your project
  * This should NOT be the default README created by create-react-app
* Your README must include a good and useful description of what your project does
* Your README must include a basic description of how to use your project
    * Your project shouldn't **require** someone read this to understand how to use it (discoverable)
* You must indicate the source and licensing of any outside images/media in your README

## Security requirements
* Users must have an authentication step
    * No actual passwords are checked, but the step must happen
      - Banning user "dog" counts IF you treat it differently from invalid characters in the username
    * There must be some case where authentication is denied (such as banning user "dog")
    * The step should be clearly distinct as when any authentication happen
    * The server must respond with some sort of token/session id for the client to use for authentication/authorization
      - A session id cookie counts
* All service calls must have some form of authorization (unless the service call is intended to allow open access)
    * passing a token that is validated on the server side
    * token may be passed as a cookie or as a header
* All security best practices from classes must be followed
    * In particular, various insertion attacks (XSS, etc)
      - React will do MOST of this automatically on the front end, but the backend must sanitize user input
    * Exception: We aren't worried about requiring HTTPS

## Extra Credit Opportunities 
Note: worry about the base requirements first!
- More complex service interactions beyond the minimum
  - Different HTTP methods (used in an appropriate RESTful way
  - Polling when appropriate to the application
    - Remember to perform clean up!
  - Service with pagination
  - Different levels of authorization (users not yet logged in, logged in users, logged in administrators) able to use different services or get different results from those services
- UI interactions that require state management
  - Different "pages" and screens 
    - Note: react-router is NOT allowed, you will have to do conditional rendering yourself
  - The larger the number of visual states that are possible (and managed correctly), the more impressive the work
  - Complex form validation with visual feedback to the user 
- Excellent architecture and separation of concerns
  - Good use of useReducer to update state via "action" concepts

