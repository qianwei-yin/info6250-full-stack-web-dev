# Initial Setup for Info 6250: Web Dev Tools and Methods

## A Warning about Limited Support

For all of the items listed here I will offer what support I can, but deciphering the needs of different operating systems and different software bugs is beyond the scope of this class and often outside my skillset.  

## Accounts
### Github.com
You will need a (free of cost) account on github.com
* https://github.com/

Existing accounts are fine.

I recommend using only LOWERCASE letters in your username, because it makes things harder when you need to also worry about capitalization.  That is just a recommendation, not a requirement.

### Slack.com
You will need a (free of cost) account on slack.com to join in the discussion there.  That account is specific to the class workspace (there is not a "general" account as on github)
- https://rebrand.ly/seainfo6250-slack

I recommend the desktop client and/or the mobile client over the web-based one.  Slack is where most info on the class is discussed, just like many programming shops.

## Required Software
### Git
You will need to install a git client (free of cost):
* https://git-scm.com/downloads

All instruction and examples in class use the **command-line client**, not a graphical one.  

### NodeJS and npm
You will need to install a recent version of NodeJS (which will also install npm) (free of cost)
* https://nodejs.org/   (I recommend LTS version)

All instruction and examples will use `npm` instead of `yarn`.
- Do *NOT* install anything for node/npm with 'sudo' or as administrator unless you know how to clean up the permissions mess it creates.  
  - e.g. Do NOT run commands that start with `sudo npm install`

### Chrome Web Browser
You will need to install and use the (free of cost) Chrome web browser if you do not already have it
* https://www.google.com/chrome/browser/desktop/index.html

Be sure to configure it as mentioned further down!

### Text Editor
You will need a text editor or IDE of your choice (note: A Text Editor is NOT a word processor).  Some popular (and free of cost) available ones include VSCode, Atom, Brackets, or Notepad++ (windows), while some commercial ones that allow limited free demos include SublimeText and WebStorm.  Those users familiar with more old-school editors such as vim or emacs are welcome to use them.
* NOTE: I highly recommend having a specific directory(folder) to hold material from the class.  Students that just work out of "Documents" or "Downloads" quickly find their work lost among other files there.
* NOTE: Directory (folder) names ARE case sensitive.  This can be tricky if you mess it up.  Mac (for example) will pretend to be case insensitive, but once you start talking to git it break.  So always be precise, which is a good practice for programming anyway.
* NOTE: I recommend AGAINST having spaces in directory(folder) names.  Spaces make command-line commands hard to run, and you WILL be running some commands on the command line.
  - Good: ~/class/info6250/
  - Bad: ~/My Documents/
  - Bad: ~/Documents/

### Terminal Program of your choice (optional)
To my knowledge all common systems come with a command-line terminal, however some of the OS-provided ones are sub-par.  If you wish to install and use programs like iTerm2 (Mac) or Powershell (Windows) or any of a bazillion options (Linux) you may do so.  (Many free of cost)

Many MANY examples in class will be done at the command line, as will documentation you find online

### Cloning the class repository

If you follow the below link, you will create a personal copy of the class repository on your Github account.
- https://rebrand.ly/seainfo6250-github

You only have to do so once. After you've created this copy on github, you will want to "clone" this repository to your personal computer. 

To do this:
- At the command line, make sure you are "in" the directory that will hold the directory for the class repository. When you run the command, it will create a subdirectory in the "current" directory by default, so you don't need to create a new directory just for this repository. I suggest either having a directory for everything related to this class, or a directory for all sorts of different repositories.
- Run the command below. The `VALUE-FROM-CODE-BUTTON-ON-GITHUB` is an instruction, you should replace that value with the value you can copy when you click the "code" button on the repo in github.  
  - Note that "VALUE-FROM-CODE-BUTTON-ON-GITHUB" is an instruction to you, not that literal collection of characters.  Copy the value from the code button on the github repo page
- `git clone VALUE-FROM-THE-CODE-BUTTON-ON-GITHUB`
- Whenever you run git commands for this repository, make sure you are in the root directory of this repository. In other words, make sure your current PATH is the directory that this command created, something like `student-6250--iamaverycoolcat`

## Configuration

### Chrome Dev Tools Console

You should make the configuration changes below.  The exact means to get to these options can differ slightly between OS and Chrome version
* View -> Developer -> Javascript Console
* Gear icon on upper right
* Check 'LogXMLHttpRequests'
* Network subtab -> Check 'Disable Cache'

### Operating System

Your life as a programmer will be improved if you disable so-called "Smart Quotes". These are the curly single and double quotation marks that are not valid in most programming languages.  Leaving this option enabled will make it impossible to run any code type outside of your editor (such as when asking Instructor, TA, or a peer in chat).
- Mac OSX: 
  - System Preferences -> Keyboard -> Text -> Uncheck "Use smart quotes and dashes"
- Windows:
  - I'm unable to find a general solution, if you find one, let me know!

### git configuration

After cloning your class repository, make sure your default git configuration has your information. (run `git config --list` and look at the information listed).  I've had students using the system of a significant other/roommate/friend and had the other person's name attached to their submissions!

### Shell configuration

#### Path

The program that runs in your terminal program to communicate with your operating system is known as your shell. By default, Mac OSX defaults to only showing the name of the current directory in your shell prompt. I recommend changing this to show the full path (or show it elsewhere on your terminal).  

#### Git branch

Working in git you will be switching between "branches", which will alter what versions of files and directories are shown. It is easy to make a confusing mess if you run commands or make changes while in a different branch than you intend. There are various shell scripts and terminal extensions that show what branch you are currently in. I recommend using something like this to make sure you always know what branch you are in when running commands.

## I'm a bit confused

Here are some resources you can use to get started if you feel particularly lost.
* https://guides.github.com/activities/hello-world/ (fully web-based to focus on the concepts)
* https://www.youtube.com/githubguides

You don't need to be strong with git/github at this point, so long as you are able to navigate the steps above, but I highly recommend improving your git skills as git is used in many, MANY workplaces, and even in those that don't you will often work with open-source libraries that use git.

You SHOULD ask questions on Slack - odds are if you're having an issue so is someone else.  You should not be afraid to admit you don't know something - if you knew it, you wouldn't be taking the class.  
