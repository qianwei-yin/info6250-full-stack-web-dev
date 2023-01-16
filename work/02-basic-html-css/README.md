# Basic HTML + CSS

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-html-css' (`git checkout -b basic-html-css`)
* Create/Modify the files needed to fulfill the requirements below.  Be sure to create the files in this directory (the one with this README.md)
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers on the PR.  
* Due by **Thu Jan 26, 11:59pm PT**

## Goal and Requirements

You will create a website consisting of two web pages:
- the index.html file (Home page)
- a privacy.html file (Privacy policy)

You will modify the index.html file and create a privacy.html file along with any necessary files to fulfill the requirements below.

This website is visible by running `npx serve` in this directory, and visiting `http://localhost:3000/` in the browser

These instructions will likely result is some **truly ugly** websites. That's okay, the goal is to understand how the parts interconnect. Just make sure the text is visible.

You may do more than is listed here, so long as you meet all the requirements listed in the way that is listed as required.

### The home page (the index.html file)

Modify this file to:
- load a separate "styles.css" file that you will have to create
- load a "home.css" file that you will have to create
- Replace the contents of the `<main>` element to include an HTML unordered list of of your favorite animals. Each entry should contain a link to some web page on the internet related to that animal. These can be a category of animal (such as "owl") or to a specific individual animal (such as "Jorts the Cat")
- Replace the contents of the `<footer>` element to be a link to privacy.html, which you will have to create

### The Privacy Policy (the privacy.html file)

Create this file:
- This page should have the same header/footer as the home page
- The contents of the page should be some fake text talking about whether and when you will sell the users' private data.  
- Somewhere in this text you should have a link back to the home page. 
- The text should involve at least 2 paragraphs
- The page should load the same "styles.css" file as the index.html file (you will have to create the styles.css file)
- The page should load a "privacy.css" file that you will have to create

### styles.css

Create this file:
- set the header/footer to have a different background color from the main page
- set the main page background color to something other than the browser default
- set the page heading (the `<h1>` contents) to be shown NEXT to the logo cat pic, not above/below it, using flexbox
- change any foreground colors needed to make the text visible for header/main/footer

### home.css

Create this file:
- put a colored border and padding around the list of animals
- set the `list-style-type` CSS property for the list to "\1F431" (cat face)
- this file should use only classes as selectors, no element tags or ids

#### privacy.css

Create this file:
- Use the information on this site: https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter
- Set the first letter of each paragraph in the main content of this page to be `font-size: 150%;` and `line-height: 1.6;`

## Restrictions
* You MUST follow the required practices outlined in class
* Do NOT use external CSS libraries, only CSS you are writing yourself and included in this PR
* Do NOT use meta-tag redirects
* Do NOT use floats to do more than manage flowing text with images
* Do NOT use HTML tables or CSS table layouts
* Do NOT use client-side/browser-side Javascript
* Do NOT use CSS preprocessors, minifiers, or other tools to modify your CSS
  * Reviewers must be able to read your work easily

