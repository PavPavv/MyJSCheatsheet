# NextJS

## 1. What is environments?

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

## 2. What is code-splitting?

Code-splitting is the process of splitting the application’s bundle into smaller chunks required by each entry point. The goal is to improve the application's initial load time by only loading the code required to run that page.

## 3. What is Rendering?

There is an unavoidable unit of work to convert the code you write in React into the HTML representation of your UI. This process is called **rendering**.
Rendering can take place on the server or on the client. It can happen either ahead of time at build time, or on every request at runtime.
With Next.js, three types of rendering methods are available:

- Server-Side Rendering
- Static Site Generation
- Client-Side Rendering

Pre-Rendering

**Server-Side Rendering** and **Static Site Generation** are also referred to as _Pre-Rendering_ because the fetching of external data and transformation of React components into HTML happens before the result is sent to the client.

In a standard React application, the browser receives an empty HTML shell from the server along with the JavaScript instructions to construct the UI. This is called client-side rendering because the initial rendering work happens on the user's device.

## 4. How NextJS works?

Next.js pre-renders every page by default.

With server-side rendering, the HTML of the page is generated on a server for each request. The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client.

On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called **hydration**.

In Next.js, you can opt to _server-side render_ pages by using **getServerSideProps()**.

> Note: React 18 and Next 12 introduce an alpha version of React server components. Server components are completely rendered on the server and do not require client-side JavaScript to render. In addition, server components allow developers to keep some logic on the server and only send the result of that logic to the client. This reduces the bundle size sent to the client and improves client-side rendering performance.

Static Site Generation

With **Static Site Generation**, the HTML is generated on the server, but unlike server-side rendering, there is no server at runtime. Instead, content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request.
In Next.js, you can opt to statically generate pages by using **getStaticProps()**.

## 5. How to start and use NextJS project?

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

## 6. Pre-rendering and Data Fetching in Next JS

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called _hydration_.)

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

**getStaticProps()** only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers. If you export a function called **getStaticProps** (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by **getStaticProps**.

**getStaticProps()** can only be exported from a page. You can’t export it from non-page files.

> In development mode, getStaticProps runs on each request instead.

Next.js polyfills **fetch()** on both the client and server. You don't need to import it.

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

## 17. SWR (stale-while-revalidate)

The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:

```javascript
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

> The returned list is not just an array of strings — it must be an array of objects that look like the comment above. Each object must have the params key and contain an object with the id key (because we’re using `[id]` in the file name). Otherwise, getStaticPaths will fail.
