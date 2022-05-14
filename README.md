# Quickstart Webpack

A scaffold project for a [Webpack](https://webpack.js.org/) webapplication, without the overhead of specific libraries. It can be used to quickstart a prototype project for any kind of module-based webapplication. It has some preconfigured standards for development and production, to make it instant to use for many default use cases (i.e. loading of images, Webfonts, .sass files, .jsx files, etc...). 

## Technology Stack

There are no preset frontend libraries in this project.

### Runtime dependencies

- no predefined runtime dependencies

### Buildtime / Development dependencies

- [Webpack 5](https://webpack.js.org/) + plugins
- [Babel 7](http://babeljs.io/) + presets
- [ESLint](https://eslint.org/)

## Requirements

### For development
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (included in Node.js)
- [git](https://git-scm.com/)
- browser (i.e. [Firefox](https://www.mozilla.org/de/firefox/) or [Chrome](https://www.google.com/intl/de_ALL/chrome/))
- editor (i.e. [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/) or [Notepad++](https://notepad-plus-plus.org/))

### For production
- webserver for static content (i.e. [Apache](https://httpd.apache.org/))
- browser

## Installation

First clone this project with
```bash
git clone https://github.com/Wanderduene/quickstart-webpack.git
``` 

Second, step into the new folder and remove the git remote:

```bash
git remote remove origin
```

After that install all the default dependecies:

```bash
npm i
```

Now the project is ready to use. You can start the dev server with ```npm run start``` or create a deployable release version of it with ```npm run dist```.

## Where to start?

The main entry point of your web application is the `index.js`, you can find in the `src` folder. Start your implementation here. Use the ECMAScript 6 module-system, by using [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).
The `src` folder contains a little demo, to demonstrate how to handle modules and resoures with import / export. Just delete all `demo.*` files and empty the `index.js` to get rid of it.

The `index.html` can be found in the `dist` folder. It's preconfigured to load the via Webpack generated module bundle.
If you have static resources, wich shouldn't be loaded by Webpack, put it in here. When running a build, Webpack generates the resource bundle into this folder. The content of this folder is production ready and can deployed / copied to any kind of webserver (i.e. [Apache](https://httpd.apache.org/)). Node.js and npm are not needed in production.

All scripts and resources, that should be handled by Webpack, should be placed in the `src` folder (except for the libraries you installed via npm). In the default configuration of this project Webpack can import .js and .jsx files (install React), .css and .scss (install SASS-Compiler) files, JPG's, PNG's, SVG's and various Webfont files.

## How to add React?

If you want to have a [React](https://reactjs.org/) application you just have to excecute 
```bash
npm i react react-dom
``` 
to add the frontend libraries. 

Then run 
```bash
npm i -D @babel/preset-react eslint-plugin-react
``` 
to add the backend library for transpiling and linting JSX files.

Then add the value `@babel/preset-react` to the presets in your `.babelrc` file. It should look like this:

```javascript
"presets": ["@babel/env", "@babel/preset-react"]
```

and add the value `plugin:react/recommended` to the extends section of your `.eslintrc.js` file. It should look like this:

```javascript
"extends": ["eslint:recommended", "plugin:react/recommended"]
```

You're now ready to use [React and JSX](https://reactjs.org/docs/hello-world.html)!
Remember to use the file extension .jsx for your JSX files :)

## How to add SASS

The project is preconfigured to be able to import `.scss` files, but if you want to use it, you first have to add the [SASS](https://sass-lang.com/) preprocessor, for transpiling `.scss` stylesheets to CSS. Simply execute:

```bash
npm i -D sass
```

Then it should work.

## How to add Bootstrap styles?

You can use the [Bootstrap](http://getbootstrap.com) styles and grid system by installing it with ```npm i bootstrap```. Then just import it in the main entry point (index.js) of your webapplication, by adding the import: 

```javascript
import 'bootstrap/dist/css/bootstrap.css';
``` 

## Something else?

If you publish a project, based on this scaffold, don't forget to:

- rename the project in the `package.json`
- change the description in the `package.json`
- change the author in the `package.json`
- adapt the license in the `package.json` if you need
- rewrite this `README.md` file
- maybe use `git rebase --interactive --root` to [squash the history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) of this project into one commit, so your project's history isn't bloated with stuff related to this scaffold 

# Reference

```bash
npm run start
```

- starts the application in a development server
- URL is shown on console
- refresh on every code change

```bash
npm run dist
```

- creates the source bundle in the `dist` folder
- content in `dist` folder is production ready

```bash
npm run clean
```

- cleans up the workspace by deleting generated sources

```
npm run lint
```

- executes a static code analysis in `src`
- show's JavaScript problems and dirty code

```
npm run build
```

- executes clean, lint and dist in order
