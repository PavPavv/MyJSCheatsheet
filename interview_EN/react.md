# React

## 1. What is Babel?
Many software languages require you to compile your source code. JavaScript is an interpreted language: the browser interprets the code as text, so there’s no need to compile JavaScript. However, not all browsers support the latest JavaScript syntax, and no browser supports JSX syntax. Since we want to use the latest features of JavaScript along with JSX, we’re going to need a way to convert our fancy source code into something that the browser can interpret. This process is called
compiling, and it’s what Babel is designed to do. 
In the past, the only way to use the latest JavaScript features was to wait weeks, months, or even years until browsers supported them. Now, Babel has made it possible to use the latest features of JavaScript right away. The compiling step makes JavaScript similar to other languages. It’s not quite traditional compiling: our code isn’t compiled to binary. Instead, it’s transformed into syntax that can be interpreted by a wider range of browsers. Also, JavaScript now has source code, meaning that there will be some files that belong to your project that don’t run in the browser.The process of JavaScript compilation is typically automated by a build tool like webpack or Parcel.

## 2. What is JS modules?
A JavaScript module is a piece of reusable code that can easily be incorporated into other JavaScript files without causing variable
collisions. JavaScript modules are stored in separate files, one file per module. There are two options when creating and exporting a module:
you can export multiple JavaScript objects from a single module or one JavaScript object per module.

## 3. What is CommonJS?
CommonJS is the module pattern that’s supported by all versions of Node (see the Node.js documentation on modules). You can still use these modules with **Babel** and **webpack**. With CommonJS, JavaScript objects are exported using module.exports.
CommonJS does not support an import statement. Instead, modules are imported with the require function.

## 4. What is webpack?
Webpack is one of the leading tools for bundling JS modules. Webpack is billed as a module bundler. A module bundler takes all of
our different files (JavaScript, LESS, CSS, JSX, ESNext, and so on) and turns them into a single file. The two main benefits of bundling are modularity and network performance.
Modularity will allow you to break down your source code into parts, or modules, that are easier to work with, especially in a team environment.Network performance is gained by only needing to load one dependency in the browser: the bundle. Each script tag makes an HTTP request, and there’s a latency penalty for each HTTP request.
Bundling all the dependencies into a single file allows you to load everything with one HTTP request, thereby avoiding additional latency.
Aside from code compilation, webpack also can handle: 
- **Code splitting** (Splits up your code into different chunks that can be loaded when you need them. Sometimes these are called rollups or layers; the aim is to break up code as needed for different pages or devices.)
- **Minification**
- **Feature Flagging** (Sends code to one or more—but not all—environments when testing out features.)
- **Hot Module Replacement**

> yarn add webpack webpack-cli --dev

> yarn add babel-loader @babel/core --dev

For react:
> yarn add @babel/preset-env @babel/preset-react --dev

As of version 4.0.0, webpack does not require a configuration file to bundle a project. If we don’t include a config file, webpack will run the defaults to package our code. The default webpack configuration file is always _webpack.config.js_.
Wherever webpack finds an import statement, it will find the associated module in the filesystem and include it in the bundle.
Traversal through all imported files creates what’s called a **dependency graph**. Picture each file we need as a circle on the graph, with webpack drawing all the lines between the circles to create the graph. **That graph is the bundle**.

The webpack.config.js file is just another module that exports a JavaScript literal object that describes the actions webpack should take. The configuration file should be saved to the root folder of the project, right next to the index.js file:

```javascript
// ./webpack.config.js
var path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js"
  },
  //  list of loaders to run on specified modules
  module: {
    rules: [
      //  Each loader is a JavaScript object.
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
  },
  devtool: "#source-map", // Add this option for source mapping
};
```


Create one more file at the root of the project: **.babelrc**:

```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Webpack is run statically. Typically, bundles are created before the app is deployed to the server. You can run it from the command line using **npx**:
> npx webpack --mode development

You can also add an npm script to your package.json file to create a shortcut:

```javascript
"scripts": {
  "build": "webpack --mode production"
},
```
> npm run build


```html
// ./dist/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Recipes App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```
This is the home page for your app. It will load everything it needs from one file, one HTTP request: _bundle.js_. You’ll need to deploy these files to your web server or build a web server application that will serve these files with something like Node.js or Ruby on Rails.

A **source map** is a file that maps a bundle to the original source files. With webpack, all we have to do is add a couple lines to our _webpack.config.js_ file.
With thus setting there are two output files are generated and added to the dist folder: the original _bundle.js_ and _bundle.js.map_.

## 5. What is hooks?
_Hooks_ contain reusable code logic that is separate from the component tree. They allow us to hook up functionality to our components. React ships with several built-in hooks we can use out of the box.

#### useState
Returns a stateful value, and a function to update it. During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).The **setState** function is used to update the state. It accepts a new state value and enqueues a re-render of the component.
```javascript
const [state, setState] = useState(initialState);
```

Unlike the **setState** method found in class components, **useState** does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax:
```javascript
const [state, setState] = useState({});
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```

#### useRef
Returns a mutable ref object whose _.current_ property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component. A common use case is to access a child imperatively:
```javascript
const TextInputWithFocusButton = () => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### useEffect
We use **useEffect** when a render needs to cause side effects. Think of a side effect as something that a function does that isn’t part of the return.
Think of **useEffect** as being a function that happens after a render. When a render fires, we can access the current state values within our component and use them to do something else. Then, once we render again, the whole thing starts over. New values, new renders, new effects.

We don’t want every effect to be invoked on every render. We need to associate **useEffect** hooks with specific data changes. To solve this problem, we can incorporate the dependency array. The dependency array can be used to control when an effect is invoked. Since there are no dependencies in the array, the effect is invoked for the initial render. No dependencies means no changes, so the effect will never be invoked again. Effects that are only invoked on the first render are extremely useful for initialization.
