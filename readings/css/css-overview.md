# CSS Overview

This is a high level overview of CSS and the best practices.  As with the other material you are expected to be familiar with for class I highly recommend reading more into the topic (See Additional Resources at the end)

## Programming in CSS?

CSS may not be what you consider a programming language. But it is a set of "rules" that are applied to a page that determine how the behavior of the page's appearance, and it involves breaking larger problems down into solvable problems.

## CSS Rules

A CSS _rule_ is one or more _selectors_ followed by a block in curly braces (`{}`) containing 0 or more _properties_.  Each property consists of a name, a value, and ends in a semicolon.

### Selectors

A "selector" has the ability to match elements on the page.  If an element matches, the properties are applied to the element, and if it does not match, the properties are not applied.

* A given selector might match zero, one, or many elements.
* A rule can have multiple selectors, comma separated (whitespace such as spaces or newlines are permitted around the comma).  If ANY of the selectors match, the rule is applied to the matching element. 
* Selectors can combine any of the following:
  * tag name (e.g. `p` matches `<p>`)
  * tag id (using `#` before the name: `#someIdName` matches `<p id="someIdName">`)
  * any of the tag class names (using `.` before the class name: `.foo` matches `<p class="foo">` AND `<p class="foo bar">`
* These also work, but are less common and are complex enough that you should look up the details
  * certain browser states, pseudo-states, and element relationships (using a variety of sigils)
  * attributes with certain values (using `[]`)

### Properties

A rule can contain any number of properties.  Each property describes a visual aspect about the rendering of that element.  There are "shorthand properties" that define multiple such properties at once.  For example:
* `margin: 10px;` actually defines 4 10px margins, left, top, right, and bottom.  These could be individually set like `margin-top: 10px;`, etc.
* `border: 2px solid black` actually defines the border-width for all 4 directions, the border color for all 4 directions, and the border-style for all 4 directions.  That's 12 values set by one shorthand property

## Conflicts

Often there will be multiple rules that match a given element.  Normally all the properties of all matching rules are applied.  But what if they contradict each other?  For example, one rule might set colors of text and another might set margins - no conflict.  But if they both set the margins, how do you know which will be used to decide how the element renders?

There are defined rules for this. (As of early 2022, there is an addition to the below, 'cascade layers', that has been agreed to as a standard but is not yet implemented in all the major browsers)

* Any CSS defined on an HTML element always wins.  This is why you should NOT do this - it makes your HTML less usable.
* If that doesn't settle the matter, then any CSS properties applied with !important win.  This is why you should NOT do this - either your HTML is less usable, or EVERYTHING is !important.
* If that doesn't settle the matter, then any CSS with higher "specificity" wins.  "Specificity" is based on how specific the matching selector is.  An id is more specific than a class, which is more specific than a tag name.  These can be combined, so a selector that matches two classes is more specific than one matching a single class, but either case is still less specific than an id match.
* If that doesn't settle the matter, the most recently loaded rule (the last rule) wins.

Being able to override CSS rules is a big deal and part of the power and flexibility of CSS, but it can easily be overdone.  If you find yourself having "specificity wars" where you are deliberately and repeatedly making your selectors more specific to override other selectors, you should consider making the HTML more semantic so it is easier to be accurate without artificially raising the specificity.

## Inheritance

Often CSS properties will impact not only the element that they match, but also descendant elements.  Example: If you set the font-size or background color of an element, you'd expect that to apply to contained elements...and it does, if they aren't given explicit rules to the contrary.

Not all properties are inherited.  You wouldn't expect every child element of a paragraph to have their own borders just because you put a border on the containing element, and indeed that does not happen.  Typically properties affecting color and typography inherit, while positional or block sizing properties do not.

Inheritance is often used to establish default treatment of different portions of the page.  A menu, for example, will have a default appearance, while the main body will have a different default appearance.  

## Failed parsing

If your CSS can't be understood, the browser will quietly move on.  If a selector makes no sense, the browser will try to skip to the next rule.  If it can't figure that out, it will skip the rest of the file (and keep the part it did understand).  If a property confuses it, it will quietly move on to the next property.  This means you can have CSS errors and not notice (assuming the errors are not glaringly obvious in the resulting render of the page).

## Best Practices

Best Practices depend on what style of CSS you are using:

### Conventional CSS Best Practices

* Always have your CSS in a separate file, not in your HTML
  * Unless you are using a frontend library with a CSS-in-JS style
* Use lowercase-kebab-case class and id names
  * Exception: BEM-styles names (`block__element--modifier`) is also a common convention
* Do NOT use class names that describe the styling directly (AVOID: 'inverse-colors', 'blue', 'indented')
  * Exception: "utility" class styling such as Tailwind CSS is the opposite, but this course will NOT be using utility classes
* DO use class names that describe the content (e.g. 'main-menu' instead of 'inverse-colors')
* Do NOT use the !important modifier
* Place one property setting/line
* Do NOT mix tabs and spaces in your indenting
  * Tab vs Space is an ancient battleground of developers. In this course, I require only consistency.
* Always include a semicolon after each property setting
* Try to make styling rules reusable 
* Do NOT assume everyone is using the same monitor/resolution as yourself

Two additional popular conventions I dislike are below.  These are NOT required for this class.
* Use shorthand properties where you can
  * I dislike this because the longer form is often more explanatory.  I recommend using shorthand properties when it helps and not when it confuses, rather than being dogmatic about it
* Do not apply units to dimensions of 0
  * I dislike this because it hides your normal units, and because I can consider units that aren't 0 at the same time (such as temperature).  Unitless 0 also causes problems in places like calc() because a unitless 0 does NOT assume units.

### BEM CSS Best Practices

BEM - `Block__Element--Modifer` - is one of a few different CSS naming/use methodologies.  Specifically, it attempts to create a structure that is not based on selectors that match multiple elements across the page, but instead collecting HTML content into blocks of internally consistent CSS labels and styles.  The downside is that you have to give specific rules for all elements that are getting similar treatment when they are on different regions of the page.  The upside is that you don't have to fight rules being applied to elements you didn't intend them to be applied to.

I will use some examples that use BEM and some that do not.  In all cases the class names will be semantic.

BEM or not, you ARE required to have a CSS style that is consistent throughout that assignment code.

### CSS-in-JS

Front end libraries that generate the HTML for the page are often used to generate the CSS as well.  This is a completely different use case from CSS-for-generic-HTML and different best practices apply.  We will not be covering this situation in class, but know that it exists and is a valid (and rising in popularity) technique.

### Alternative CSS Best Practices

Numerous other approaches exist, each trying to find the balance point between 'specific enough to be practical, generic enough to be usable after changes, and able to not have cascading cause unexpected problems'.  You can adopt one of these or simply build your own understanding through experience and attempting to find the balance on your own.  Each assignment, however, must be internally consistent in the usage.

## Additional Resources

* MDN material
  * https://developer.mozilla.org/en-US/docs/Web/CSS
* Can I Use?  - a great source to see if a particular CSS option is supported on a given browser
  * https://caniuse.com/
* Guide to Flexbox - a helpful overview of one of the best CSS features in years
  * https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* Flexbox Froggy - a site that lets you practice making specific changes via flexbox
  * https://flexboxfroggy.com
* CSS grid garden - a site that lets you practice making specific changes via CSS Grid
  * https://cssgridgarden.com
