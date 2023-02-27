# Sample Project: Simple Fetch/async

- Demonstrates bundling of front end js files
- Demonstrates separation of concerns for front end files
- Demonstrates calling services to obtain data
- Server-side files are distinct from front-end files

## Services.js

- Note how wrappers around fetch calls are separate from the code that calls them
- Wrappers return a promise of parsed results or an error object with a consistent error structure

## State.js

- Contains data and methods to change/update the data
- This simple example has state that is very similar to server-side state
  - But that's not always true, and even when true we maintain a separate copy

## View.js

- This is the collection of methods to render the generated HTML based on state
- Notice no fetch() calls, no changing of state.  Just outputting the current presentation based on the current state
- Here I'm showing the rootEl of the document and the state object being passed in.  This means the presentation layer USES these, but doesn't know where they come from, and could even be passed other values, which is useful for testing/debugging.




