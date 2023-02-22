# JS Shopping Cart

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'js-cart' (`git checkout -b js-cart`)
* Add and Modify the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  
* Due by **Thu Mar 2 11:59pm (PT)**

## Goals

You will create a single page application that allows a user to
- See a Product Page of 3 cats each with a name and price
- Click a "Add to Cart" button for each cat
- Click a "View Cart" button 

While viewing the cart they will see
- The Product Page is still shown
  - The View Cart content is also shown
  - The "View Cart" button is not shown
  - A "Hide Cart" button is shown
- The cat, name, quantity, and total for any cats they added
- They can update the quantity for any cat in the cart
- A "Checkout" button 
  - Checking out will remove all the cats from the Cart

You will use webpack and babel (both!) to
- build (transpile and bundle) the client-side JS bundle

You will have an express server configured to 
- serve static pages only (no dynamic HTML)

Your code will be runnable using 
- `npm install`
- `npm run build`
- `npm start` or `npm run start` (they are the same)
- and visiting `http://localhost:3000/`

## Requirements

While achieving the Goals listed above:

### General Practice
- You should demonstrate the skills shown in class
  - "Working" code using techniques from outside of class does not demonstrate the skills from class
- You will use the concepts of separate state and rendering from class
- You will avoid adding event listeners to dynamically generated elements
  - Hint: Like how in class we used Event Propagation so we added event listeners to elements that were in our index.html, not to elements that were created in render()
- Your client-side JS should involve at least 2 JS files in `src/` that are used wisely to improve the findability of your JS code
- We are using prices, but use Numbers and Strings, no need to worry about extreme precision with the simple math we are doing

### Server
- You will create a `server.js`
  - running express
  - configured to server static files from `public/`
- `npm start` or `npm run start` will run `node server.js`
  - Hint: NOT using `nodemon` or `webpack-dev-server`
- There is no persistence for this project, so hitting "refresh"/"reload" in the browser will reset the page to the initial (no cart contents) page

### Build
- You will use Webpack and babel configured as per class
  - Hint: Follow the slides that involve babel-loader and webpack.config.js but NOT babel.config.js
- Your development js will be in a `src/` directory
  - Outputting built js to `public/`
- You must define `start` and `build` scripts in your `package.json`
  - You can define other scripts to do things like run a webpack-dev-server, but it will not be considered for or against your grade

### Product Page
- The Product Page displays by default on /
- The Product page will list 3 cats (use the below image urls)
  - http://placekitten.com/150/150?image=1 ($0.99 each)
  - http://placekitten.com/150/150?image=2 ($3.14 each)
  - http://placekitten.com/150/150?image=3 ($2.73 each)
- Include the price in the "listing" for a given cat
- Give each cat pic a "name" as the product name
  - Example: "Fluffball", "General Mayhem", etc.
- Each cat listing will have an "Add to Cart" button
  - Clicking Add to Cart will add 1 to the quantity of that cat in the cart
    - Or set the quantity to 1 if the cat was not in the cart
- If the "View Cart" content is not displayed, there will be a "View Cart" button
  - The View Cart button will include a number of total items in the cart if that number is greater than 0
    - You can decide how to show this, but "View Cart (3)" text is adequate
  - Clicking the View Cart button will 
    - No longer show the View Cart button
    - Show the View Cart content
    - Continue showing the Product Page content
- You have discretion on how to handle the visuals, subject to the Visual requirements below

### View Cart
- The View Cart content will display the cats added
  - If there are no cats, show a message "Nothing in the cart"
  - Including the name and pic of the cat
  - Including a quantity per cat (as long as that quantity is greater than 0)
    - The quantity can be edited (You choose exactly how)
    - On edit related values and visuals will update
  - Cats at quantity 0 are not shown
  - Including the total price for that cat (price per cat * quantity)
    - This must be to two decimal places
      - Hint: google "MDN toFixed"
- The total cost of all cats in the cart is shown
- You can use different numbers in the paths to get images of different sizes (example: http://placekitten.com/50/50?image=1) in the View Cart content, if you wish
- When displayed, the View Cart content will have a "Hide Cart" button
  - Clicking the Hide Cart button will
    - No longer show the View Cart content
    - Will show the View Cart button
- When displayed, the View Cart content will have a "Checkout" button
  - Clicking the Checkout button will
    - No longer show the View Cart content
    - Remove any items from the cart
    - Update any related HTML (such as the count in the View Cart button)

## Visual Requirements
- Styling this content well would be an interesting exercise but beyond the purpose of this assignment
- Therefore the visual requirements are minimal
- Related areas of content must be clear
  - Example: It is obvious which name and price is related to which cat
- The View Cart content must be a distinct visual area distinguishable from the Product Page content
  - Example: A different background color

## Restrictions
* You should use the node/npm modules used in class ONLY
* Do not use any outside JS or CSS files or assets
  - Exception: You may use CSS for icons from http://css.gg IF you link to their CSS file on their site
* Use Semantic HTML and semantic CSS class names
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any outside files in your PR (no files from other assignment directories, for example)
* Use arrays and objects when they each make sense
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* Do not use localStorage or other client-side storage 
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS
* Follow the best practices as described in this course to date


