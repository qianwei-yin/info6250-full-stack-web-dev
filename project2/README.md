# Project 2 - JS Chat

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'project2' (`git checkout -b project2`)
* Create the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by **Sun Mar 19, 11:59pm (PT)**

## Goals and Requirements

You will be writing a SPA using JS as shown in class that calls REST services (that you also write).  This SPA will be a simple Chat application.

### Running Requirements
- Your app is usable as it would be in production by running `npm install` (once only), `npm run build`, `npm start`
  - You may include other commands/scripts for development if you wish

### Learning Goals of this assignment:
- Write RESTful services using express, following the 3 Basic Rules of Rest presented in class.  (Reminder that these are my personal rules summarizing REST, you won't be able to Google them effectively)
- Call RESTful services in front end JS using fetch as demonstrated in class
- Practice maintaining persistent state on the server and using services to load and update client state
- Practice using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Practice using RESTful services for authentication/authorization
- Write a basic polling feature to check the server for updates and update client state
  - Not using websockets or long polling, just a simple time-based loop

### Requirement Overview

- Write an express server that will serve static assets and RESTful services
- Load a static HTML page as the SPA from your express server
  - This means there should be only one single html page!
- The HTML will load a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view/use the chat
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- A logged in user will see a list of messages, a list of currently logged in users, and will be able to send messages
- Every message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
  - Do NOT rewrite the HTML for the input form when you get polling results (a user typing a message will be interrupted and the message-in-progress will be lost!)
    - Hint: have a smaller render function that covers the users and the messages, but doesn't rewrite the form that gathers the input
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time (using multiple browsers or different browser profiles here, more often on phone/desktop in reality)!  Make sure the username only shows up once in the list of users regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of
  - Because we are only counting explicit "logout" actions, this app will consider a user that left the app (closing the tab or navigating to another page) as still "logged in" - that is fine for this assignment
- Multiple users can be logged in at once (use different browsers or different browser profiles to do this yourself) and can send and see messages from one another

### Visual Requirements

You are welcome to use/adapt your HTML/CSS from the `basic-express` assignment, subject to the requirements below and feedback on that assignment

You have wide discretion on the appearance of the chat, but:
- You must have SOME styling provided by CSS
- There must be no horizontal scrolling at normal desktop screen sizes (>800px width) and with usernames of up to 20 characters
- You may have min- or max-widths for the chat area, but it must not be set to the same fixed width for all users regardless of their window
- The list of users should be visually distinct from the list of messages
- There should be good whitespace, colors, and legibility throughout to promote usability
- The app should strive for usability 
  - Example: You should not have to scroll to see the most recent messages unless you scroll away from them
  - Example: It should be convenient to send new messages
- You must have a loading indicator (text, image, and/or CSS) for:
  - When the page is loading and the SPA does not yet know if the user is "logged in" or not
  - When the user logs in and the initial list of users/list of messages are being loaded
- You may have loading indicators for other situations or not, your choice
- Service calls that generated unexpected errors should inform the user
  - Example: GET /session can return 401 if the user is not logged in.  This is expected, and will impact what is shown (login form or chat) but will not trigger a specific message to the user.  However, a 400 response when trying to login is NOT the expected response, and will trigger a message displayed on-screen in the app to the user)

### Security Requirements

- There should not be any password involved at all
- User "dog" will be rejected with a 403 error on login (we use this check instead of checking for password)
- Services that require authorization should respond with the appropriate Status Codes (401, 403) if the request does not have a valid sid cookie value
- You should allowlist to sanitize the username
- There is no requirement to sanitize messages, BUT you should think about what would be required to prevent injection attacks and how you would do so.
- All service calls that return lists of users or lists of messages require authorization
- The services must never trust the user input to decide which user is sending a message (That is, the username will not be input for service calls to send messages - instead, use the sid to find what username that session belongs to and use that).  This is different than with the basic-express assignment (we had not done login at that time)

### Quality Requirements

- You must follow the best practices outlined in the course so far for JS, CSS, HTML, services, and file structures
- The services must follow the REST requirements outlined in class
- The service urls should be in an `/api/` path
- The service urls should have a version in their path
- There is no requirement to paginate the service results on this assignment
- Use Semantic HTML as much as you can
- Use Semantic CSS/HTML class names using kebab-case
  - Semantic BEM-style names are permitted
- Follow any suggestions previously given to you in code reviews

### Additional Requirements
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT interact with the browser url, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
* Do not use external JS other than express, cookie-parser, uuid, and the modules we've used for webpack and babel
  - Exception: You may use nodemon and/or webpack-dev-server for development
* Do not use external CSS libraries
  - Exception: You may use CSS files linked from https://css.gg/ for icons and/or spinners
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

