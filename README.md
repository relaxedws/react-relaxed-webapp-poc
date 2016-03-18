relaxed-react-webapp-poc
========================

Simple React web application, designed to synchronise and display
content from [Drupal][] via [PouchDB][] and [RELAXed][].


Usage
-----

### Installation

1. Install Drupal 8 PoC and [CouchDB][].
2. Create some content and replicate it into CouchDB.
3. Customise `src/config.js` with the access details for your CouchDB
   server.
4. Install Node.js, version 5.x or 4.2.x. If you're using [Homebrew][]
   on [OS X][], this can be accomplished with a simple `brew install node`
5. Run `npm install` to install required dependencies. This will take a
   while.
6. Run `npm install -g nodemon` to install [Nodemon][].
6. Run `npm run start` to compile the app and host it on a bundled
   server. This server supports hot reloading, so any code changes
   should be reflected automatically without having to reload the entire
   application.
7. Open [http://localhost:1849](http://localhost:1849) in a browser to
   view the app.

### Testing

1. Do installation steps 1-6, if you did not do so already.
2. Run `npm run test` to run the test suite.

Development
-----------

While developing, you can use `npm run dev` in place of `npm run start`
to configure the app in development mode.

You can also run `npm run test:dev` in a separate shell to automatically
run the tests whenever the code changes.


### [React Developer Tools][]

The [React Developer Tools][] is a browser plugin for Firefox or Chrome
that will let you peek into React component state, very helpful while
debugging.

[CouchDB]: https://couchdb.apache.org/
[Drupal]: https://www.drupal.org/
[Homebrew]: http://brew.sh
[Nodemon]: https://github.com/remy/nodemon
[OS X]: http://www.apple.com/osx/
[PouchDB]: http://pouchdb.com/
[React Developer Tools]: https://github.com/facebook/react-devtools
[RELAXed]: https://www.drupal.org/project/relaxed
