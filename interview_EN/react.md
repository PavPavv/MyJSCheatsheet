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

### useState

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

### useRef

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

### useLayoutEffect

We understand that the render always comes before **useEffect**. The render happens first, then all effects run in order with full access to all of the values from the render.
**useLayoutEffect** is called at a specific moment in the render cycle. The series of events is as follows:

1. Render
2. **useLayoutEffect** is called
3. Browser paint: the time when the component’s elements are actually added to the DOM
4. **useEffect** is called

In most circumstances, useEffect is the right tool for the job, but if your effect is essential to the browser paint (the
appearance or placement of the UI elements on the screen), you may want to use useLayoutEffect. For instance, you may want to obtain the width and height of an element when the window is resized:

```javascript
function useWindowSize {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
};
```

```javascript
function useMousePosition {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setPosition = ({ x, y }) => {
    setX(x);
    setY(y);
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition);
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y];
};
```

### useEffect

We use **useEffect** when a render needs to cause side effects. Think of a side effect as something that a function does that isn’t part of the return.
Think of **useEffect** as being a function that happens after a render. When a render fires, we can access the current state values within our component and use them to do something else. Then, once we render again, the whole thing starts over. New values, new renders, new effects.

We don’t want every effect to be invoked on every render. We need to associate **useEffect** hooks with specific data changes. To solve this problem, we can incorporate the dependency array. The dependency array can be used to control when an effect is invoked. Since there are no dependencies in the array, the effect is invoked for the initial render. No dependencies means no changes, so the effect will never be invoked again. Effects that are only invoked on the first render are extremely useful for initialization.

If you return a function from the effect, the function will be invoked when the component is removed from the tree. Splitting functionality into multiple useEffect calls is typically a good idea.

```javascript
useEffect(() => {
  console.log(someDep);
}, [someDep]);
```

We can imitate **componentDidMount** and **componentDidUnmount** react-classes lifecycle methods with **useEffect** hook:

```javascript
export function useMountedRef() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    
    return () => (mounted.current = false);
  });
  return mounted;
}
```

### useMemo

**useMemo** invokes a function to calculate a memoized value. In computer science in general, memoization is a technique that’s used to improve performance. In a memoized function, the result of a function call is saved and cached. Then, when the function is called again with the same inputs, the cached value is returned. In React, **useMemo** allows us to compare the cached value against itself to see if it has actually changed.

When we don’t include the dependency array with **useMemo**, the words are calculated with every render. The dependency array controls when the callback function should be invoked. The second argument sent to the **useMemo** function is the dependency array. The _words_ array depends on the _children_ property. If _children_ changes, we should calculate a new value for _words_ that reflects that change. At that point, **useMemo** will calculate a new value for words when the component initially renders and if the children property changes.

```javascript
const words = useMemo(() => children.split(" "), [children]);
```

### useCallback

**useCallback** can be used like **useMemo**, but it memoizes **functions** instead of values.

```javascript
const fn = useCallback(() => {
  console.log(test.id);
  console.log(test.date);
}, [test]);
```

```javascript
const useJazzyNews = () => {
  const [_posts, setPosts] = useState([]);
  const addPost = post => setPosts(allPosts => [post, ...allPosts]);
  const posts = useMemo(() => _posts, [_posts]);

  useEffect(() => {
    newPostChime.play();
  }, [posts]);

  useEffect(() => {
    newsFeed.subscribe(addPost);
    return () => newsFeed.unsubscribe(addPost);
  }, []);

  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, []);

  return posts;
};
```

### useReducer

A reducer function’s most simple definition is that it takes in the current state and returns a new state.

```javascript
const [checked, toggle] = useReducer(checked => !checked, false);

return (
  <>
    <input type="checkbox" value={checked} onChange={toggle} />
    {checked ? "checked" : "not checked"}
  </>
);
```

```javascript
const [number, setNumber] = useReducer(
  (number, newNumber) => number + newNumber, 0
);
```

Also **useReducer** can help us handle state updates more predictably as state becomes more complex.

```javascript
const [user, setUser] = useReducer(
  (user, newDetails) => ({ ...user, ...newDetails }),
  firstUser
);
```

```jsx
<button
  onClick={() => { setUser({ admin: true })} }
  >
  Make Admin
</button>
```

## 5. Rules of hooks

1. Hooks only run in the scope of a component
2. It’s a good idea to break functionality out into multiple Hook
3. Hooks should only be called at the top level


## 6. How to improve component's performance?

In a React application, components are rendered…usually a lot. Improving performance includes preventing unnecessary renders and reducing the time a render takes to propagate.
React comes with tools to help us prevent unnecessary renders: **memo**, **useMemo**, and **useCallback**.

## 7. What is React.memo()?

The **memo** function is used to create pure components. We know that a pure function will always return the same result. So, a pure component is a component that always renders
the same output, given the same properties. The **memo** function can be used to create a component that will **only** render when its properties change.

```javascript
import React, { useState, memo } from "react";

const Cat = ({ name }) => {
  console.log(`rendering ${name}`);
  return <p>{name}</p>;
};

const PureCat = memo(Cat);
```

The memo function will allow us to define more specific rules around when this component should rerender:

```javascript
const RenderCatOnce = memo(Cat, () => true);
const AlwaysRenderCat = memo(Cat, () => false);
```

The second argument sent to the **memo** function is a predicate. A predicate is a function that only returns _true_ or _false_. This function decides whether to rerender a cat or not. When it returns _false_, the Cat is rerendered. When this function returns true, the Cat will not be rerendered. No matter what, the Cat is always rendered at least once. This is why, with RenderCatOnce, it will render once and then never again.
Typically, this function is used to check actual values:

```javascript
const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```
In previous versions of React, there was a method called **shouldComponentUpdate**. It described which props or state would need to change for the component to rerender.

**PureComponent** is the same as React.memo, but **PureComponent** is only for class components; **React.memo** is only for function component.

```javascript
class Cat extends React.PureComponent {
  render() {
    return (
      {name} is a good cat!
    )
  }
}
```

## 8. Dealing with WebSockets

```javascript
export function useChatRoom(socket, messages = []) {
  const [status, setStatus] = useState(null);
  const [messages, appendMessage] = useReducer(
    reducer,
    messages
  );

  const send = message => socket.emit("message", message);

  useEffect(() => {
    socket.on("connection", () => setStatus("connected"));
    socket.on("disconnecting", () =>
      setStatus("disconnected")
    );

    socket.on("message", setStatus);

    return () => {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("disconnect");
      socket.removeAllListeners("message");
    };
  }, []);
  return {
    status,
    messages,
    send
  };
}
```

## 9. What is error boundary?

Currently, the only way to make an error boundary component is to use class component.

```javascript
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };
  
  static getDerivedStateFromError(error) {
    return { error };
  }
  
  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) return <fallback error={error} />;
    
    return children;
  }
}
```

```javascript
<ErrorBoundary fallback={ErrorScreen}>
  <App />
</ErrorBoundary>;
```

**getDerivedStateFromError** is one of those methods. It is invoked when an error occurs anywhere within the children during the render process. When an error occurs, the value for state.error is set. Where there’s an error, the fallback component is rendered, and that error is passed to the component as a property.

Error boundaries can be composed. Sure, we wrapped the App component in an ErrorBoundary, but we can also wrap individual components within the App with Error.

## 10. What is code splitting?

_Code splitting_ provides us with a way to split our codebase into manageable chunks and then load those chunks as they’re needed.

```javascript
const Main = React.lazy(() => import("./Main"));
```

Importing code during runtime is just like loading anything else from the internet. First, the request for the JavaScript code is pending. Then
it’s either successful, and a JavaScript file is returned, or it fails, causing an error to occur. Just like we need to notify a user that we’re in the process of loading data, we’ll need to let the user know that we’re in the process of loading code.

The **Suspense** component works much like the **ErrorBoundary** component. We wrap it around specific components in our tree. Instead of falling back to an error message when an error occurs, the Suspense component renders a loading message when lazy loading occurs.

```javascript
import React, { useState, Suspense, lazy } from "react";

//  ui
import Agreement from "./Agreement";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Main = lazy(() => import("./Main"));

export default function App() {
  const [agree, setAgree] = useState(false);
  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <Main />
    </Suspense>
  );
}
```

```javascript
export default function App() {
  return (
    <Suspense fallback={<GridLoader />}>
      <ErrorBoundary>
        <Status />
      </ErrorBoundary>
    </Suspense>
  );
}
```

JavaScript lets us get away with a lot of stuff that we can’t get away with when using traditional typed languages. For example, in JavaScript, we can throw any type:

```javascript
throw "inspecting errors";
```

## 11. What is Fiber?

When a change occurs,
React makes a copy of the component tree as a JavaScript object. It looks for the parts of the tree that need to change and changes only those parts. Once complete, the copy of the tree (known as the work-in-progress tree) replaces the existing tree. It’s important to reiterate that it uses the parts of the tree that are already there.

Fiber, released in version 16.0, rewrote the way that DOM updates worked by taking a more asynchronous approach. The first change with 16.0 was the separation
of the renderer and the reconciler. A renderer is the part of the library that handles rendering, and the reconciler is the part of the library that manages updates when they occur.

Another huge shift with React Fiber was its changes to the reconciliation algorithm. Remember our expensive DOM updates that
blocked the main thread? This lengthy block of updates is called work with Fiber, React split the work into smaller units of work calledfibers. A fiber is a JavaScript object that keeps track of what it’s reconciling and where it is in the updating cycle.
Once a fiber (unit of work) is complete, React checks in with the main thread to make sure there’s not anything important to do. If there is
important work to do, React will give control to the main thread. When it’s done with that important work, React will continue its update. If
there’s nothing critical to jump to on the main thread, React moves on to the next unit of work and renders those changes to the DOM.

Fiber provides the infrastructure for prioritizing updates. In the longer term, the developer may even be able to tweak the defaults and
decide which types of tasks should be given the highest priority. The process of prioritizing units of work is called scheduling; this concept
underlies the experimental concurrent mode, which will eventually allow these units of work to be performed in parallel.

## 12. What is environments?

Important to understand:
  
- The environment **where** your code runs: _Development_ vs. _Production_
- **When** your code runs: _Build Time_ vs. _Runtime_
- **Where** rendering happens: _Client_ vs. _Server_

**Build** time (or build step) is the name given to a series of steps that prepare your application code for production.

When you build your application, Next.js will transform your code into production-optimized files ready to be deployed to servers and consumed by users. These files include:

- HTML files for statically generated pages
- JavaScript code for rendering pages on the server
- JavaScript code for making pages interactive on the client CSS files

**Runtime** (or request time) refers to the period of time when your application runs in response to a user’s request, after your application has been built and deployed.

You can think of environments as the context in which your code is running.

During development, you’re building and running the application on your local machine. Going to production is the process of making your application ready to be deployed and consumed by users.

Since each environment has different considerations and goals, there is a lot that needs to be done to move an application from development to production. For instance, the application code needs to be compiled, bundled, minified, and code split.

Next.js has a compiler written in Rust, a low-level programming language, and SWC, a platform that can be used for compilation, minification, bundling, and more.

Bundling is the process of resolving the web of dependencies and merging (or ‘packaging’) the files (or modules) into optimized bundles for the browser, with the goal of reducing the number of requests for files when a user visits a web page.

## 13. What is code-splitting?

Code-splitting is the process of splitting the application’s bundle into smaller chunks required by each entry point. The goal is to improve the application's initial load time by only loading the code required to run that page.

## 14. What is Rendering?

There is an unavoidable unit of work to convert the code you write in React into the HTML representation of your UI. This process is called **rendering**.
Rendering can take place on the server or on the client. It can happen either ahead of time at build time, or on every request at runtime.
With Next.js, three types of rendering methods are available:

- Server-Side Rendering
- Static Site Generation
- Client-Side Rendering

Pre-Rendering

**Server-Side Rendering** and **Static Site Generation** are also referred to as _Pre-Rendering_ because the fetching of external data and transformation of React components into HTML happens before the result is sent to the client.

In a standard React application, the browser receives an empty HTML shell from the server along with the JavaScript instructions to construct the UI. This is called client-side rendering because the initial rendering work happens on the user's device.

## 15. How NextJS works?

Next.js pre-renders every page by default.

With server-side rendering, the HTML of the page is generated on a server for each request. The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client.

On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called **hydration**.

In Next.js, you can opt to _server-side render_ pages by using **getServerSideProps()**.

> Note: React 18 and Next 12 introduce an alpha version of React server components. Server components are completely rendered on the server and do not require client-side JavaScript to render. In addition, server components allow developers to keep some logic on the server and only send the result of that logic to the client. This reduces the bundle size sent to the client and improves client-side rendering performance. 

Static Site Generation

With **Static Site Generation**, the HTML is generated on the server, but unlike server-side rendering, there is no server at runtime. Instead, content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request.
In Next.js, you can opt to statically generate pages by using **getStaticProps()**.

## 17. How to start and use NextJS project?

> npx create next-app --typescript .
> yarn add --dev typescript @types/react @types/node

The component can have any name, but you must export it as a default export.

**Link** allows you to do client-side navigation and accepts props that give you better control over the navigation behavior.
Client-side navigation means that the page transition happens using JavaScript, which is faster than the default navigation done by the browser.
Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

> import Link from 'next/link';

```javascript
<h1 className="title">
  Read <Link href="/posts/first-post">this page!</Link>
</h1> 
```

> Note: If you need to link to an external page outside the Next.js app, just use an -a- tag without Link.

Assets

Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.
The public directory is also useful for robots.txt, Google Site Verification, and any other static assets. Check out the documentation for Static File Serving to learn more.

Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
Images are always rendered in such a way as to avoid Cumulative Layout Shift, a Core Web Vital that Google is going to use in search ranking.

```javascript
import Image from 'next/image';
```

Metadata

```javascript
import Head from 'next/head';
```

Third-Party JavaScript

```javascript
import Script from 'next/script';

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

## 16. Pre-rendering and Data Fetching in Next JS

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.


- **Static Generation** is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on each request.

> In development mode (when you run npm run dev or yarn dev), pages are pre-rendered on every request. This also applies to Static Generation to make it easier to develop. When going to production, Static Generation will happen once, at build time, and not on every request

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

**Static Generation** is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request. In that case, you can use **Server-side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

Static Generation with Data using **getStaticProps()**

> In development mode, getStaticProps runs on each request instead.

