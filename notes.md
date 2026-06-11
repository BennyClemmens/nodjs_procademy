# Fundamentals of NODE JS | A Complete NODE JS Course

## 01 Introduction to NODE JS

- General description of what NODE Js is, i.e. a JavaScript runtime - another example of a JS runtime is a browser, where the browser provides the functions and API's - built on Google's open source V8 engine (embedded inside C++), with it's own, different API's and functions opening up new possibilities, making it an ideal server side (backend) language.
- It is perfect for fast and scalable data-applications because it is a single threaded, event driven and non blocking I/O-model. In this course we will use a MongoDb database.
- It is not recommended to use it when there is heavy server side processing (e.g. compressing or video manipulation). Use another language like php or python for those use cases.
- Since it can also be used for front-end, the same technolgy, with many libraries and open source packages and an active community, can be used in the entire stack.
- It is used in production by many Top companies.

## 02 Installing NODE JS

- Instructions on what (an even version number) and how to install using the [website](https://nodejs.org/en), but I had it allready installed for another course, using winget:

```cmd
C:\Windows\System32>winget list Node.js
Name    Id               Version Available Source
-------------------------------------------------
Node.js OpenJS.NodeJS.22 22.16.0 22.22.2   winget

C:\Windows\System32>node --version
v22.16.0
```

- REPL to use a runtime outside of a browser

```node
C:\Windows\System32>node
Welcome to Node.js v22.16.0.
Type ".help" for more information.
> 1 + 1
2
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the REPL
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file

Press Ctrl+C to abort current expression, Ctrl+D to exit the REPL
> console.log('hello world!')
hello world!
undefined
```

## 03 Understanding REPL in Node

- REPL waits for any expression in a prompt
  - Read: read user input
  - Eval: evaluate user input
  - Print: Print or output the result
  - Loop: Return and wait for new input
- REPL is not used for development purposes
- the `_` variable stores the result of the previous expression (expression assignment untill disabled by setting it explicitly)

## 04 First Node JS Project

- a first app: `app.js`
- execute with `node app.js`
- importing the `readline` module for user input
- creating a user interface and closing it, with callback and close

## 05 Reading & Writing files synchronously

- API's available in NODE JS, not in the browser
- `fs` module to manipulate files
- `.writeFileSync()` creates or overwrites file

## 06 Asynchronous nature of Node JS

- previous lecture was synchronous: line by line in a single thread
- blocking the thread when reading very large files
- solution: use te asynchronous API `readFile()`, which will not be executed in the main thread
- callback function executes in main when function is ready
- asynchronous is needed so that multiple users don't block your single thread
- thus implementing a non-blocking IO Model (with callbacks)
- callbacks itself don't make it asynchronous (see later)
- danger: callback hell, with nested callback functions making the code unreadable
- those can be solved with promises ans anync/await

## 07 Reading & Writing files asynchronously

- err and data variables in anynchronous callback functions
- example with callback hell

## 08 Creating a simple web server

- using the `http`package
- creating a server that has a callback as argument, executed with every request
- logging a basic request and response
- a codepilot patch for favico.ico

## 09 An overview of how web works

- overview of the client-server architecture
- aka request-response model
- the http package (start/header/body)

## 10 How Request & Response works

- more in depth explanation using dev tools
- added .css (and copilot solution to fetch it)

## 11 What is Routing

- basic explanation of routing for app endpoints
  - file based
  - resource based (with a request handler in the back-end)
- can be implemented with e.g. functions
- routes can also take parameters
- query strings after a `?`, seperated by `&`
- routes can extract parameters and query strings from an url

## 12 Creating Routes in Node JS

- extraxting info from the `url` property of the `request` parameter
- simple routing using the url as a decider

## 13 Sending HTML Response

- use the index.html from repo with css embedded
- html response for all
- `replace` methode for `{{%CONTENT%}}`

## 14 Setting headers for Response

- some response headers are set by default
- custom status codes consistent with supported routes
- `statusCode` or `writeHead()` must come before `end()`
- headers as a key-value pair object

## 15 Working with JSON data

- add json data
- fetching it Sync before needed
- json parsed to a javascript object
- logged to console for now

## 16 Transforming JSON data into HTML

- creating a template for an individual product
- replacing content holders by mapping the product
- joining the array of html elements togethet and returning it

## 17 Parsing Query String from URL

- `url` to parse what user requested
- using properties from the query string to fetch a specific product

## 18 Creating a reusable function

- replace funtion to adjust multiple html templates
- details page if a existing query id is present
