# Absolute Paths vs Relative Paths

## What are they

When a web page refers to another resource (a link to another page, an image, a CSS file, a JS file, etc), that reference is done with a URL. It might be a fully-qualified URL (including the protocol, domain, and path) or a partial URL (containing fewer of those, commonly just the path).

When the url is just the path, it can come in one of two forms: Absolute Path and Relative Path

## Absolute Paths

An Absolute Path begins with "/".  Absolute paths are treated relative to the document root, with no concern for what the path of the current page is.

Example absolute paths:
- `/styles.css`
- `/img/cat.jpg`
- `/privacy.html`

The browser will treat the URL for the file as being the same protocol and domain (and port) as the current page, but with the listed path.  The path of the current page does not matter.

Those example absolute paths, when viewed on either of the pages "http://example.com/index.html" or "http://example.com/test/pictures.html" would be treated as these urls:
- http://example.com/styles.css
- http://example.com/img/cat.jpg
- http://example.com/privacy.html

## Relative Paths

A Relative Path is any path reference that doesn't begin with "/" 
- It follows that no fully-qualified URL can have a relative path, and every fully-qualified URL has an absolute path

Relative paths are treated relative to the path of the current page.  Note, however, that you can't view pages outside of the document root.


Example relative paths: (`.` refers to the current directory, and `..` refers to the parent directory, following command-line practices)
- `styles.css`
- `./logo.jpg`
- `./css/styles.css`
- `../img/cat.jpg`

The example relative paths, when viewed on the page "http://example.com/index.html" will be treated as these URLs:
- `styles.css` is treated as http://example.com/styles.css
- `./logo.jpg` is treated as http://example.com/logo.jpg
- `./css/styles.css` is treated as http://example.com/css/styles.css
- `../img/cat.jpg` is treated as http://example.com/img/cat.jpg (this one is odd, because we have no parent for the ".." to take us to, and cannot go outside of the document root, so the use of ".." was wrong, but the browser will still make the attempt)

The same example relative paths when viewed on the page "http://example.com/test/pictures.html"
- `styles.css` is treated as http://example.com/test/styles.css
- `./logo.jpg` is treated as http://example.com/test/logo.jpg
- `./css/styles.css` is treated as http://example.com/test/css/styles.css
- `../img/cat.jpg` is treated as http://example.com/img/cat.jpg (see how we went to the parent of the current directory, from "/test/" to "/", then applied the remaining path)_

## When Absolute Paths are Good

Absolute Paths are beneficial in a few places.

- First, they are mandatory and unavoidable if you are linking to a document on a different protocol/domain/port.  I cannot link to the image at "http://placekitten.com/50/50" from a page on a different domain without using an absolute path.
- Second, they are helpful to avoid a lot of "../" in my paths if my HTML will be nested in subdirectories while other assets, such as CSS, JS, or images are in different directories off my document root.  Lots of paths like "../../../css/styles.css" can be confusing because you have to know where the current file is for the reference to make sense, and it is easy to get the number of directories wrong, so there is a benefit to avoiding those situations.
  - I might have "/styles/", or "/css/", or "/js/", or "/images/", or "/img/" to hold those assets (files) while I have html pages in "/", "/docs/", "/docs/chapter1/", etc.  In those cases it is far nicer to link to `/css/styles.css` than it is to link to `../../css/styles.css`.  
- Third, if I move html files between nested subdirectories, any references with relative paths to content that doesn't move will have to be changed, while any references using absolute paths do not have to change.  If I move an html file from "/docs/chapter1/" to "/docs/appendices/A/", the absolute links would still work, while relative links would all be broken until I changed them.

## When Relative Paths are Good

- First, Relative Paths are nice when there are no directories involved. If my HTML, CSS, JS, and/or images are in the same directory, I need only list the filename for the reference to be correct.
- Second, if I move a directory that has multiple assets in it, anything in that directory that was using a relative path to other content in that directory will still work.  Example: in "/docs/chapter1/" I have an "index.html", a "footnotes.html", a "styles.css", and a "cat.jpg".  If the HTML pages are using relative links, I can move all the files to "/docs/Chapter-1/" and all the relative links and references continue to work without change, while anything using an absolute link will have to be updated.
- Third, if my web content is shifted to a subdirectory, any relative links continue to work between that content.  Example: Imagine I have 3 separate projects, each with html files in "/" and other content in "/css/", "/styles/", and "/img/", but the HTML files all use relative paths.  I can create a portfolio website that has all 3 projects on it, each in their own (new) subdirectory, and each project will continue to have the relative paths work as intended.

## Which should you use?

The answer is, of course, "it depends".  When each is beneficial (listed above) often have to do with when collections of assets are moved and how. This means there is no one good answer as to when each is best, and often when you are writing the code in the first place you do not know what changes you will be making in the future (if you did, you'd be making those changes now). Each developer will have different experiences over time about which scenarios they encounter more often, and will disagree about which approach you should try as a "default".

My personal advice is to be deliberate in what you try. That way you can easily see if your decisions match up with reality you are experiencing. 

My approach:
- If I know content will be hosted somewhere I will be using subdirectories (such as for a portfolio site), I will use relative paths everywhere
- If I don't expect to be hosting in subdirectories, I will use absolute paths for dedicated asset directories (such as "/css/", "/js/", "/img/"), and relative paths between HTML files.  When linking between topic areas, I will use absolute paths.
  - to put this more generally, if the relative path would involve "../", I will tend to use an absolute path, but if it doesn't, I will tend to use a relative path

But that is just my personal approach, and one that has many exceptions in individual projects.
