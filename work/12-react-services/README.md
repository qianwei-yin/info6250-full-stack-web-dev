# React Services

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-services' (`git checkout -b react-services`)
* Create a react application in this directory using create-react-app
* Modify and add files in `src/` to fulfill the requirements below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  
* Due by **Sun Apr 9 11:59pm (PT)**

## Goals

- Create a React application that makes use of REST-based services
- Have a service server that can serve the static files built by `npm run build`
- Configure the create-react-app (CRA) dev server to proxy service requests
- Demonstrate an understanding of calling services using React
- Demonstrate an understanding of the `useEffect` hook as described in class
- Demonstrate an understanding of displaying loading states
- Demonstrate an understanding of the two different servers involved during development
  - And the single server involved during production

## Assignment Goals and Requirements
- The application will have service-based login/logout
  - As normal username "dog" will be treated as a denied user (not an invalid username, but a disallowed user)
- The application will show a logged in user their "stored word"
- The application will allow a logged in to change their "stored word"
- The "stored word" is stored per user on the server
- The page will check for an existing session on page load
  - a user that is already logged in will not have to log in again
  - While the app is waiting on the service call(s) for this check a loading indicator is displayed to the user
  - This indicator can be image, css, and/or HTML-based, but must be clearly visible for testing, however briefly
- Your application can be tested by running `npm install` and
  - running `npm start` to start the services server on port 4000
    - NOT the default create-react-behavior!
  - running (in a separate terminal) `npm dev` to start the dev server on port 3000
    - Note: this requires change the `scripts` section of package.json
  - visiting http://localhost:3000 in the browser
- Your application can ALSO work by:
  - running `npm run build` to create the static files in `build/`
  - running `npm start` to start the services server
  - visiting http://localhost:4000 in the browser

## Updating the created package.json
- run `npm install express uuid cookie-parser` in the created react project directory (where the package.json file is)
- add `"proxy": "http://localhost:4000",` to the package.json

## Security And Error Reporting Requirements
- Both username AND the stored word should be allow-listed against criteria of your choice
  - This MUST be enforced on the service-side
  - This MAY be enforced on the client-side
  - Any received errors from a service because of user input should result in a meaningful message to the user
  - If a service is unreachable a message should be displayed to the user

## Visual Requirements
- Provide at least basic visual styling to provide distinct areas for different parts of the application and sufficient visual spacing

## Restrictions
- All components must be .jsx files named in MixedCase
- Components and server-side files should have good separation of concerns
  - not too large
  - not doing too much
  - same logic as splitting up functions
- Components  should have good, accurate, meaningful names
- state values should have good, accurate, meaningful names
- Component files should match the component name
- Components must each be in a single file with no other exported values
- Logic that is not about JSX should be imported from .js files
- .js files and functions should have good, accurate, meaningful names
- CSS should be semantic class names, either kebab-base or BEM style
- Service code should match the quality requirements from previous assignments

## Additional Requirements
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT use external JS other than that demonstrated in class
  - Note: You may use nodemon for your own development of the server, but it should not be in any of the package.json scripts described in this README.
- Do NOT interact with the browser url, including hash fragment
- You may not use `document.querySelector()` or otherwise modify the DOM directly
- You may not use `useRef`, or `ref` props from React (If you do not know what I mean, that is fine)
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Follow any suggestions previously given to you in code reviews
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
  - Note: create-react-app installs many files.  For now, those are fine to include in your PR, except for `node_modules/`
- Do not use external CSS libraries
  - Exception: You may use CSS files linked from https://css.gg/ for icons and/or spinners
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
- You may not use floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- You may not use Set() or Map() (not the same as the .map() method on an array, that is allowed)
- You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  - I and the TA(s) must be able to read it easily

