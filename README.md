LISP.js
=======

[![Build Status](https://secure.travis-ci.org/arian/LISP.js.png)](http://travis-ci.org/arian/LISP.js)

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

LISP.js in Node.js
------------------

For usage in node.js, [amd-loader](https://github.com/ajaxorg/node-amd-loader)
is required. This can be installed by running `npm install`.

Then `amd-loader` should be required in your own file:

```js
require('amd-loader');
var exec = require('LISP.js');
exec('(+ 1 2)');
```

### Install with NPM

You can install LISP.js with npm:

```
npm install LISP.js
```

or add LISP.js to your `package.json` dependencies:

```js
	"dependencies": {
		"LISP.js": ">=0.0.2"
	}
```

LISP.js in the Browser
----------------------

Building LISP.js for the browser is easy with [wrapup](github.com/kamicane/wrapup).

	make build

will create a JS file that will export a global `LISP` variable with `LISP.exec()`
and `LISP.parse()`.

Alternatively you could use this to have global `parse` and `exec` functions.

	wrup -r parse ./parse -r exec ./exec
