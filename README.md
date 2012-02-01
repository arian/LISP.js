LISP.js
=======

Parse and execute LISP code in JavaScript.

API
---

For parsing the code, the `parse` function can be used.
This will return an array with all pieces.

``` js
parse('(+ 2 3)'); // ['+', 2, 3]
```

Executing code can be done with the `exec` function:

``` js
exec('(+ 3 (- 10 5))'); // 8
```

AMD
---

LISP.js uses the [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) format. You could use any compatible AMD loader, either on Node.js or in the browser to use this Complex module. I'd recommend [Require.JS](http://requirejs.org/).

Concatenating AMD modules can be done with _r.js_ or [amd-packager-php](https://github.com/arian/amd-packager-php)

LISP.js in Node.js
------------------

For usage in node.js, [amd-loader](https://github.com/ajaxorg/node-amd-loader)
is required. This can be installed by running `npm install`.

Then `amd-loader` should be required in your own file:

```js
require('amd-loader');
var exec = require('LISP.js/exec');
exec('(+ 1 2)');
```
