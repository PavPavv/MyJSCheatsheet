# React

### What is Babel?

In the past, the only way to use the latest JavaScript features was to wait weeks, months, or even years until browsers supported them.
Now, Babel has made it possible to use the latest features of JavaScript right away. The compiling step makes JavaScript similar to other languages. It’s not quite traditional compiling: our code isn’t compiled to binary. Instead, it’s transformed into syntax that can be interpreted
by a wider range of browsers. Also, JavaScript now has source code, meaning that there will be some files that belong to your project that
don’t run in the browser.
The process of JavaScript compilation is typically automated by a build tool like webpack or Parcel.

### What is JS modules?

A JavaScript module is a piece of reusable code that can easily be incorporated into other JavaScript files without causing variable
collisions. JavaScript modules are stored in separate files, one file per module. There are two options when creating and exporting a module:
you can export multiple JavaScript objects from a single module or one JavaScript object per module.

### What is CommonJS?

CommonJS is the module pattern that’s supported by all versions of Node (see the Node.js documentation on modules). You can still use these modules with **Babel** and **webpack**. With CommonJS, JavaScript objects are exported using module.exports.
CommonJS does not support an import statement. Instead, modules are imported with the require function.