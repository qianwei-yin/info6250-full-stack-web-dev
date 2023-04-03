# Sample of basic React version of Todo sample

This sample involves both:
- an express server.js to host RESTFUL services and act as a static file server
- a create-react-app-based SPA build as static files that consume those services

## Setup

- Run `npm install`

## Notice for Windows users

Where I say 'run `npm start`' you will need to run `npm start-win`
- You can look at the differences in these package.json scripts
- There is a library (`cross-env`) that would resolve these differences, but I want you to see what is happening for this course.  Out in the "Real World" I recommend using cross-env to write scripts that work on multiple operating systems.

## Running for development

- In a terminal, run `npm start` to start the express server
  - The "start" script in package.json was changed
- In a DIFFERENT terminal, run `npm run dev` to start the development CRA server
  - This runs what used to be the "start" script
  - You need BOTH servers running for development
- Visit localhost on port **3000** (the development server port)
  - Service calls will be proxied by the development server to the express server
    - The browser only ever makes service calls to port 3000 (the port of the page)

## Running for production

- In a terminal, run `npm run build` to create the static files in the `build/` directory
- In a terminal, run `npm start` to start the express server
  - The "start" script in package.json was changed
  - Only ONE server is running
- Visit localhost on port **4000** (the express server port)
  - You could run the express server on port 3000 since the development server isn't using it, but using the different port should reduce confusion
  - Service calls go directly to the express server on port 4000
    - The browser only ever makes service calls to port 4000 (the port of the page)
  

