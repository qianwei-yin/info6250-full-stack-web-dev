# Basic JS 

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-js' (`git checkout -b basic-js`)
* Modify the `compare.js` file, following the prompts in that file
  - Be sure to remove any comments that don't apply to your final code
    - such as "this line is wrong"
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA and I as reviewers on the PR.  
* **Due by Sun Jan 29, 11:59pm PT**

## Goal and Requirements

The purpose of the assignment is to gain familiarity with Javascript (JS).

Please do not search for solutions to this 
- You want practice at breaking down problems 
- I'm happy to offer hints

Your goal is to have `node game.js` work to play a word guessing game by updating `compare.js`

Make the `compare.js` file work as directed.  
* The compare function is passed two words.
* It will return a number
* The number returned will be the number of letters the words have in common
  * regardless of position
  * regardless of upper/lowercase

Examples: 
* "ONE" vs "TWO": 1 letter ("O")
* "TWO" vs "won": 2 letters ("O" and "W") (even though lowercase)
* "TOO" vs "TWO": 2 letters (one "O" and "T") (Only one "O" matches, even though TOO has two Os)
* "BOO" vs "TOO": 2 letters (two "O"s)

## Allowances
* You are not expected to understand the provided NodeJS code yet - your code to write is pure JS in compare.js
* You can assume the compare function will always be passed two words 
* You can assume the compare function will always be passed two words of the same length
* You can use the test file to test your compare function: `node test.js WORD1 WORD2`
  - I recommend doing so!

## Restrictions 
* You may not use outside JS libraries
* You MAY NOT edit the other files included
* You cannot edit the parts of compare.js that say to not edit them
* Do not use an array when an object makes more sense
* Do not use Map() or Set(), even if they make sense
  * You should experience using plain JS objects for that purpose, because you WILL see code that does that
  * There is nothing otherwise wrong with Map() or Set() in general, but we won't be using them in class
* Follow the requirements given in class
  - such as not using `var`, and using `const` where you can so `let` stands out

