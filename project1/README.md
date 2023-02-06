# INFO6250 Project1 - Server-side Dynamic Site

**Due Sun Feb 26 11:59pm PT**

## Submission Instructions

- Start from the up-to-date main branch (git checkout main; git pull origin main)
- Create a feature branch named 'project1' (git checkout -b project1)
- Create a package.json and necessary files to complete the work described in this README
  - You can add/modify any files except as limited below
    - In particular: Do not load external JS, no client-side/browser JS, do not change words.js
  - Remember that all work you submit must be based on my code or represent your writing
    - Do not start from someone else's code - write it all yourself
- Add, commit, and push the branch to github
- Create a PR to merge to main
- Be sure to include the reviewer(s).

## Goals

- You will build a web-based word guessing game
  - this site will use only backend-generated HTML
  - this site will use no front-end JS
- You will demonstrate the skills taught in class
- Extra Credit: You have visuals and styling beyond the minimum required

## Functional Requirements

For all the below: 
- A "game" means one specific secret word is chosen and the user takes multiple turns making guesses
  - A "new game" means a new secret word is selected, the number of guesses made is reset to 0, and the list of possible words is reset to the full list
    - Statistics about previous games may be preserved
- "valid guess" means a guess that is one of the possible words that has not already been guessed this game
  - guess are not case-sensitive, so "these" is a valid guess if one of the possible words is "THESE"
- "invalid guess" means a guess that is not one of remaining possible words
  - This includes words that would never be valid (are not on the full list of possible words) and words that are on the list of possible words that have been previously guessed this game.
- "incorrect guess" means a valid guess that is not the secret word
- "correct guess" means a valid guess that IS the secret word (case-insensitive)
  - A guess that shares all of the letters of the secret word but is NOT the secret word (such as EAT vs TEA), is NOT a correct guess and does not win the game

### Home Page

When the User loads the page (path: `/`)
- the site will determine if the user is logged in (based on `sid` session cookie)

- If the user is not logged in:
  - the page will display a login form instead of the below content
  - the login form will ask for a username but will NOT ask for a password
  - the login form will POST to `/login` (see "The Login Flow")

- A logged in user will see:
  - A list of words the secret word could be
  - A list of any previously guessed words and how many letters each matched (see "Making a Guess")
  - A count of how many valid guesses they have made so far this game (essentially, a score a player wants to keep low)
  - What their most recent valid guess was, and how many letters it matched
    - or, if their previous guess was invalid they will be told that guess and that it was invalid
  - If their previous guess was correct: a message saying they have won
  - If their previous guess was incorrect: an option to make another guess (see "Making a Guess")
  - An option to logout
  - An option to start a new game
  - Notice: All of the above is true even if they reload the page. The user stays logged in and the displayed information does not change
  - You can choose how to display the above information.  You might combine the list of available words and the list of guessed words and matches, or you might have them as separate lists, for example. What matters is:
    - The information is all present
    - The information is understandable to an average user

- A different user will see the above information for themselves, not the information of a different user, and their game is not altered if another player is playing a separate game at the same time
  - Use different browsers or browser-profiles to test this - each profile can log in separately as different users

### Making a Guess

A guess will be sent as a POST to the path `/guess`
- The server will check for a valid session id
  - If there is not a valid session id, the page will display a message and a login form
    - Hint: an invalid session id could come from manually changing your cookie or restarting the server (the server will forget all session ids, but the browser will still have the sid cookie)
- The server will check for a valid guess
  - If the guess is not valid, the server will update the server state for that player and respond with a redirect to the Home Page 
  - If the guess is valid, the server will update the server state for that player and respond with a redirect to the Home Page
  - Hint: See "Home Page" for ideas on what details the server state will have to know.  If we had a database much of that information would be there, but because we do not we will simply hold the state data in different objects.  Remember to keep information for different players separate.

The guess is evaluated for how many letters match between the guess and secret word (see "Starting a New Game"), regardless of position of the letters in the word and regardless of the upper/lower case of the letters.  
- Hint: This should sound like an earlier assignment

### Starting a New Game

A new game begins when a user starts a new game or logs in for the first time.
- A secret word is picked at random from the list of available words
  - Hint: see Math.random() at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  - The list of available words is exported by the provided `words.js` file
    - `require()` this file in your JS to get the array of words.
    - You may change the words in words.js, but you should not otherwise alter the file.
      - Your game code must still work if we replace words.js with a different list of words that are exported the same way

If the user is starting a new game by virtue of logging in for the first time, it is done as part of login and does not require extra navigation in the browser

If the user is manually starting a new game, it is done as a POST to `/new-game`
- The server will check for a valid session id
  - If there is not a valid session id, the page will display a message and a login form
    - Hint: an invalid session id could come from manually changing your cookie or restarting the server (the server will forget all session ids, but the browser will still have the sid cookie)
- If there is a valid session, after updating the state, the response will redirect to the Home Page.

To help with grading, the server will `console.log()` the username and the chosen secret word whenever a new game is started for a player.
- This is not a debugging console.log().  Be careful to make sure all debugging console.log() statements are removed before turning in your project

Important: No information is sent to the browser that allows someone to learn the secret word without playing the game

### The Login Flow

Login is performed as a POST to `/login`
- It will send only the username, no password
- If the username is valid the server will respond with a `sid` cookie using a uuid.
  - a "valid username" is one composed only of allowed characters
    - You select the list of valid characters
  - Enforce the validity of the username by having an allowlist of valid characters
  - explicitly disallow username "dog" 
    - This simulates a user with a bad password, since we aren't using passwords
  - after setting the cookie header, respond with a redirect to the Home Page
  - a user with a valid username will always be treated as if the are an existing user
    - There is no user registration
- If the username is invalid (including "dog"), respond with a login form that contains a message about the username being invalid

If a username that is in the middle of a game logs in
- They will be able to resume their existing game
- Hint: This means the game info is not tied to their session id, it is tied to their username
  - Hint2: Have one object that connects sessions to usernames, and a second, separate object that connects usernames to game state

### The Logout Flow

A user logs out with a POST to `/logout`
- Even a user with no session id or an invalid session id can logout
- This will clear the session id cookie (if any) on the browser
- This will remove the session information (if any) from the server
  - Hint `delete obj["key"]` will remove the "key" property from object "obj"
- Logout does NOT clear the game information from the server
  - The user can log in as the same username and resume the game
- After the logout process the server will respond with a redirect to the Home Page

Hint: Be sure to test login/logout, resuming a game already in-progress, and related requirements!

## Visual Requirements

- The game requires some effort to visually present the data and forms
  - spacing, color, and layout of sections should make it readable and presentable as a demonstration of skill
  - In particular, make sure:
    - The list of allowed words is formatted to fit on most screens without scrolling
    - A user playing the game can understand the information they are presented (such as what guesses have been made and their corresponding) 
- The game does not need to work on mobile screens, but it should look appropriate at a range of desktop sizes
- This is not a web design class, so I do not expect art.  However, even fully backend coders must be able to present their work pleasantly.
- **Extra Credit**: Styling and appearance beyond the above minimums that create a pleasant and professional experience
  - use colors, borders, and whitespace to make different areas clear and distinct
  - improve the experience of the game - make it clear and easy to see what has been guessed and what guesses are available
  - use line-spacing/padding/margins to improve the legibility of text 
  - Put the app in "context" - as a web application on a page/site
    - You do not need to create any additional pages

## Implementation Requirements

- Your code should follow the best-practices outlined in class
- Your work must demonstrate the skills from class.  Simply "working" is insufficient!
- The game must be runnable via: 
  - `npm install` 
  - `node server.js`
  - going to `http://localhost:3000`
- Multiple players must be able to play separate games (from different browsers) simultaneously
- Logout and a later login must allow you to resume a game
  - as long as the server has not restarted.  No long-term persistence is expected.
- The server-side MUST enforce security (session and field validity)
  - Do not display to the screen any value that came from user input unless that value was allow-filtered on the server
  - Detect that any insecure values from the user are insecure as soon as possible before they are passed to functions that could store them
- You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
- You may create your HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
- You may create the CSS as you see fit but you must follow the best practices given in class and obey any restrictions listed here
- You may add icons and background images but there is no requirement to do so
  - So long as any icons are done without outside JS or CSS
- You should use `express`, `cookie-parser`, and `uuid` modules only
- Do not use external JS other than the above
  - Built in options like Math are not external libraries and are allowed
- You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
- You must use the correct HTTP methods (GET for loading pages, POST for adding content)
- Reloading a page should not trigger a POST (use a redirect)
  - Except for any listed cases with invalid sessions
- Do not use external CSS libraries
- You may not use CSS floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
- Do not have any files in your PR except for the project (no files from other assignments, for example)
- Use arrays and objects when they each make sense
- Do not use Map() or Set() for this exam
  - In order to ensure you can use plain objects and arrays 
  - Map() is not the same as the .map() method on an array - an array .map() is allowed
- Do not use `var`
- use `const` and `let` appropriately
- Do not use `alert`, `prompt`, or other blocking JS prompts
- Do not use poor variable and function names
- Do not have functions that are too big/do too much
- Do not have console.log messages from debugging
  - The console.log to show the secret word is allowed and required
- Do not have commented out code
  - Useful comments as discussed in class are welcome though
- Do not use localStorage, sessionStorage, or indexedDB
- Do not use meta tag refreshes
- Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

